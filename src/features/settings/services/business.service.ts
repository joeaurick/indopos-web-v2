import { getSupabaseClient } from "@/services/supabase/client";
import { Business } from "../types";

const supabase = getSupabaseClient();

async function getCurrentBusinessId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data.business_id as string;
}

export const businessService = {
  async getBusiness(): Promise<Business | null> {
    const businessId = await getCurrentBusinessId();

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", businessId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async saveBusiness(
    business: Partial<Business>
  ): Promise<void> {
    const businessId = await getCurrentBusinessId();

    const payload = {
      name: business.name ?? "",
      business_type:
        business.business_type ?? "",
      email: business.email ?? "",
      phone: business.phone ?? "",
      address: business.address ?? "",
      website: business.website ?? "",
      tax_number:
        business.tax_number ?? "",
      receipt_footer:
        business.receipt_footer ??
        "Terima kasih telah berbelanja.",
      logo_url:
        business.logo_url ?? "",
      updated_at:
        new Date().toISOString(),
    };

    const { error } = await supabase
      .from("businesses")
      .update(payload)
      .eq("id", businessId);

    if (error) {
      throw error;
    }
  },

  async deleteLogo(): Promise<void> {
    const businessId =
      await getCurrentBusinessId();

    const { data: business, error } =
      await supabase
        .from("businesses")
        .select("logo_url")
        .eq("id", businessId)
        .single();

    if (error) {
      throw error;
    }

    if (business.logo_url) {
      const path =
        business.logo_url.split(
          "/logos/"
        )[1];

      if (path) {
        await supabase.storage
          .from("logos")
          .remove([path]);
      }
    }

    const { error: updateError } =
      await supabase
        .from("businesses")
        .update({
          logo_url: "",
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", businessId);

    if (updateError) {
      throw updateError;
    }
  },
};