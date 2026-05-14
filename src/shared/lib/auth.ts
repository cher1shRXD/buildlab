import { getServerClient } from "@/db";

export async function auth() {
  const supabase = await getServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  return {
    user: {
      id: user.id,
      email: user.email ?? "",
      name: (user.user_metadata?.full_name ?? user.user_metadata?.name ?? null) as string | null,
      image: (user.user_metadata?.avatar_url ?? null) as string | null,
    },
  };
}
