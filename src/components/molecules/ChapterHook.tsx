// src/components/molecules/ChapterHook.tsx
import React from "react";

type ChapterHookProps = {
  text: string;
};

export function ChapterHook({ text }: ChapterHookProps) {
  return (
    <div className="py-24 flex items-center justify-center px-8">
      <p className="font-mono text-white/40 text-center text-sm md:text-base tracking-widest uppercase max-w-xl">
        {text}
      </p>
    </div>
  );
}
