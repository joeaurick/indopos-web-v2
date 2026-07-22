import { redirect } from "next/navigation";

import { AppLayout } from "@/components/layout/AppLayout";

import { CashInPage } from "@/features/cash-in";

import { createClient } from "@/lib/supabase/server";
import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const businessId =
    await getCurrentBusinessId();

  if (!businessId) {
    redirect("/login");
  }

  return (
    <AppLayout>
      <CashInPage
        businessId={businessId}
      />
    </AppLayout>
  );
}