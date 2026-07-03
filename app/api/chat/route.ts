import { getCategoryName, getPrice, getProducts } from "@/api/catalog.api";
import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1_000;

const getInstructions = async () => {
  const products = await getProducts().catch(() => []);
  const catalogue = products
    .map(
      (product) =>
        `- ${product.name} (${getCategoryName(product.category)}) — $${getPrice(product).toFixed(2)}: ${product.description ?? "No description"} Product URL: /products/${product._id}`,
    )
    .join("\n");

  return `You are Broadway Store's friendly shopping assistant.

Help customers choose products, compare options, and understand the catalogue.
Only claim product names, prices, categories, descriptions, and URLs found in the catalogue below.
When recommending a product, briefly explain why it fits and include its relative product URL.
If the catalogue does not contain a suitable product, say so clearly instead of inventing one.
Keep answers concise, warm, and easy to scan. Do not claim to place orders, process payments, check live stock, or access customer accounts.

Current catalogue:
${catalogue || "No products are currently available."}`;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "The store assistant is not configured yet. Add OPENAI_API_KEY to .env.local and restart the development server.",
      },
      { status: 503 },
    );
  }

  try {
    const body: unknown = await request.json();
    const rawMessages =
      body && typeof body === "object"
        ? (body as Record<string, unknown>).messages
        : undefined;

    if (
      !Array.isArray(rawMessages) ||
      rawMessages.length === 0 ||
      rawMessages.length > MAX_MESSAGES ||
      !rawMessages.every(isChatMessage) ||
      rawMessages.at(-1)?.role !== "user"
    ) {
      return Response.json(
        { error: "Please send a valid conversation and try again." },
        { status: 400 },
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.4-mini",
      instructions: await getInstructions(),
      input: rawMessages.map((message) => ({
        role: message.role,
        content: message.content.trim(),
      })),
      max_output_tokens: 500,
    });

    const message = response.output_text.trim();

    if (!message) {
      return Response.json(
        { error: "The assistant could not produce a response. Please retry." },
        { status: 502 },
      );
    }

    return Response.json({ message });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error("Store chatbot request failed", {
        status: error.status,
        code: error.code,
        message: error.message,
      });

      if (error.status === 429) {
        return Response.json(
          {
            error:
              "The store assistant has no available API quota. Please check the OpenAI project billing and usage limits.",
          },
          { status: 503 },
        );
      }

      if (error.status === 401) {
        return Response.json(
          {
            error:
              "The store assistant API key is invalid or inactive. Please replace it in .env.local.",
          },
          { status: 503 },
        );
      }
    }

    console.error("Store chatbot request failed");

    return Response.json(
      {
        error:
          "The store assistant is temporarily unavailable. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
