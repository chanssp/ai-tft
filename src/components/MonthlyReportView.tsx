import type { MonthlyReport } from "@/types";
import MonthNavigation from "./MonthNavigation";
import PaperCard from "./PaperCard";

interface MonthlyReportViewProps {
  report: MonthlyReport;
  prevMonth: string | null;
  nextMonth: string | null;
}

export default function MonthlyReportView({
  report,
  prevMonth,
  nextMonth,
}: MonthlyReportViewProps) {
  return (
    <div>
      <MonthNavigation
        currentMonth={report.month}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      {/* Month Header */}
      <div className="mb-10">
        <p className="text-sm text-[var(--color-accent)] font-mono mb-2">
          Monthly Report
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          {report.title}
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-2xl">
          HuggingFace Papers에서 가장 많은 관심(upvote)을 받은 상위 5개 논문을
          투자자 관점에서 분석했습니다.
        </p>
        <div className="flex items-center gap-4 mt-4 text-xs text-[var(--color-text-muted)]">
          <span>
            출처:{" "}
            <a
              href={report.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              HuggingFace Papers
            </a>
          </span>
          <span className="text-[var(--color-border)]">|</span>
          <span>생성일: {report.generated_at}</span>
        </div>
      </div>

      {/* Papers */}
      <div className="space-y-4">
        {report.papers.map((paper) => (
          <PaperCard key={paper.rank} paper={paper} />
        ))}
      </div>
    </div>
  );
}
