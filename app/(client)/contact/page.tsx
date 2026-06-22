import type { Metadata } from "next";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return (
    <main className="flex-1 px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[2rem] bg-[#312e81] p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c7d2fe]">
            Contact us
          </p>
          <h1 className="mt-4 text-4xl font-black">We would love to help.</h1>
          <p className="mt-4 leading-7 text-[#e0e7ff]">
            Replace these details with your real support channels, business
            hours, location, and response-time expectations.
          </p>
          <div className="mt-10 space-y-5 text-sm">
            <p className="flex items-center gap-3">
              <FaEnvelope /> hello@broadway-store.test
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt /> +00 123 456 789
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt /> 123 Example Street, Your City
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e0e7ff] bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold text-[#1e1b4b]">Send a message</h2>
          <p className="mt-2 text-[#64748b]">
            This form is visual only until it is connected to a server action or
            API endpoint.
          </p>
          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="form-control">
              <span className="mb-2 text-sm font-semibold text-[#334155]">
                Name
              </span>
              <input
                className="input w-full border-[#cbd5e1] bg-white"
                placeholder="Your name"
              />
            </label>
            <label className="form-control">
              <span className="mb-2 text-sm font-semibold text-[#334155]">
                Email
              </span>
              <input
                type="email"
                className="input w-full border-[#cbd5e1] bg-white"
                placeholder="you@example.com"
              />
            </label>
            <label className="form-control sm:col-span-2">
              <span className="mb-2 text-sm font-semibold text-[#334155]">
                Message
              </span>
              <textarea
                className="textarea min-h-36 w-full border-[#cbd5e1] bg-white"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="button"
              className="btn border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca] sm:col-span-2"
            >
              Send message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
