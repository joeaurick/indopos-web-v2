import { useBusinessStore } from "@/features/settings/store/business-store";

export function useBusinessId() {
  return useBusinessStore(
    (state) => state.business?.id
  );
}