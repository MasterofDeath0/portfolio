"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Experience } from "@/config/experience";

export default function ExperienceItem({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden transition-colors"
      style={{ background: "transparent" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-2 flex items-start justify-between gap-4 group"
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {exp.companyUrl ? (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:underline underline-offset-2"
                style={{ color: "var(--text-primary)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {exp.company}
              </a>
            ) : (
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {exp.company}
              </span>
            )}

            {exp.isCurrent && (
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                style={{
                  background: "rgba(34,197,94,0.12)",
                  color: "#22c55e",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                Working
              </span>
            )}
          </div>

          <span
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {exp.role}
          </span>
        </div>

        <div className="flex flex-col items-end gap-0 shrink-0">
          <span
            className="text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            {exp.period}
          </span>

          <span
            className="text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            {exp.location}
          </span>

          <ChevronDown
            size={14}
            className="transition-transform mt-0"
            style={{
              color: "var(--muted-foreground)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="pb-2 border-t pt-1"
              style={{ borderColor: "var(--border)" }}
            >
              <ul className="space-y-1">
                {exp.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--text-dim)" }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
