import { agentHttpClient } from "@/infrastructure/http/agentHttpClient";
import type { ApiResponse } from "@/infrastructure/http/apiResponse";
import type {
  AgentName,
  AgentResult,
  AgentSignal,
  AnalysisHistoryItem,
  DisclosureData,
  FinanceData,
  StockAnalysisRequest,
  StockAnalysisResult,
} from "@/features/stock-recommendation/domain/model/stockAnalysis";

// ── Raw API response shapes (snake_case) ──────────────────────────────────────

interface RawFinanceData {
  stock_name: string | null;
  market: string | null;
  current_price: string | null;
  roe: number | null;
  roa: number | null;
  debt_ratio: number | null;
  fiscal_year: string | null;
  sales: number | null;
  operating_income: number | null;
  net_income: number | null;
}

interface RawDisclosureFiling {
  title: string;
  filed_at: string;
  type: string;
}

interface RawDisclosureData {
  filings: {
    core: RawDisclosureFiling[];
    other_summary: {
      ownership?: number;
      unknown?: number;
      major_event?: number;
    };
  };
}

interface RawAgentResult {
  agent_name: AgentName;
  status: "success" | "error";
  data: RawFinanceData | RawDisclosureData | Record<string, unknown>;
  signal: AgentSignal;
  confidence: number | null;
  summary: string | null;
  key_points: string[];
  execution_time_ms: number;
  error_message: string | null;
}

interface RawQueryResponse {
  session_id: string;
  result_status: "success" | "partial_failure" | "failure";
  answer: string;
  agent_results: RawAgentResult[];
  total_execution_time_ms: number;
}

interface RawHistoryItem {
  ticker: string;
  query: string;
  overall_signal: AgentSignal;
  confidence: number | null;
  summary: string | null;
  key_points: string[];
  execution_time_ms: number;
  created_at: string;
}

// ── Mappers ───────────────────────────────────────────────────────────────────

function mapFinanceData(raw: RawFinanceData): FinanceData {
  return {
    stockName: raw.stock_name,
    market: raw.market,
    currentPrice: raw.current_price,
    roe: raw.roe,
    roa: raw.roa,
    debtRatio: raw.debt_ratio,
    fiscalYear: raw.fiscal_year,
    sales: raw.sales,
    operatingIncome: raw.operating_income,
    netIncome: raw.net_income,
  };
}

function mapDisclosureData(raw: RawDisclosureData): DisclosureData {
  return {
    coreFiling: (raw.filings?.core ?? []).map((f) => ({
      title: f.title,
      filedAt: f.filed_at,
      type: f.type,
    })),
    otherSummary: {
      ownership: raw.filings?.other_summary?.ownership ?? 0,
      unknown: raw.filings?.other_summary?.unknown ?? 0,
      majorEvent: raw.filings?.other_summary?.major_event ?? 0,
    },
  };
}

function mapAgentResult(raw: RawAgentResult): AgentResult {
  let data: AgentResult["data"];
  if (raw.agent_name === "finance") {
    data = mapFinanceData(raw.data as RawFinanceData);
  } else if (raw.agent_name === "disclosure") {
    data = mapDisclosureData(raw.data as RawDisclosureData);
  } else {
    data = raw.data as Record<string, unknown>;
  }

  return {
    agentName: raw.agent_name,
    status: raw.status,
    data,
    signal: raw.signal,
    confidence: raw.confidence,
    summary: raw.summary,
    keyPoints: raw.key_points ?? [],
    executionTimeMs: raw.execution_time_ms,
    errorMessage: raw.error_message,
  };
}

// ── Public API functions ──────────────────────────────────────────────────────

export async function queryStockAnalysis(
  request: StockAnalysisRequest
): Promise<StockAnalysisResult> {
  const res = await agentHttpClient<ApiResponse<RawQueryResponse>>(
    "/api/v1/agent/query",
    {
      method: "POST",
      body: JSON.stringify({
        query: request.query,
        ticker: request.ticker,
        session_id: request.sessionId,
      }),
    }
  );

  const raw = res.data;
  return {
    sessionId: raw.session_id,
    resultStatus: raw.result_status,
    answer: raw.answer,
    agentResults: raw.agent_results.map(mapAgentResult),
    totalExecutionTimeMs: raw.total_execution_time_ms,
  };
}

export async function fetchAnalysisHistory(
  ticker: string,
  limit = 10
): Promise<AnalysisHistoryItem[]> {
  const res = await agentHttpClient<ApiResponse<RawHistoryItem[]>>(
    `/api/v1/agent/history?ticker=${encodeURIComponent(ticker)}&limit=${limit}`
  );

  return (res.data ?? []).map((item) => ({
    ticker: item.ticker,
    query: item.query,
    overallSignal: item.overall_signal,
    confidence: item.confidence,
    summary: item.summary,
    keyPoints: item.key_points ?? [],
    executionTimeMs: item.execution_time_ms,
    createdAt: item.created_at,
  }));
}
