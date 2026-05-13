import type { ErrorResponse } from "@/shared/types";

export const apiClient = (() => {
  const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    return `http://localhost:${process.env.PORT ?? 3000}`;
  };

  const getServerCookieHeader = async (): Promise<Record<string, string>> => {
    if (typeof window !== "undefined") return {};
    try {
      const { cookies } = await import("next/headers");
      const store = await cookies();
      const cookieHeader = store.toString();
      return cookieHeader ? { Cookie: cookieHeader } : {};
    } catch {
      return {};
    }
  };

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const cookieHeader = await getServerCookieHeader();
    const res = await fetch(`${getBaseUrl()}/api${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...cookieHeader,
        ...init?.headers,
      },
    });

    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      throw error;
    }

    return res.json() as Promise<T>;
  }

  async function requestBlob(path: string, init?: RequestInit): Promise<Blob> {
    const cookieHeader = await getServerCookieHeader();
    const res = await fetch(`${getBaseUrl()}/api${path}`, {
      ...init,
      headers: {
        ...cookieHeader,
        ...init?.headers,
      },
    });
    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      throw error;
    }
    return res.blob();
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
    patch: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
    delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
    postBlob: (path: string) => requestBlob(path, { method: "POST" }),
  };
})();
