import { AppLayout } from "@/components/layout/AppLayout";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

import { SalesPage } from "@/features/sales";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <SalesPage
        businessId={businessId}
      />
    </AppLayout>
  );
}