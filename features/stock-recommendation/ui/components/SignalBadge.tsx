import type { AgentSignal } from "@/features/stock-recommendation/domain/model/stockAnalysis";
import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";

interface Props {
  signal: AgentSignal;
}

const LABELS: Record<NonNullable<AgentSignal>, string> = {
  bullish: "상승",
  bearish: "하락",
  neutral: "중립",
};

export default function SignalBadge({ signal }: Props) {
  if (!signal) return null;

  return (
    <span className={stockAnalysisStyles.signalBadge[signal]}>
      {LABELS[signal]}
    </span>
  );
}
