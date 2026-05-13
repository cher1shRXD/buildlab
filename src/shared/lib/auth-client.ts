"use client";

import { createBrowserClient } from "@supabase/ssr";

const getClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

export async function signIn() {
  await getClient().auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  await getClient().auth.signOut();
  window.location.href = "/login";
}
