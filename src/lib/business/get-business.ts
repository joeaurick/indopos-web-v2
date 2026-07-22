import { createClient } from "@/lib/supabase/server";

export async function getBusiness() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("business_users")
    .select(`
      business_id,
      role,
      businesses (
        id,
        name,
        business_type,
        status,
        trial_start,
        trial_end,
        is_active
      )
    `)
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    throw new Error("Business tidak ditemukan");
  }

  return data;
}