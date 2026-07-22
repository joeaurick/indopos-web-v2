import { create } from "zustand";

import {
  Customer,
  CustomerPayload,
} from "../types";

import { customerService } from "../services/customer.service";

type CustomerState = {
  customers: Customer[];

  loading: boolean;

  fetchCustomers: (
    businessId: string
  ) => Promise<void>;

  createCustomer: (
    businessId: string,
    payload: CustomerPayload
  ) => Promise<void>;

  updateCustomer: (
    businessId: string,
    id: string,
    payload: CustomerPayload
  ) => Promise<void>;

  deleteCustomer: (
    businessId: string,
    id: string
  ) => Promise<void>;
};

export const useCustomerStore =
create<CustomerState>((set, get) => ({

  customers: [],

  loading: false,

  fetchCustomers: async (
    businessId
  ) => {

    set({
      loading: true,
    });

    try {

      const customers =
        await customerService.getCustomers(
          businessId
        );

      set({
        customers,
        loading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        loading: false,
      });

    }

  },

  createCustomer: async (
    businessId,
    payload
  ) => {

    set({
      loading: true,
    });

    try {

      await customerService.createCustomer(
        businessId,
        payload
      );

      await get().fetchCustomers(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

  updateCustomer: async (
    businessId,
    id,
    payload
  ) => {

    set({
      loading: true,
    });

    try {

      await customerService.updateCustomer(
        businessId,
        id,
        payload
      );

      await get().fetchCustomers(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

  deleteCustomer: async (
    businessId,
    id
  ) => {

    set({
      loading: true,
    });

    try {

      await customerService.deleteCustomer(
        businessId,
        id
      );

      await get().fetchCustomers(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

}));