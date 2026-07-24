"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Package,
  Boxes,
  Save,
  X,
} from "lucide-react";

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

const inputClass = `
h-12
w-full
rounded-xl
border
border-slate-200
bg-white
px-4

text-sm
text-slate-700

outline-none

transition-all
duration-200

placeholder:text-slate-400

focus:border-emerald-500
focus:ring-4
focus:ring-emerald-100
`;

export function ProductForm({
  businessId,
  mode,
  product,
  onSuccess,
}: Props) {
  const loading = useProductStore(
    (state) => state.loading
  );

  const createProduct = useProductStore(
    (state) => state.createProduct
  );

  const updateProduct = useProductStore(
    (state) => state.updateProduct
  );

  const categories = useCategoryStore(
    (state) => state.categories
  );

  const fetchCategories =
    useCategoryStore(
      (state) => state.fetchCategories
    );

  const [name, setName] =
    useState("");

  const [sku, setSku] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [
    categoryId,
    setCategoryId,
  ] = useState("");

  useEffect(() => {
    if (!businessId) return;

    fetchCategories(
      businessId
    );
  }, [
    businessId,
    fetchCategories,
  ]);

  useEffect(() => {
    if (
      mode === "edit" &&
      product
    ) {
      setName(product.name);
      setSku(product.sku);
      setPrice(
        product.price.toString()
      );
      setStock(
        product.stock.toString()
      );
      setCategoryId(
        product.category_id ?? ""
      );
      return;
    }

    setName("");
    setSku("");
    setPrice("");
    setStock("");
    setCategoryId("");
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
      className="space-y-6"
    >
      {/* Header */}

      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-500
            to-teal-600
            text-white
            shadow-lg
          "
        >
          <Package size={24} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {mode === "create"
              ? "Tambah Produk"
              : "Edit Produk"}
          </h2>

          <p className="text-sm text-slate-500">
            Lengkapi informasi produk di bawah ini.
          </p>
        </div>
      </div>

      {/* Informasi Produk */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
            <Boxes size={18} />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Informasi Produk
            </h3>

            <p className="text-sm text-slate-500">
              Data utama produk.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nama Produk
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Contoh : Indomie Goreng"
              className={inputClass}
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              SKU
            </label>

            <input
              value={sku}
              onChange={(e) =>
                setSku(e.target.value)
              }
              placeholder="Contoh : SKU-001"
              className={inputClass}
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Kategori
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value
                )
              }
              className={inputClass}
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

        </div>

      </div>

      {/* Harga */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 className="mb-5 font-semibold text-slate-900">
          Harga & Persediaan
        </h3>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Harga
            </label>

            <CurrencyInput
              value={price}
              onChange={setPrice}
              placeholder="0"
              className={inputClass}
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
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
              placeholder="0"
              className={inputClass}
            />

          </div>

        </div>

      </div>

      {/* Footer */}

      <div
  className="
    sticky
    bottom-0
    z-20

    -mx-6
    mt-6

    flex
    items-center
    justify-end
    gap-3

    border-t
    border-slate-200

    bg-white

    px-6
    py-5
  "
>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            border
            border-slate-300

            px-5
            py-3

            font-medium

            text-slate-600

            transition-all

            hover:bg-slate-100
          "
        >
          <X size={18} />

          Batal

        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            bg-gradient-to-r
            from-emerald-600
            to-teal-600

            px-6
            py-3

            font-semibold
            text-white

            shadow-lg
            shadow-emerald-200

            transition-all

            hover:-translate-y-0.5
            hover:shadow-xl

            disabled:opacity-50
          "
        >
          <Save size={18} />

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