"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type DropdownProps = {
  label: string;
  trigger: (open: boolean) => ReactNode;
  children: (close: () => void) => ReactNode;
  className?: string;
};

const Dropdown = ({
  label,
  trigger,
  children,
  className = "",
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger(open)}
      </button>
      {open && children(close)}
    </div>
  );
};

export default Dropdown;
