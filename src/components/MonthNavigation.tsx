import Link from "next/link";

interface MonthNavigationProps {
  currentMonth: string;
  prevMonth: string | null;
  nextMonth: string | null;
}

function monthToLabel(month: string): string {
  const [year, m] = month.split("-");
  return `${year}년 ${parseInt(m)}월`;
}

function monthToHref(month: string): string {
  const [year, m] = month.split("-");
  return `/${year}/${m}`;
}

export default function MonthNavigation({
  currentMonth,
  prevMonth,
  nextMonth,
}: MonthNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="w-24">
        {prevMonth && (
          <Link
            href={monthToHref(prevMonth)}
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {monthToLabel(prevMonth)}
          </Link>
        )}
      </div>
      <span className="text-sm font-medium text-[var(--color-text)]">
        {monthToLabel(currentMonth)}
      </span>
      <div className="w-24 text-right">
        {nextMonth && (
          <Link
            href={monthToHref(nextMonth)}
            className="flex items-center justify-end gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            {monthToLabel(nextMonth)}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
