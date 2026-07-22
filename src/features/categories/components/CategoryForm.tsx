"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { Category } from "../types";
import { useCategoryStore } from "../store/category.store";

type Props = {
  businessId: string;
  mode: "create" | "edit";
  category?: Category | null;
  onSuccess?: () => void;
};

export function CategoryForm({
  businessId,
  mode,
  category,
  onSuccess,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const loading = useCategoryStore(
    (state) => state.loading
  );

  const createCategory =
    useCategoryStore(
      (state) => state.createCategory
    );

  const updateCategory =
    useCategoryStore(
      (state) => state.updateCategory
    );

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  useEffect(() => {
    if (mode === "edit" && category) {
      setName(category.name);

      setDescription(
        category.description ?? ""
      );
    } else {
      setName("");

      setDescription("");
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [mode, category]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const categoryName =
      name.trim();

    const categoryDescription =
      description.trim();

    if (!categoryName) {
      notify.warning(
        "Nama kategori wajib diisi."
      );

      inputRef.current?.focus();

      return;
    }

    const loadingToast =
      notify.loading(
        mode === "create"
          ? "Menyimpan kategori..."
          : "Memperbarui kategori..."
      );

    try {
      if (mode === "create") {
        await createCategory(
  businessId,
  {
    name: categoryName,
    description: categoryDescription || null,
  }
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Kategori berhasil ditambahkan."
        );

        setName("");

        setDescription("");
      } else {
        if (!category) {
          throw new Error(
            "Kategori tidak ditemukan."
          );
        }

        await updateCategory(
  businessId,
  category.id,
  {
    name: categoryName,
    description: categoryDescription || null,
  }
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Kategori berhasil diperbarui."
        );
      }

      onSuccess?.();
    } catch (error: any) {
      console.error(error);

      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Terjadi kesalahan."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nama Kategori
        </label>

        <input
          ref={inputRef}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Contoh: Coffee"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-teal-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Deskripsi
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Deskripsi kategori..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-teal-500
          "
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-teal-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-teal-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? mode === "create"
              ? "Menyimpan..."
              : "Memperbarui..."
            : mode === "create"
            ? "Simpan Kategori"
            : "Update Kategori"}
        </button>
      </div>
    </form>
  );
}