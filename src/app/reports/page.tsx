import { AppLayout } from "@/components/layout/AppLayout";

import { ReportsPage } from "@/features/reports/pages/ReportsPage";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <ReportsPage
        businessId={businessId}
      />
    </AppLayout>
  );
}