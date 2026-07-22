"use server";

import { createClient } from "@/lib/supabase/server";

export async function registerTrial(formData: FormData) {
  const supabase = await createClient();

  const businessName = String(formData.get("business_name"));
  const ownerName = String(formData.get("owner_name"));
  const businessType = String(formData.get("business_type"));
  const phone = String(formData.get("phone"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  // 1. Create Auth User
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const user = data.user;

  if (!user) {
    return {
      success: false,
      message: "User gagal dibuat.",
    };
  }

  // lanjut step berikutnya...
  return {
    success: true,
    userId: user.id,
  };
}