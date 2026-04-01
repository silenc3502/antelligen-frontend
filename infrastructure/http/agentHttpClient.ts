import { env } from "@/infrastructure/config/env";

export async function agentHttpClient<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${env.agentApiBaseUrl}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
