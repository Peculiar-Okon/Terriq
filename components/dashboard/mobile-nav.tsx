"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { staggerItem } from "@/components/dashboard/dashboard-motion";

const navigation = [
  { label: "Overview", href: "/dashboard" },
  { label: "Sites", href: "/dashboard/sites" },
  { label: "Operations", href: "/dashboard/operations" },
  { label: "Assess", href: "/dashboard/assess" },
  { label: "Plans", href: "/dashboard/plans" },
  { label: "Alerts", href: "/dashboard/alerts" },
  { label: "Local Resources", href: "/dashboard/resources" },
];

const workspaceNavigation = [
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Help", href: "/dashboard/help" },
];

/**
 * Hamburger button + animated slide-in sidebar drawer for mobile.
 * Place inside a page header (it positions itself absolutely on the left).
 */
export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#23483A] transition hover:bg-[#E7E9E2] active:scale-95 lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-[#171A17]/20"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 34,
              }}
              className="relative flex h-full w-[280px] flex-col bg-[#F5F3ED] px-5 py-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#171A17]">
                    Terr<span className="text-[#B66A45]">IQ</span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#23483A] transition hover:bg-[#E7E9E2]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m6 6 12 12" />
                    <path d="m18 6-12 12" />
                  </svg>
                </button>
              </div>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#92958D]">
                Environmental Intelligence
              </p>

              <motion.nav
                className="mt-6 flex-1 overflow-y-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
                }}
              >
                {navigation.map((item) => (
                  <motion.div key={item.href} variants={staggerItem}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-[13px] text-[#6D7069] transition-colors hover:bg-[#E7E9E2] hover:text-[#23483A]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 border-t border-[#D9D7CE]" />

                {workspaceNavigation.map((item) => (
                  <motion.div key={item.href} variants={staggerItem}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-[13px] text-[#6D7069] transition-colors hover:bg-[#E7E9E2] hover:text-[#23483A]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="border-t border-[#D9D7CE] pt-4">
                <p className="text-[13px] font-medium text-[#26332B]">Pearl</p>
                <p className="mt-0.5 text-[11px] text-[#7B8079]">
                  Personal workspace
                </p>
              </div>
              </motion.aside>
            </div>
          )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
