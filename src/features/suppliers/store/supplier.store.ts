import { create } from "zustand";

import {
  Supplier,
  SupplierPayload,
} from "../types";

import { supplierService } from "../services/supplier.service";

type SupplierState = {
  suppliers: Supplier[];

  loading: boolean;

  fetchSuppliers: (
    businessId: string
  ) => Promise<void>;

  createSupplier: (
    businessId: string,
    payload: SupplierPayload
  ) => Promise<void>;

  updateSupplier: (
    businessId: string,
    id: string,
    payload: SupplierPayload
  ) => Promise<void>;

  deleteSupplier: (
    businessId: string,
    id: string
  ) => Promise<void>;
};

export const useSupplierStore =
create<SupplierState>((set, get) => ({

  suppliers: [],

  loading: false,

  fetchSuppliers: async (
    businessId
  ) => {

    set({
      loading: true,
    });

    try {

      const suppliers =
        await supplierService.getSuppliers(
          businessId
        );

      set({
        suppliers,
        loading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        loading: false,
      });

    }

  },

  createSupplier: async (
    businessId,
    payload
  ) => {

    set({
      loading: true,
    });

    try {

      await supplierService.createSupplier(
        businessId,
        payload
      );

      await get().fetchSuppliers(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

  updateSupplier: async (
    businessId,
    id,
    payload
  ) => {

    set({
      loading: true,
    });

    try {

      await supplierService.updateSupplier(
        businessId,
        id,
        payload
      );

      await get().fetchSuppliers(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

  deleteSupplier: async (
    businessId,
    id
  ) => {

    set({
      loading: true,
    });

    try {

      await supplierService.deleteSupplier(
        businessId,
        id
      );

      await get().fetchSuppliers(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

}));