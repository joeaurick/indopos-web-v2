"use server";

import { createClient } from "@/lib/supabase/server";

type RegisterData = {
  ownerName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  password: string;
};

export async function register(
  data: RegisterData
) {
  const supabase = await createClient();

  const { error } =
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,

      options: {
        data: {
          owner_name: data.ownerName,
          business_name: data.businessName,
          business_type: data.businessType,
          phone: data.phone,
        },
      },
    });

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}