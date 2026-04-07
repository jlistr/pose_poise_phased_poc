"use client";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy Link" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: "transparent",
        border: `1px solid rgba(33, 37, 41, 0.2)`,
        cursor: "pointer",
      }}
      className="py-2 px-6 font-outfit text-xs text-brand-dark/70"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
