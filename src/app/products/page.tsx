import { AppLayout } from "@/components/layout/AppLayout";
import { ProductsPage } from "@/features/products";
import { getCurrentBusinessId } from "@/lib/business/get-current-business";

export default async function Page() {
  const businessId = await getCurrentBusinessId();

  return (
    <AppLayout>
      <ProductsPage businessId={businessId} />
    </AppLayout>
  );
}