import { create } from "zustand";

import { Category } from "../types";
import { categoryService } from "../services/category.service";

type CategoryPayload = {
  name: string;
  description: string | null;
};

type CategoryState = {
  categories: Category[];
  loading: boolean;

  fetchCategories: (
    businessId: string
  ) => Promise<void>;

  createCategory: (
    businessId: string,
    payload: CategoryPayload
  ) => Promise<void>;

  updateCategory: (
    businessId: string,
    id: string,
    payload: CategoryPayload
  ) => Promise<void>;

  deleteCategory: (
    businessId: string,
    id: string
  ) => Promise<void>;
};

export const useCategoryStore =
create<CategoryState>((set, get) => ({

  categories: [],

  loading: false,

  fetchCategories: async (
    businessId
  ) => {

    set({
      loading: true,
    });

    try {

      const categories =
        await categoryService.getCategories(
          businessId
        );

      set({
        categories,
        loading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        loading: false,
      });

    }

  },

  createCategory: async (
    businessId,
    payload
  ) => {

    set({
      loading: true,
    });

    try {

      const exists =
        get().categories.some(
          (category) =>
            category.name
              .trim()
              .toLowerCase() ===
            payload.name
              .trim()
              .toLowerCase()
        );

      if (exists) {
        throw new Error(
          "Nama kategori sudah digunakan."
        );
      }

      await categoryService.createCategory(
        businessId,
        payload
      );

      await get().fetchCategories(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

  updateCategory: async (
    businessId,
    id,
    payload
  ) => {

    set({
      loading: true,
    });

    try {

      const exists =
        get().categories.some(
          (category) =>
            category.id !== id &&
            category.name
              .trim()
              .toLowerCase() ===
            payload.name
              .trim()
              .toLowerCase()
        );

      if (exists) {
        throw new Error(
          "Nama kategori sudah digunakan."
        );
      }

      await categoryService.updateCategory(
        businessId,
        id,
        payload
      );

      await get().fetchCategories(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

  deleteCategory: async (
    businessId,
    id
  ) => {

    set({
      loading: true,
    });

    try {

      await categoryService.deleteCategory(
        businessId,
        id
      );

      await get().fetchCategories(
        businessId
      );

    } finally {

      set({
        loading: false,
      });

    }

  },

}));