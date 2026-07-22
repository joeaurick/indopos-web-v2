import { createClient } from "@/lib/supabase/server";

export async function getCurrentBusinessId(): Promise<string> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User belum login");
  }

  const { data: member, error } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!member) {
    throw new Error("Business tidak ditemukan");
  }

  return member.business_id;
}