"use server";

import { createClient } from "@/lib/supabase/server";

function generateOTP() {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
}

export async function sendRegisterOTP(
  formData: FormData
) {
  const supabase = await createClient();

  const businessName = String(
    formData.get("business_name")
  );

  const ownerName = String(
    formData.get("owner_name")
  );

  const businessType = String(
    formData.get("business_type")
  );

  const phone = String(
    formData.get("phone")
  );

  const email = String(
    formData.get("email")
  );

  const password = String(
    formData.get("password")
  );

  const otp = generateOTP();

  const expiredAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await supabase
    .from("otp_codes")
    .delete()
    .eq("phone", phone);

  const { error } = await supabase
    .from("otp_codes")
    .insert({
  phone,
  otp_code: otp,
  business_name: businessName,
  owner_name: ownerName,
  business_type: businessType,
  email,
  expired_at: expiredAt.toISOString(),
});

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    otp,
  };
}