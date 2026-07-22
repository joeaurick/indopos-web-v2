import { getSupabaseClient } from "@/services/supabase/client";
const supabase = getSupabaseClient();

export const storageService = {
  async uploadLogo(file: File) {
    const ext = file.name.split(".").pop();

    const fileName =
      `logo-${Date.now()}.${ext}`;

    const filePath =
      `business/${fileName}`;

    const { error } =
      await supabase.storage
        .from("logos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("logos")
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteLogo(url: string) {
    if (!url) return;

    const path =
      url.split("/logos/")[1];

    if (!path) return;

    await supabase.storage
      .from("logos")
      .remove([path]);
  },
};