// src/components/molecules/ChapterHook.tsx
import React from "react";

type ChapterHookProps = {
  text: string;
};

export function ChapterHook({ text }: ChapterHookProps) {
  return (
    <div className="py-12 md:py-20 flex items-center justify-center px-8">
      <p
        className="font-mono text-white/45 text-center uppercase max-w-xl"
        style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)", letterSpacing: "0.06em" }}
      >
        {text}
      </p>
    </div>
  );
}
