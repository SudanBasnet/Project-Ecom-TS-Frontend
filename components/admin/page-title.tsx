import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type PageTitleProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  linkText?: string;
  link?: string;
  backLink?: boolean;
};

const PageTitle = ({
  title,
  description,
  eyebrow,
  linkText,
  link = "#",
  backLink = false,
}: PageTitleProps) => {
  return (
    <section className="flex min-h-24 w-full flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:px-6">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
            {eyebrow}
          </p>
        )}
        <h1 className={`${eyebrow ? "mt-1" : ""} text-2xl font-black tracking-tight text-slate-900`}>
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {linkText && (
        <Link
          href={link}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-indigo-300 bg-indigo-50 px-5 text-sm font-bold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-100 sm:self-auto"
        >
          {backLink && <FiArrowLeft className="size-4" />}
          {linkText}
          {!backLink && <FiArrowRight className="size-4" />}
        </Link>
      )}
    </section>
  );
};

export default PageTitle;
