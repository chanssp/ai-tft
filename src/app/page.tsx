import Header from "@/components/Header";
import PaperCard from "@/components/PaperCard";
import data from "@/data/2026-02.json";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Month Header */}
        <div className="mb-10">
          <p className="text-sm text-[var(--color-accent)] font-mono mb-2">
            Monthly Report
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            {data.title}
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-2xl">
            HuggingFace Papers에서 가장 많은 관심(upvote)을 받은 상위 5개 논문을
            투자자 관점에서 분석했습니다.
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs text-[var(--color-text-muted)]">
            <span>
              출처:{" "}
              <a
                href={data.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                HuggingFace Papers
              </a>
            </span>
            <span className="text-[var(--color-border)]">|</span>
            <span>생성일: {data.generated_at}</span>
          </div>
        </div>

        {/* Papers */}
        <div className="space-y-4">
          {data.papers.map((paper) => (
            <PaperCard key={paper.rank} paper={paper} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
          <p>
            AI TFT — 매월 AI 기술 트렌드를 투자 관점에서 분석합니다.
          </p>
          <p className="mt-1">
            데이터 소스: HuggingFace Daily Papers | 분석: Claude API
          </p>
        </footer>
      </main>
    </div>
  );
}
