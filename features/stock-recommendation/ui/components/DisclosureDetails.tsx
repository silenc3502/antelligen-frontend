import type { DisclosureData } from "@/features/stock-recommendation/domain/model/stockAnalysis";
import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";

interface Props {
  data: DisclosureData;
}

export default function DisclosureDetails({ data }: Props) {
  const s = stockAnalysisStyles.disclosureDetails;
  const { otherSummary } = data;

  const summaryBadges = [
    { label: `소유권 변동 ${otherSummary.ownership}건`, show: otherSummary.ownership > 0 },
    { label: `주요 사건 ${otherSummary.majorEvent}건`, show: otherSummary.majorEvent > 0 },
    { label: `기타 ${otherSummary.unknown}건`, show: otherSummary.unknown > 0 },
  ].filter((b) => b.show);

  return (
    <div className={s.wrapper}>
      {data.coreFiling.length > 0 && (
        <div>
          <p className={s.sectionLabel}>핵심 공시</p>
          <div className="mt-1 flex flex-col gap-1">
            {data.coreFiling.map((filing, i) => (
              <div key={i} className={s.filingItem}>
                <span className={s.filingTitle}>{filing.title}</span>
                <span className={s.filingDate}>{filing.filedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {summaryBadges.length > 0 && (
        <div>
          <p className={s.sectionLabel}>기타 공시</p>
          <div className={s.badgeGroup}>
            {summaryBadges.map((b) => (
              <span key={b.label} className={s.badge}>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
