import { AppLayout } from "@/components/layout/AppLayout";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

import { InventoryPage } from "@/features/inventory";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <InventoryPage
        businessId={businessId}
      />
    </AppLayout>
  );
}