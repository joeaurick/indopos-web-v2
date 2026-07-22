import { AppLayout } from "@/components/layout/AppLayout";

import { PosPage } from "@/features/pos/pages/PosPage";

import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const businessId =
    await getCurrentBusinessId();

  return (
    <AppLayout>
      <PosPage
        businessId={businessId}
      />
    </AppLayout>
  );
}