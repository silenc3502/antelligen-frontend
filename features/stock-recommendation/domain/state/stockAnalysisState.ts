import type { StockAnalysisResult } from "@/features/stock-recommendation/domain/model/stockAnalysis";

export type StockAnalysisState =
  | { status: "IDLE" }
  | { status: "ANALYZING"; loadingStep: 0 | 1 | 2 | 3 }
  | {
      status: "SUCCESS";
      result: StockAnalysisResult;
      resultStatus: "success" | "partial_failure";
    }
  | { status: "ERROR"; message: string; retryable: boolean };
