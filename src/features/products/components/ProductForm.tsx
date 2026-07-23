"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { notify } from "@/lib/notify";

import { Product } from "../types";
import { useProductStore } from "../store/product.store";
import { useCategoryStore } from "@/features/categories/store/category.store";
import { CurrencyInput } from "@/components/ui/CurrencyInput";


type Props = {
  businessId: string;

  mode: "create" | "edit";

  product?: Product | null;

  onSuccess?: () => void;
};

export function ProductForm({
  businessId,
  mode,
  product,
  onSuccess,
}: Props) {
  const loading = useProductStore(
    (state) => state.loading
  );

  const createProduct =
    useProductStore(
      (state) => state.createProduct
    );

  const updateProduct =
    useProductStore(
      (state) => state.updateProduct
    );

  const categories =
    useCategoryStore(
      (state) => state.categories
    );

  const fetchCategories =
    useCategoryStore(
      (state) => state.fetchCategories
    );

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] =
    useState("");

  useEffect(() => {
  if (!businessId) return;

  fetchCategories(businessId);
}, [businessId, fetchCategories]);

  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.name);
      setSku(product.sku);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setCategoryId(
        product.category_id ?? ""
      );
    }

    if (mode === "create") {
      setName("");
      setSku("");
      setPrice("");
      setStock("");
      setCategoryId("");
    }
  }, [mode, product]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !name.trim() ||
      !sku.trim() ||
      !price ||
      !stock
    ) {
      notify.warning(
        "Semua field wajib diisi."
      );
      return;
    }

    const payload = {
      name: name.trim(),
      sku: sku.trim(),
      price: Number(price),
      stock: Number(stock),
      category_id:
        categoryId || null,
    };

    const loadingToast =
      notify.loading(
        mode === "create"
          ? "Menyimpan produk..."
          : "Memperbarui produk..."
      );

    try {
      if (mode === "create") {
        await createProduct(
  businessId,
  payload
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Produk berhasil ditambahkan."
        );

        setName("");
        setSku("");
        setPrice("");
        setStock("");
        setCategoryId("");
      } else {
        if (!product) {
          throw new Error(
            "Produk tidak ditemukan."
          );
        }

        await updateProduct(
  businessId,
  product.id,
  payload
);

        notify.dismiss(
          loadingToast
        );

        notify.success(
          "Produk berhasil diperbarui."
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
          Nama Produk
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          SKU
        </label>

        <input
          value={sku}
          onChange={(e) =>
            setSku(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Kategori
        </label>

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        >
          <option value="">
            Tanpa Kategori
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Harga
          </label>

          <CurrencyInput
  value={price}
  onChange={setPrice}
  placeholder="Masukkan harga"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
/>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {loading
            ? mode === "create"
              ? "Menyimpan..."
              : "Memperbarui..."
            : mode === "create"
            ? "Simpan Produk"
            : "Update Produk"}
        </button>
      </div>
    </form>
  );
}