import { create } from "zustand";

import { salesService } from "../services/sales.service";
import { SaleItem } from "../types";

type SaleDetailState = {
  open: boolean;

  loading: boolean;

  saleId: string;

  invoice: string;

  createdAt: string;

  total: number;

  paymentAmount: number;

  changeAmount: number;

  items: SaleItem[];

  openDetail: (
    businessId: string,
    saleId: string,
    invoice: string,
    createdAt: string,
    total: number,
    paymentAmount: number,
    changeAmount: number
  ) => Promise<void>;

  closeDetail: () => void;

  refreshDetail: (
    businessId: string
  ) => Promise<void>;
};

export const useSaleDetailStore =
  create<SaleDetailState>((set, get) => ({
    open: false,

    loading: false,

    saleId: "",

    invoice: "",

    createdAt: "",

    total: 0,

    paymentAmount: 0,

    changeAmount: 0,

    items: [],

    openDetail: async (
      businessId,
      saleId,
      invoice,
      createdAt,
      total,
      paymentAmount,
      changeAmount
    ) => {
      set({
        loading: true,
      });

      try {
        const items =
          await salesService.getSaleDetail(
            businessId,
            saleId
          );

        set({
          saleId,
          invoice,
          createdAt,
          total,
          paymentAmount,
          changeAmount,
          items,
          open: true,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({
          loading: false,
        });
      }
    },

    refreshDetail: async (
      businessId
    ) => {
      const {
        saleId,
        invoice,
        createdAt,
        total,
        paymentAmount,
        changeAmount,
      } = get();

      if (!saleId) return;

      await get().openDetail(
        businessId,
        saleId,
        invoice,
        createdAt,
        total,
        paymentAmount,
        changeAmount
      );
    },

    closeDetail: () =>
      set({
        open: false,

        loading: false,

        saleId: "",

        invoice: "",

        createdAt: "",

        total: 0,

        paymentAmount: 0,

        changeAmount: 0,

        items: [],
      }),
  }));