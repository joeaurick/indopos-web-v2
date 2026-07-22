import { create } from "zustand";

import { Product } from "../types";
import { productService } from "../services/product.service";

type ProductInput = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  category_id: string | null;
};

type ProductState = {
  products: Product[];
  loading: boolean;

  search: string;
  selectedCategory: string | null;

  fetchProducts: (
    businessId: string
  ) => Promise<void>;

  createProduct: (
    businessId: string,
    data: ProductInput
  ) => Promise<void>;

  updateProduct: (
    businessId: string,
    id: string,
    data: ProductInput
  ) => Promise<void>;

  deleteProduct: (
    businessId: string,
    id: string
  ) => Promise<void>;

  setSearch: (
    value: string
  ) => void;

  setSelectedCategory: (
    id: string | null
  ) => void;
};

export const useProductStore =
  create<ProductState>((set, get) => ({
    products: [],

    loading: false,

    search: "",

    selectedCategory: null,

    setSearch: (value) => {
      set({
        search: value,
      });
    },

    setSelectedCategory: (id) => {
      set({
        selectedCategory: id,
      });
    },

    fetchProducts: async (
      businessId
    ) => {
      set({
        loading: true,
      });

      try {
        const products =
          await productService.getProducts(
            businessId
          );

        set({
          products,
          loading: false,
        });
      } catch (error) {
        console.error(error);

        set({
          loading: false,
        });
      }
    },

    createProduct: async (
      businessId,
      data
    ) => {
      set({
        loading: true,
      });

      try {
        await productService.createProduct(
          businessId,
          data
        );

        await get().fetchProducts(
          businessId
        );
      } finally {
        set({
          loading: false,
        });
      }
    },

    updateProduct: async (
      businessId,
      id,
      data
    ) => {
      set({
        loading: true,
      });

      try {
        await productService.updateProduct(
          businessId,
          id,
          data
        );

        await get().fetchProducts(
          businessId
        );
      } finally {
        set({
          loading: false,
        });
      }
    },

    deleteProduct: async (
      businessId,
      id
    ) => {
      set({
        loading: true,
      });

      try {
        await productService.deleteProduct(
          businessId,
          id
        );

        await get().fetchProducts(
          businessId
        );
      } finally {
        set({
          loading: false,
        });
      }
    },
  }));