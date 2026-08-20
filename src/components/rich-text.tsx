"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

/**
 * Parses basic Markdown syntax (bold **text**, italics *text*, code `text`)
 * and line breaks into clean React nodes so raw markdown syntax (*, **) isn't shown to users.
 */
export const RichText = ({ content, className }: RichTextProps) => {
  if (!content) return null;

  // Split by newlines
  const paragraphs = content.split("\n");

  return (
    <div className={cn("space-y-1.5 leading-relaxed", className)}>
      {paragraphs.map((paragraph, pIdx) => {
        if (!paragraph.trim()) {
          return <div key={pIdx} className="h-1.5" />;
        }

        // Parse inline bold (**text**) and italic (*text*)
        const tokens = parseInlineMarkdown(paragraph);

        return (
          <p key={pIdx} className="text-slate-800">
            {tokens.map((token, tIdx) => {
              if (token.type === "bold") {
                return (
                  <strong key={tIdx} className="font-bold text-slate-900">
                    {token.value}
                  </strong>
                );
              }
              if (token.type === "italic") {
                return (
                  <em key={tIdx} className="italic text-slate-800">
                    {token.value}
                  </em>
                );
              }
              return <React.Fragment key={tIdx}>{token.value}</React.Fragment>;
            })}
          </p>
        );
      })}
    </div>
  );
};

/**
 * Helper to strip markdown symbols like **, *, ### for plain text copy/preview
 */
export const cleanPlainText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold **
    .replace(/\*(.*?)\*/g, "$1")     // Remove italic *
    .replace(/`(.*?)`/g, "$1")       // Remove inline code `
    .replace(/^#+\s+/gm, "");        // Remove headings #
};

function parseInlineMarkdown(text: string): Array<{ type: "text" | "bold" | "italic"; value: string }> {
  const result: Array<{ type: "text" | "bold" | "italic"; value: string }> = [];
  
  // Regex for **bold** or *italic*
  const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding normal text
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        value: text.substring(lastIndex, match.index),
      });
    }

    if (match[2] !== undefined) {
      // Bold **match[2]**
      result.push({
        type: "bold",
        value: match[2],
      });
    } else if (match[3] !== undefined) {
      // Italic *match[3]*
      result.push({
        type: "italic",
        value: match[3],
      });
    }

    lastIndex = regex.lastIndex;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    result.push({
      type: "text",
      value: text.substring(lastIndex),
    });
  }

  return result;
}
