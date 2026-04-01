import type { FinanceData } from "@/features/stock-recommendation/domain/model/stockAnalysis";
import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";

interface Props {
  data: FinanceData;
}

function formatKrw(value: number | null): string {
  if (value === null) return "-";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)}조원`;
  }
  return `${Math.round(value / 100_000_000).toLocaleString()}억원`;
}

function formatPct(value: number | null): string {
  if (value === null) return "-";
  return `${value.toFixed(2)}%`;
}

export default function FinanceDataTable({ data }: Props) {
  const s = stockAnalysisStyles.financeTable;

  const rows: { label: string; value: string }[] = [
    { label: "종목명", value: data.stockName ?? "-" },
    { label: "시장", value: data.market ?? "-" },
    { label: "현재 주가", value: data.currentPrice ?? "-" },
    { label: "회계연도", value: data.fiscalYear ?? "-" },
    { label: "ROE", value: formatPct(data.roe) },
    { label: "ROA", value: formatPct(data.roa) },
    { label: "부채비율", value: formatPct(data.debtRatio) },
    { label: "매출액", value: formatKrw(data.sales) },
    { label: "영업이익", value: formatKrw(data.operatingIncome) },
    { label: "당기순이익", value: formatKrw(data.netIncome) },
  ].filter((r) => r.value !== "-");

  return (
    <div className={s.wrapper}>
      {rows.map((row) => (
        <div key={row.label} className={s.row}>
          <span className={s.label}>{row.label}</span>
          <span className={s.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
