export type StockAnalysisIntent =
  | { type: "SUBMIT_QUERY"; ticker: string; query: string }
  | { type: "RETRY" }
  | { type: "RESET" };
