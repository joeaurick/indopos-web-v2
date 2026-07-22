import { AppLayout } from "@/components/layout/AppLayout";

import { StockCardPage } from "@/features/stock-card";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <StockCardPage
        businessId={businessId}
      />
    </AppLayout>
  );
}