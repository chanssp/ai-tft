"use client";

import { useState, useMemo } from "react";
import type { Paper } from "@/types";

const sectionConfig = [
  { key: "what" as const, label: "연구 개요", icon: "01" },
  { key: "tech" as const, label: "기술 설명", icon: "02" },
  { key: "progress" as const, label: "기존 대비 진전", icon: "03" },
  { key: "investment" as const, label: "투자 시사점", icon: "04" },
];

function extractTakeaway(investment: string): string {
  // Strip markdown bold markers
  const clean = investment.replace(/\*\*/g, "");
  // Get first sentence (up to first period followed by space/newline, or first colon+newline)
  const match = clean.match(/^(.+?[.:])\s/);
  if (match) return match[1];
  // Fallback: first 100 chars
  return clean.slice(0, 100) + (clean.length > 100 ? "..." : "");
}

export default function PaperCard({ paper }: { paper: Paper }) {
  const [expanded, setExpanded] = useState(false);

  const takeaway = useMemo(
    () => extractTakeaway(paper.summary.investment),
    [paper.summary.investment]
  );

  const formatNumber = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  };

  return (
    <article className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 transition-colors">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 pb-4 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center font-bold text-lg">
              {paper.rank}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight mb-2">
                {paper.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <span>{paper.organization}</span>
                <span className="text-[var(--color-border)]">|</span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  {formatNumber(paper.upvotes)}
                </span>
              </div>
            </div>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 text-[var(--color-text-muted)] transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 ml-14">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Investment takeaway — visible when collapsed */}
        {!expanded && (
          <p className="mt-3 ml-14 text-xs leading-relaxed text-[var(--color-text-muted)] line-clamp-1">
            <span className="text-[var(--color-accent)] font-medium">투자 포인트</span>
            <span className="mx-1.5 text-[var(--color-border)]">|</span>
            {takeaway}
          </p>
        )}
      </button>

      {/* Expandable Content */}
      {expanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-[var(--color-border)] pt-5">
          {sectionConfig.map(({ key, label, icon }) => (
            <section key={key}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="text-xs font-mono text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded">
                  {icon}
                </span>
                <h4 className="text-sm font-semibold text-[var(--color-text)]">
                  {label}
                </h4>
              </div>
              <div className="text-sm leading-relaxed text-[var(--color-text-muted)] whitespace-pre-line ml-8">
                {paper.summary[key]}
              </div>
            </section>
          ))}

          {/* Links */}
          <div className="flex gap-3 ml-8 pt-2">
            <a
              href={paper.arxiv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-colors"
            >
              arXiv Paper
            </a>
            <a
              href={paper.paper_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-colors"
            >
              HuggingFace
            </a>
          </div>
        </div>
      )}
    </article>
  );
}
