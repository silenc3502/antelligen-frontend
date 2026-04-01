import { atom } from "jotai";
import type { StockAnalysisState } from "@/features/stock-recommendation/domain/state/stockAnalysisState";
import type { AnalysisHistoryItem } from "@/features/stock-recommendation/domain/model/stockAnalysis";

export const stockAnalysisAtom = atom<StockAnalysisState>({ status: "IDLE" });

export const analysisHistoryAtom = atom<AnalysisHistoryItem[]>([]);
