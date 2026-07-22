import { AppLayout } from "@/components/layout/AppLayout";

import { FinancePage } from "@/features/finance";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <FinancePage
        businessId={businessId}
      />
    </AppLayout>
  );
}