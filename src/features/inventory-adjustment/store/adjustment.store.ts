import { create } from "zustand";

import {
  Adjustment,
  AdjustmentPayload,
} from "../types";

import { adjustmentService } from "../services/adjustment.service";

type AdjustmentState = {
  adjustments: Adjustment[];

  loading: boolean;

  fetchAdjustments: (
    businessId: string
  ) => Promise<void>;

  createAdjustment: (
    businessId: string,
    payload: AdjustmentPayload
  ) => Promise<void>;
};

export const useAdjustmentStore =
  create<AdjustmentState>(
    (set, get) => ({
      adjustments: [],

      loading: false,

      fetchAdjustments:
        async (
          businessId: string
        ) => {
          set({
            loading: true,
          });

          try {
            const adjustments =
              await adjustmentService.getAdjustments(
                businessId
              );

            set({
              adjustments,
            });
          } finally {
            set({
              loading: false,
            });
          }
        },

      createAdjustment:
        async (
          businessId: string,
          payload
        ) => {
          set({
            loading: true,
          });

          try {
            await adjustmentService.createAdjustment(
              businessId,
              payload
            );

            await get().fetchAdjustments(
              businessId
            );
          } finally {
            set({
              loading: false,
            });
          }
        },
    })
  );