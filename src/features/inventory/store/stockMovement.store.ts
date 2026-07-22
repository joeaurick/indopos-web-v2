import { create } from "zustand";

import {
  StockMovement,
  StockMovementPayload,
} from "../types";

import { stockMovementService } from "../services/stockMovement.service";

type StockMovementState = {
  movements: StockMovement[];

  loading: boolean;

  fetchMovements: (
    businessId: string
  ) => Promise<void>;

  createMovement: (
    businessId: string,
    payload: StockMovementPayload
  ) => Promise<void>;
};

export const useStockMovementStore =
  create<StockMovementState>(
    (set, get) => ({
      movements: [],

      loading: false,

      fetchMovements:
        async (
          businessId
        ) => {
          set({
            loading: true,
          });

          try {
            const movements =
              await stockMovementService.getMovements(
                businessId
              );

            set({
              movements,
            });
          } finally {
            set({
              loading: false,
            });
          }
        },

      createMovement:
        async (
          businessId,
          payload
        ) => {
          await stockMovementService.createMovement(
            businessId,
            payload
          );

          await get().fetchMovements(
            businessId
          );
        },
    })
  );