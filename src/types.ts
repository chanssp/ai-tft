export interface PaperSummary {
  what: string;
  tech: string;
  progress: string;
  investment: string;
}

export interface Paper {
  rank: number;
  title: string;
  upvotes: number;
  paper_url: string;
  arxiv_url: string;
  authors: string[];
  organization: string;
  tags: string[];
  summary: PaperSummary;
}

export interface MonthlyReport {
  month: string;
  title: string;
  generated_at: string;
  source: string;
  papers: Paper[];
}
