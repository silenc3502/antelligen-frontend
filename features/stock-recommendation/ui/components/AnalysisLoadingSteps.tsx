import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";

interface Props {
  currentStep: 0 | 1 | 2 | 3;
}

const STEPS = ["뉴스 분석 중", "공시 분석 중", "재무 분석 중", "종합 분석 완료"];

export default function AnalysisLoadingSteps({ currentStep }: Props) {
  const s = stockAnalysisStyles.loadingSteps;

  return (
    <div className={s.wrapper}>
      {STEPS.map((label, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={label} className={s.item}>
            <div className={isDone ? s.iconDone : isActive ? s.iconActive : s.iconPending}>
              {isDone && <span>✓</span>}
              {isActive && <div className={s.spinnerInner} />}
            </div>
            <span
              className={
                isDone ? s.labelDone : isActive ? s.labelActive : s.labelPending
              }
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
