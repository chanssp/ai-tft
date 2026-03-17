import fs from "fs";
import path from "path";
import type { MonthlyReport } from "@/types";

const DATA_DIR = path.join(process.cwd(), "src/data");

export function getAvailableMonths(): string[] {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => f.replace(".json", ""))
    .sort()
    .reverse();
}

export function getReport(month: string): MonthlyReport | null {
  const filePath = path.join(DATA_DIR, `${month}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as MonthlyReport;
}

export function getLatestMonth(): string {
  return getAvailableMonths()[0];
}

export function getAdjacentMonths(month: string): {
  prev: string | null;
  next: string | null;
} {
  const months = getAvailableMonths();
  const idx = months.indexOf(month);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < months.length - 1 ? months[idx + 1] : null,
    next: idx > 0 ? months[idx - 1] : null,
  };
}

export function monthToPath(month: string): string {
  const [year, m] = month.split("-");
  return `/${year}/${m}`;
}
