"use client";

import { useState, useEffect, useRef } from "react";

const siteCommands: Record<string, string> = {
  help: `Available commands:
  about          Who I am
  skills         Technologies I work with
  projects       What I've built
  contact        How to reach me
  social         My social links
  clear          Clear the terminal
  whoami         Just... try it`,

  about: `Sanyam Aggarwal
  Engineer · Builder · Creator
  
  I love building products that matter — from AI tools to mobile apps.
  Currently building in public and shipping fast.`,

  skills: `Frontend:   React, Next.js, Tailwind CSS, TypeScript
  Backend:    Node.js, Hono, PostgreSQL, Firebase
  Mobile:     React Native, Expo
  Tools:      Git, Figma, Linear, Vercel`,

  projects: `FocusLoop    — Doomscrolling detox app (React + Vite)
  FRAGR        — Perfume resale marketplace (Expo + Firebase)
  FitVeda      — Indian AI meal planner (React + Hono + Claude)
  Portfolio    — This site (Next.js 15 + MDX)`,

  contact: `Email:    sanyam@example.com
  GitHub:   github.com/MasterofDeath0
  Twitter:  x.com/MasterofDeath0`,

  social: `GitHub      →  github.com/MasterofDeath0
  Twitter     →  x.com/MasterofDeath0
  LinkedIn    →  linkedin.com/in/sanyamaggarwal`,

  whoami: `root`,
};

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

const WELCOME = `Welcome to sanyam.sh v1.0.0
Type 'help' to see available commands.
`;

export default function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([{ type: "output", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    const newLines: Line[] = [{ type: "input", text: raw }];

    if (cmd === "clear") {
      setLines([{ type: "output", text: WELCOME }]);
      return;
    }

    const result = siteCommands[cmd];
    if (result) {
      newLines.push({ type: "output", text: result });
    } else {
      newLines.push({ type: "error", text: `command not found: ${cmd}\nType 'help' for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="space-y-1 mb-6">
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Terminal
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Interactive shell. Type commands to explore.
        </p>
      </div>

      <div
        className="rounded-xl border overflow-hidden cursor-text"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Titlebar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "var(--border)", background: "var(--muted)" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28CA41" }} />
          <span
            className="ml-auto text-xs font-mono"
            style={{ color: "var(--muted-foreground)" }}
          >
            sanyam.sh
          </span>
        </div>

        {/* Output */}
        <div className="p-4 min-h-64 max-h-96 overflow-y-auto font-mono text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i}>
              {line.type === "input" && (
                <p>
                  <span style={{ color: "#28CA41" }}>❯</span>{" "}
                  <span style={{ color: "var(--text-primary)" }}>{line.text}</span>
                </p>
              )}
              {(line.type === "output" || line.type === "error") && (
                <pre
                  className="whitespace-pre-wrap mt-1 mb-3"
                  style={{
                    color: line.type === "error" ? "#FF5F57" : "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {line.text}
                </pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />

          {/* Input line */}
          <div className="flex items-center gap-2">
            <span style={{ color: "#28CA41" }}>❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent outline-none caret-current"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
              }}
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
