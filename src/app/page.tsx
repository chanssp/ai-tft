import Link from "next/link";
import Header from "@/components/Header";
import MonthlyReportView from "@/components/MonthlyReportView";
import Footer from "@/components/Footer";
import {
  getReport,
  getLatestMonth,
  getAdjacentMonths,
  getAvailableMonths,
  monthToPath,
} from "@/lib/data";

export default function Home() {
  const latestMonth = getLatestMonth();
  const report = getReport(latestMonth)!;
  const { prev, next } = getAdjacentMonths(latestMonth);
  const allMonths = getAvailableMonths();
  const pastMonths = allMonths.filter((m) => m !== latestMonth);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <MonthlyReportView
          report={report}
          prevMonth={prev}
          nextMonth={next}
        />

        {/* Past Reports */}
        {pastMonths.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-lg font-semibold mb-6">지난 리포트</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {pastMonths.map((month) => {
                const r = getReport(month);
                if (!r) return null;
                return (
                  <Link
                    key={month}
                    href={monthToPath(month)}
                    className="block p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 transition-colors"
                  >
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {r.papers.length}개 논문 분석 · {r.generated_at}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <Footer />
      </main>
    </div>
  );
}
