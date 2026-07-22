import { AppLayout } from "@/components/layout/AppLayout";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

import { CashOutPage } from "@/features/cash-out";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <CashOutPage
        businessId={businessId}
      />
    </AppLayout>
  );
}