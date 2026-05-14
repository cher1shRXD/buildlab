import { createServerClient } from "@supabase/ssr";
import { cache } from "react";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

type CookieOptions = Parameters<typeof createServerClient>[2]["cookies"];

function makeClient(cookieOptions: CookieOptions) {
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, { cookies: cookieOptions });
}

export const getServerClient = cache(async () => {
  const store = await cookies();
  return makeClient({
    getAll: () => store.getAll(),
    setAll: (list) => {
      try {
        list.forEach(({ name, value, options }) => store.set(name, value, options));
      } catch {}
    },
  });
});


export function createRouteClient(request: NextRequest, response: NextResponse) {
  return makeClient({
    getAll: () => request.cookies.getAll(),
    setAll: (list) => {
      list.forEach(({ name, value, options }) => {
        request.cookies.set(name, value);
        response.cookies.set(name, value, options as object);
      });
    },
  });
}
