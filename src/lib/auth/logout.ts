import { toast } from "sonner";

import { supabase } from "@/lib/supabase/client";

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout gagal");
      return;
    }

    toast.success("Berhasil logout");

    setTimeout(() => {
      window.location.replace("/login");
    }, 500);
  } catch (error) {
    console.error(error);
    toast.error("Terjadi kesalahan saat logout");
  }
}