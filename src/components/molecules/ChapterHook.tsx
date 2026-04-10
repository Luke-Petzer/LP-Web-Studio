// src/components/molecules/ChapterHook.tsx
import React from "react";

type ChapterHookProps = {
  text: string;
};

export function ChapterHook({ text }: ChapterHookProps) {
  return (
    <div className="flex items-center justify-center px-8" style={{ paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}>
      <p
        className="font-mono text-white/65 text-center max-w-[480px]"
        style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", letterSpacing: "0.04em" }}
      >
        {text}
      </p>
    </div>
  );
}
