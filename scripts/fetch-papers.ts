/**
 * fetch-papers.ts
 *
 * HuggingFace Papers에서 월간 Top 5 논문을 가져와
 * Claude API로 투자자 관점 요약을 생성하는 스크립트.
 *
 * 사용법:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/fetch-papers.ts 2026-03
 */

import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync } from "fs";
import { resolve } from "path";

const client = new Anthropic();

interface RawPaper {
  title: string;
  upvotes: number;
  paper_url: string;
  arxiv_url: string;
  authors: string[];
  organization: string;
}

async function fetchMonthlyPapers(month: string): Promise<RawPaper[]> {
  const url = `https://huggingface.co/papers/month/${month}`;
  console.log(`Fetching papers from: ${url}`);

  // HuggingFace Papers 페이지를 가져와서 파싱
  // 실제 구현에서는 HF API나 HTML 파싱이 필요합니다.
  // 여기서는 수동 데이터 입력을 위한 placeholder입니다.
  console.log(
    "NOTE: HuggingFace does not have a public API for paper rankings."
  );
  console.log(
    "Please manually update the raw papers data or implement web scraping."
  );

  return [];
}

async function summarizePaper(paper: RawPaper): Promise<Record<string, string>> {
  const prompt = `당신은 VC(벤처캐피털) 투자자를 위한 AI 기술 분석가입니다.
다음 AI 논문에 대해 한국어로 분석해주세요.

논문: ${paper.title}
저자: ${paper.authors.join(", ")}
기관: ${paper.organization}
arXiv: ${paper.arxiv_url}

다음 4가지 항목으로 분석해주세요. 각 항목은 2~3 문단으로 구체적으로 작성하세요:

1. **연구 개요 (what)**: 이 논문/프로젝트는 무엇을 연구한 것인가?
2. **기술 설명 (tech)**: 기술에 대해 정확히 설명 (비전공자도 이해할 수 있는 수준으로)
3. **기존 대비 진전 (progress)**: 같은 영역의 기존 대비 어떤 progress가 있는지?
4. **투자 시사점 (investment)**: 투자 관점에서의 시사점

JSON 형태로 응답해주세요:
{"what": "...", "tech": "...", "progress": "...", "investment": "..."}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Failed to parse summary for: ${paper.title}`);

  return JSON.parse(jsonMatch[0]);
}

async function main() {
  const month = process.argv[2] || new Date().toISOString().slice(0, 7);
  console.log(`\nGenerating AI TFT report for: ${month}\n`);

  const papers = await fetchMonthlyPapers(month);

  if (papers.length === 0) {
    console.log("\nNo papers fetched. Exiting.");
    console.log(
      "To generate summaries, populate the raw papers data first.\n"
    );
    return;
  }

  const top5 = papers.sort((a, b) => b.upvotes - a.upvotes).slice(0, 5);

  const results = [];
  for (let i = 0; i < top5.length; i++) {
    const paper = top5[i];
    console.log(`[${i + 1}/5] Summarizing: ${paper.title}`);
    const summary = await summarizePaper(paper);
    results.push({
      rank: i + 1,
      ...paper,
      tags: [],
      summary,
    });
  }

  const output = {
    month,
    title: `${month.replace("-", "년 ")}월 AI 트렌드 리포트`,
    generated_at: new Date().toISOString().slice(0, 10),
    source: `https://huggingface.co/papers/month/${month}`,
    papers: results,
  };

  const outPath = resolve(__dirname, `../src/data/${month}.json`);
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\nReport saved to: ${outPath}\n`);
}

main().catch(console.error);
