import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import MonthlyReportView from "@/components/MonthlyReportView";
import Footer from "@/components/Footer";
import { getReport, getAdjacentMonths, getAvailableMonths } from "@/lib/data";

interface PageProps {
  params: Promise<{ year: string; month: string }>;
}

export async function generateStaticParams() {
  const months = getAvailableMonths();
  return months.map((m) => {
    const [year, month] = m.split("-");
    return { year, month };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month } = await params;
  const report = getReport(`${year}-${month}`);
  if (!report) return { title: "Not Found | AI TFT" };
  return {
    title: `${report.title} | AI TFT`,
    description: `${report.title} — HuggingFace Papers 상위 5개 논문을 투자자 관점에서 분석합니다.`,
  };
}

export default async function MonthlyReportPage({ params }: PageProps) {
  const { year, month } = await params;
  const monthKey = `${year}-${month}`;
  const report = getReport(monthKey);
  if (!report) notFound();

  const { prev, next } = getAdjacentMonths(monthKey);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <MonthlyReportView report={report} prevMonth={prev} nextMonth={next} />
        <Footer />
      </main>
    </div>
  );
}
