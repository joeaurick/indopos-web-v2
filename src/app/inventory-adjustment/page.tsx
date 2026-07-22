import { AppLayout } from "@/components/layout/AppLayout";

import { InventoryAdjustmentPage } from "@/features/inventory-adjustment";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <InventoryAdjustmentPage
        businessId={businessId}
      />
    </AppLayout>
  );
}