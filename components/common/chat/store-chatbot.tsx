"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiHeadphones,
  FiMessageCircle,
  FiRefreshCw,
  FiSend,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

type GuidedStep = "questions" | "agent-prompt" | "finished";

type QuickPrompt = {
  question: string;
  answer: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m the Broadway Store assistant. Choose a question below or type your own message.",
};

const quickPrompts: QuickPrompt[] = [
  {
    question: "What can I buy under $100?",
    answer:
      "You have four options under $100: Ceramic Mug ($24), Linen Shirt ($54), Everyday Backpack ($79), and Cloud Sneakers ($96). The backpack is the most versatile everyday pick. View it at /products/everyday-backpack.",
  },
  {
    question: "Recommend a useful gift",
    answer:
      "The Everyday Backpack ($79) is a useful all-round gift for work, study, and weekends. For a smaller gift, the Ceramic Mug ($24) is a simple choice. View the backpack at /products/everyday-backpack.",
  },
  {
    question: "Compare the backpack and sneakers",
    answer:
      "The Everyday Backpack costs $79 and is best for carrying daily essentials. Cloud Sneakers cost $96 and focus on all-day comfort. Choose the backpack for practicality or the sneakers for everyday wear.",
  },
];

const agentPrompt: ChatMessage = {
  id: "agent-prompt",
  role: "assistant",
  content: "Would you like to connect with a customer support agent?",
};

const StoreChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [guidedStep, setGuidedStep] = useState<GuidedStep>("questions");
  const [agentRequested, setAgentRequested] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, messages, isSending]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const chooseQuickPrompt = (prompt: QuickPrompt) => {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: prompt.question,
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: prompt.answer,
      },
      agentPrompt,
    ]);
    setGuidedStep("agent-prompt");
  };

  const finishGuidedChat = (connectToAgent: boolean) => {
    setAgentRequested(connectToAgent);
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: connectToAgent ? "Connect me to an agent" : "No, thank you",
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: connectToAgent
          ? "The automated chat is complete. Continue to our Contact page to send your message to the support team."
          : "No problem. Thanks for chatting with Broadway Store. Have a lovely day!",
      },
    ]);
    setGuidedStep("finished");
  };

  const restartChat = () => {
    setMessages([welcomeMessage]);
    setInput("");
    setGuidedStep("questions");
    setAgentRequested(false);
  };

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSending || guidedStep !== "questions") {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => !message.error && message.id !== "welcome")
            .slice(-10)
            .map(({ role, content: messageContent }) => ({
              role,
              content: messageContent,
            })),
        }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.message) {
        throw new Error(data.error ?? "Unable to contact the assistant.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message!,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "The assistant is unavailable right now.",
          error: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          role="dialog"
          aria-label="Broadway Store shopping assistant"
          className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-950/20"
        >
          <header className="flex items-center gap-3 bg-[#111136] px-4 py-4 text-white">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-950/30">
              <FiShoppingBag className="size-5" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold">
                Broadway Store Assistant
              </h2>
              <p className="mt-0.5 text-[11px] text-indigo-200">
                Product help powered by OpenAI
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-auto grid size-9 place-items-center rounded-lg text-indigo-200 transition hover:bg-white/10 hover:text-white"
              aria-label="Close shopping assistant"
            >
              <FiX className="size-5" />
            </button>
          </header>

          <div
            ref={scrollAreaRef}
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-md bg-indigo-600 text-white"
                      : message.error
                        ? "rounded-bl-md border border-rose-200 bg-rose-50 text-rose-700"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {guidedStep === "questions" && messages.length === 1 && (
              <div className="grid gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.question}
                    type="button"
                    onClick={() => chooseQuickPrompt(prompt)}
                    className="rounded-xl border border-indigo-100 bg-white px-3 py-2.5 text-left text-xs font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    {prompt.question}
                  </button>
                ))}
              </div>
            )}

            {guidedStep === "agent-prompt" && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => finishGuidedChat(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                  <FiHeadphones className="size-4" />
                  Connect agent
                </button>
                <button
                  type="button"
                  onClick={() => finishGuidedChat(false)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
                >
                  No, finish
                </button>
              </div>
            )}

            {guidedStep === "finished" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <FiCheckCircle className="size-4" />
                  Conversation finished
                </div>
                <div
                  className={`mt-3 grid gap-2 ${
                    agentRequested ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {agentRequested && (
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
                    >
                      <FiHeadphones className="size-4" />
                      Contact agent
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={restartChat}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <FiRefreshCw className="size-3.5" />
                    Start again
                  </button>
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="size-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-indigo-400" />
                  <span className="sr-only">Assistant is responding</span>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white p-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 pl-4 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1_000}
                disabled={isSending || guidedStep !== "questions"}
                placeholder={
                  guidedStep === "questions"
                    ? "Ask about our products..."
                    : "Complete the selection above"
                }
                aria-label="Message the shopping assistant"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={
                  !input.trim() || isSending || guidedStep !== "questions"
                }
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                aria-label="Send message"
              >
                <FiSend className="size-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] leading-4 text-slate-400">
              AI can make mistakes. Confirm important product details before
              purchasing.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={
          isOpen ? "Close shopping assistant" : "Open shopping assistant"
        }
        className="ml-auto grid size-14 place-items-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        {isOpen ? (
          <FiX className="size-6" />
        ) : (
          <FiMessageCircle className="size-6" />
        )}
      </button>
    </div>
  );
};

export default StoreChatbot;
