import type { Metadata } from "next";
import { FaBoxOpen, FaHeart, FaUsers } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About",
};

const values = [
  {
    title: "Useful choices",
    text: "Placeholder copy about selecting practical, well-designed products.",
    icon: FaBoxOpen,
  },
  {
    title: "Human service",
    text: "Placeholder copy about friendly support before and after purchase.",
    icon: FaUsers,
  },
  {
    title: "Made with care",
    text: "Placeholder copy for your quality, sourcing, or sustainability story.",
    icon: FaHeart,
  },
];

const AboutUsPage = () => {
  return (
    <main className="flex-1">
      <section className="bg-[#eef2ff] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f46e5]">
            About Broadway Store
          </p>
          <h1 className="mt-4 text-4xl font-black text-[#1e1b4b] sm:text-5xl">
            A simple store with room to become your brand.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#64748b]">
            Use this page for your origin story, mission, team, and the reasons
            customers should trust your business.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-3xl border border-[#e0e7ff] bg-white p-7 shadow-sm"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-[#eef2ff] text-[#4f46e5]">
                <value.icon className="size-5" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-[#1e1b4b]">
                {value.title}
              </h2>
              <p className="mt-3 leading-7 text-[#64748b]">{value.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
