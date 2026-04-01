import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";

interface Props {
  confidence: number;
}

export default function ConfidenceBar({ confidence }: Props) {
  const pct = Math.round(confidence * 100);
  const s = stockAnalysisStyles.confidenceBar;

  const fillClass =
    pct > 60 ? s.fillHigh : pct > 30 ? s.fillMid : s.fillLow;

  return (
    <div className={s.wrapper}>
      <div className={s.label}>
        <span>신뢰도</span>
        <span>{pct}%</span>
      </div>
      <div className={s.track}>
        <div className={fillClass} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
