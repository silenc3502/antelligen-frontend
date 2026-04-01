"use client";

import { useState } from "react";
import { stockAnalysisStyles } from "@/features/stock-recommendation/ui/components/stockAnalysisStyles";

interface Props {
  onSubmit: (ticker: string, query: string) => void;
  isDisabled?: boolean;
  initialTicker?: string;
  initialQuery?: string;
}

export default function AnalysisInputForm({
  onSubmit,
  isDisabled = false,
  initialTicker = "",
  initialQuery = "",
}: Props) {
  const [ticker, setTicker] = useState(initialTicker);
  const [query, setQuery] = useState(initialQuery);
  const s = stockAnalysisStyles.inputForm;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ticker.trim() || !query.trim() || isDisabled) return;
    onSubmit(ticker.trim(), query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className={s.wrapper}>
      <div>
        <label className={s.label}>
          종목 코드
          <input
            type="text"
            className={`${s.input} mt-1`}
            placeholder="예: 005930"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            disabled={isDisabled}
            maxLength={10}
          />
        </label>
      </div>

      <div>
        <label className={s.label}>
          질문
          <textarea
            className={`${s.textarea} mt-1`}
            placeholder="예: 삼성전자 투자해도 될까요?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isDisabled}
            rows={3}
          />
        </label>
      </div>

      <button
        type="submit"
        className={s.button}
        disabled={isDisabled || !ticker.trim() || !query.trim()}
      >
        {isDisabled ? "분석 중..." : "분석하기"}
      </button>
    </form>
  );
}
