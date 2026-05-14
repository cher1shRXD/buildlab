import { NextRequest, NextResponse } from "next/server";
import { createRouteClient } from "@/db";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const response = NextResponse.redirect(`${origin}${next}`);

  try {
    const supabase = createRouteClient(request, response);

    console.log("[auth/callback] cookies:", request.cookies.getAll().map((c) => c.name).join(", "));
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    }
    return response;
  } catch (err) {
    console.error("[auth/callback] threw:", err);
    return NextResponse.redirect(`${origin}/login?error=unexpected`);
  }
}
