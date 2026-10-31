"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default function MobileNav({ links }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const linkClass =
    "block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-700 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600";

  return (
    <div className="w-full md:hidden">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "নেভিগেশন মেনু বন্ধ করুন" : "নেভিগেশন মেনু খুলুন"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id={menuId}
        className={`overflow-hidden transition-[max-height,opacity,visibility] duration-300 ease-in-out ${
          open
            ? "visible mt-3 max-h-[70vh] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="মোবাইল নেভিগেশন" aria-hidden={!open}>
          <ul className="flex flex-col gap-1 border-t border-gray-100 pt-3">
            <li>
              <Link href="/" onClick={closeMenu} className={linkClass}>
                হোম
              </Link>
            </li>

            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
