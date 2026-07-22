import { create } from "zustand";

type AuthState = {
  businessId: string | null;

  setBusinessId: (id: string | null) => void;
};

export const useAuthStore =
  create<AuthState>((set) => ({
    businessId: null,

    setBusinessId: (id) =>
      set({
        businessId: id,
      }),
  }));