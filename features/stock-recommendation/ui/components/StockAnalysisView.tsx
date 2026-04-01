"use client";

import { useAtomValue } from "jotai";
import { useStockAnalysis } from "@/features/stock-recommendation/application/hooks/useStockAnalysis";
import {
  analysisHistoryAtom,
} from "@/features/stock-recommendation/application/atoms/stockAnalysisAtom";
import {
  overallSignalAtom,
  overallConfidenceAtom,
} from "@/features/stock-recommendation/application/selectors/stockAnalysisSelectors";
import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";
import AnalysisInputForm from "@/features/stock-recommendation/ui/components/AnalysisInputForm";
import AnalysisLoadingSteps from "@/features/stock-recommendation/ui/components/AnalysisLoadingSteps";
import AnalysisResultHeader from "@/features/stock-recommendation/ui/components/AnalysisResultHeader";
import AgentCard from "@/features/stock-recommendation/ui/components/AgentCard";
import HistoryTimeline from "@/features/stock-recommendation/ui/components/HistoryTimeline";

export default function StockAnalysisView() {
  const { state, submit, reset } = useStockAnalysis();
  const history = useAtomValue(analysisHistoryAtom);
  const overallSignal = useAtomValue(overallSignalAtom);
  const overallConfidence = useAtomValue(overallConfidenceAtom);

  // ERROR
  if (state.status === "ERROR") {
    return (
      <div className="flex flex-col gap-6">
        <div className={stockAnalysisStyles.errorBanner}>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            {state.message}
          </p>
          {state.retryable && (
            <button onClick={reset} className={stockAnalysisStyles.retryButton}>
              다시 시도
            </button>
          )}
        </div>
      </div>
    );
  }

  // IDLE
  if (state.status === "IDLE") {
    return (
      <div className="flex flex-col gap-6">
        <AnalysisInputForm onSubmit={submit} />
        <HistoryTimeline history={history} />
      </div>
    );
  }

  // ANALYZING
  if (state.status === "ANALYZING") {
    return (
      <div className="flex flex-col gap-6">
        <AnalysisInputForm onSubmit={submit} isDisabled />
        <AnalysisLoadingSteps currentStep={state.loadingStep} />
      </div>
    );
  }

  // SUCCESS
  const { result, resultStatus } = state;
  const ticker = result.agentResults[0]?.data
    ? (result.agentResults.find((r) => r.agentName === "finance")?.data as { stockName?: string })
        ?.stockName ?? ""
    : "";

  return (
    <div className="flex flex-col gap-6">
      <AnalysisInputForm onSubmit={submit} />

      {resultStatus === "partial_failure" && (
        <div className={stockAnalysisStyles.warningBanner}>
          <span>⚠</span>
          <span>일부 에이전트 응답 없음 — 제공된 결과만 표시됩니다.</span>
        </div>
      )}

      <AnalysisResultHeader
        ticker={ticker}
        answer={result.answer}
        overallSignal={overallSignal}
        overallConfidence={overallConfidence}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {result.agentResults.map((agentResult) => (
          <AgentCard key={agentResult.agentName} result={agentResult} />
        ))}
      </div>

      <HistoryTimeline history={history} />
    </div>
  );
}
