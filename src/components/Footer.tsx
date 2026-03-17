export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
      <p>AI TFT — 매월 AI 기술 트렌드를 투자 관점에서 분석합니다.</p>
      <p className="mt-1">
        데이터 소스: HuggingFace Daily Papers | 분석: Claude API
      </p>
    </footer>
  );
}
