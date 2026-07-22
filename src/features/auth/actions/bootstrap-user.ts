"use server";

import { createClient } from "@/lib/supabase/server";

export async function bootstrapUser() {
  const supabase = await createClient();

  // ==========================
  // USER
  // ==========================

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User tidak ditemukan");
  }

  // ==========================
  // SUDAH PUNYA BUSINESS?
  // ==========================

  const { data: member } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.id)
    .maybeSingle();

  // Kalau sudah pernah bootstrap
  if (member) {
    return;
  }

  // ==========================
  // METADATA
  // ==========================

  const meta = user.user_metadata ?? {};

  console.log("USER META:", meta);

  const ownerName =
    meta.owner_name ??
    meta.full_name ??
    "Owner";

  const businessName =
    meta.business_name ??
    `${ownerName} Business`;

  const businessType =
    meta.business_type ??
    "restaurant";

  const phone =
    meta.phone ??
    "";

  // ==========================
  // PROFILE
  // ==========================

  const { error: profileError } =
    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: ownerName,
        phone,
      });

  if (profileError) {
    console.error(profileError);
    throw profileError;
  }

  // ==========================
  // BUSINESS
  // ==========================

  const trialStart = new Date();

  const trialEnd = new Date();

  trialEnd.setDate(
    trialEnd.getDate() + 14
  );

  const {
    data: business,
    error: businessError,
  } = await supabase
    .from("businesses")
    .insert({
      name: businessName,
      business_type: businessType,
      phone,
      email: user.email,

      status: "trial",

      is_active: true,

      trial_start:
        trialStart.toISOString(),

      trial_end:
        trialEnd.toISOString(),
    })
    .select()
    .single();

  if (businessError) {
    console.error(businessError);
    throw businessError;
  }

  // ==========================
  // BUSINESS USER
  // ==========================

  const { error: memberError } =
    await supabase
      .from("business_users")
      .insert({
        business_id: business.id,
        user_id: user.id,
        role: "owner",
        is_active: true,
      });

  if (memberError) {
    console.error(memberError);
    throw memberError;
  }
}