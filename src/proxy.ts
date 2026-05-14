import { NextResponse, type NextRequest } from "next/server";
import { createRouteClient } from "@/db";

export async function proxy(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });
  const supabase = createRouteClient(request, supabaseResponse);
  await supabase.auth.getUser();
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
