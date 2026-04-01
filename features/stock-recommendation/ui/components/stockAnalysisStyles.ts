export const stockAnalysisStyles = {
  inputForm: {
    wrapper: "flex flex-col gap-4",
    label: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
    input:
      "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50",
    textarea:
      "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 resize-none",
    button:
      "w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  },

  loadingSteps: {
    wrapper: "mt-6 flex flex-col gap-3",
    item: "flex items-center gap-3",
    iconDone:
      "flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs",
    iconActive:
      "flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-500",
    iconPending:
      "flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600",
    spinnerInner: "h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent",
    labelDone: "text-sm text-zinc-500 line-through dark:text-zinc-400",
    labelActive: "text-sm font-semibold text-blue-600 dark:text-blue-400",
    labelPending: "text-sm text-zinc-400 dark:text-zinc-500",
  },

  signalBadge: {
    bullish:
      "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400",
    bearish:
      "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400",
    neutral:
      "inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  },

  confidenceBar: {
    wrapper: "flex flex-col gap-1",
    label: "flex justify-between text-xs text-zinc-500 dark:text-zinc-400",
    track: "h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700",
    fillHigh: "h-full rounded-full bg-green-500 transition-all",
    fillMid: "h-full rounded-full bg-yellow-400 transition-all",
    fillLow: "h-full rounded-full bg-red-400 transition-all",
  },

  resultHeader: {
    wrapper:
      "rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
    top: "flex flex-wrap items-center gap-3 mb-4",
    ticker: "text-lg font-bold text-zinc-900 dark:text-zinc-50",
    answer: "mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300",
  },

  agentCard: {
    wrapper:
      "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
    header: "flex flex-wrap items-center gap-2 mb-3",
    name: "text-base font-semibold text-zinc-900 dark:text-zinc-50",
    summary: "mt-2 text-sm text-zinc-700 dark:text-zinc-300",
    keyPointsList: "mt-3 flex flex-col gap-1",
    keyPoint: "flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400",
    keyPointDot: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400",
    execTime: "mt-3 text-xs text-zinc-400",
    errorWrapper:
      "flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400",
  },

  financeTable: {
    wrapper: "mt-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700",
    row: "flex items-center justify-between border-b border-zinc-100 px-4 py-2 last:border-0 dark:border-zinc-800",
    label: "text-xs text-zinc-500 dark:text-zinc-400",
    value: "text-sm font-medium text-zinc-900 dark:text-zinc-50",
  },

  disclosureDetails: {
    wrapper: "mt-4 flex flex-col gap-3",
    sectionLabel: "text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500",
    filingItem: "flex items-center justify-between text-sm",
    filingTitle: "text-zinc-700 dark:text-zinc-300",
    filingDate: "text-xs text-zinc-400",
    badgeGroup: "flex flex-wrap gap-2 mt-1",
    badge:
      "inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  },

  historyTimeline: {
    wrapper: "mt-8",
    title: "mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-50",
    list: "flex flex-col gap-3",
    item: "rounded-lg border border-zinc-200 bg-white p-4 cursor-pointer hover:border-zinc-300 transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600",
    itemHeader: "flex flex-wrap items-center gap-2",
    itemDate: "ml-auto text-xs text-zinc-400",
    itemQuery: "mt-1 text-sm text-zinc-600 dark:text-zinc-400 truncate",
    expandedContent: "mt-3 border-t border-zinc-100 pt-3 dark:border-zinc-800",
    expandedSummary: "text-sm text-zinc-700 dark:text-zinc-300",
    expandedPoints: "mt-2 flex flex-col gap-1",
    expandedPoint: "text-xs text-zinc-500 dark:text-zinc-400",
  },

  warningBanner:
    "flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/20 dark:text-yellow-400",

  errorBanner:
    "flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800/50 dark:bg-red-900/20",

  retryButton:
    "rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors",
};
