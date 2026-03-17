import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AI TFT</h1>
            <p className="text-xs text-[var(--color-text-muted)]">AI Trend for Tomorrow</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--color-text-muted)] hidden sm:block">
            VC를 위한 AI 기술 트렌드 리포트
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
