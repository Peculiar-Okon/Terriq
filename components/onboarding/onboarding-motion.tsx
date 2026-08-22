"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Wraps the onboarding step content. Fades/slides in when the step mounts,
 * giving a seamless transition between onboarding pages.
 */
export function StepTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={usePathname()}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Staggered entrance for elements within an onboarding step.
 */
export function StepReveal({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated step progress bar for the onboarding header.
 * steps: total number of steps; current: 1-based current step.
 */
export function StepProgress({
  steps,
  current,
}: {
  steps: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${current} of ${steps}`}>
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[#D9D7CE]">
          <motion.div
            className="h-full rounded-full bg-[#23483A]"
            initial={false}
            animate={{ scaleX: i < current ? 1 : 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Selectable option card with hover lift and tap feedback.
 */
export function OptionCard({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition-colors sm:px-5 sm:py-5 ${
        selected
          ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
          : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

/**
 * Animated check indicator for selected options.
 */
export function CheckDot({ selected }: { selected: boolean }) {
  return (
    <motion.span
      animate={selected ? { scale: 1 } : { scale: 0.9 }}
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
        selected
          ? "border-[#23483A] bg-[#23483A] text-white"
          : "border-[#C9CCC6] text-transparent"
      }`}
    >
      <motion.span
        initial={false}
        animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        ✓
      </motion.span>
    </motion.span>
  );
}