import { create } from "zustand";

import {
  PurchaseOrder,
  PurchaseOrderPayload,
} from "../types";

import { purchaseService } from "../services/purchase.service";

type PurchaseState = {
  purchases: PurchaseOrder[];

  loading: boolean;

  fetchPurchases: (
    businessId: string
  ) => Promise<void>;

  createPurchase: (
    businessId: string,
    payload: PurchaseOrderPayload
  ) => Promise<void>;

  deletePurchase: (
    businessId: string,
    id: string
  ) => Promise<void>;

  receivePurchase: (
    businessId: string,
    id: string
  ) => Promise<void>;
};

export const usePurchaseStore =
  create<PurchaseState>((set, get) => ({
    purchases: [],

    loading: false,

    fetchPurchases: async (
      businessId
    ) => {
      set({
        loading: true,
      });

      try {
        const purchases =
          await purchaseService.getPurchases(
            businessId
          );

        set({
          purchases,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    createPurchase: async (
      businessId,
      payload
    ) => {
      set({
        loading: true,
      });

      try {
        await purchaseService.createPurchase(
          businessId,
          payload
        );

        await get().fetchPurchases(
          businessId
        );
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    deletePurchase: async (
      businessId,
      id
    ) => {
      set({
        loading: true,
      });

      try {
        await purchaseService.deletePurchase(
          businessId,
          id
        );

        await get().fetchPurchases(
          businessId
        );
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    receivePurchase: async (
      businessId,
      id
    ) => {
      set({
        loading: true,
      });

      try {
        await purchaseService.receivePurchase(
          businessId,
          id
        );

        await get().fetchPurchases(
          businessId
        );
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },
  }));