"use client";

import SidebarLinks from "./sidebar-content";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  role?: "admin" | "user";
};

const Sidebar = ({ isOpen, onClose, role = "admin" }: SidebarProps) => {
  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <SidebarLinks isOpen={isOpen} onClose={onClose} role={role} />
    </>
  );
};

export default Sidebar;
