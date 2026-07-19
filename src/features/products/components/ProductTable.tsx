"use client";

import { Package } from "lucide-react";

import { Product } from "../types";
import { ProductActions } from "./ProductActions";
import { ProductMobileCard } from "./ProductMobileCard";

function getStockStatus(stock: number) {
  if (stock === 0) {
    return {
      label: "Habis",
      className: "bg-red-100 text-red-700",
    };
  }

  if (stock <= 10) {
    return {
      label: "Menipis",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: "Normal",
    className: "bg-green-100 text-green-700",
  };
}

type Props = {
  products: Product[];
  loading: boolean;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;
};

export function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      {/* ================= MOBILE ================= */}

      <div
  className="
    space-y-4
    pb-40
    lg:hidden
  "
>

        {loading ? (
          <div className="rounded-2xl bg-white py-12 text-center shadow">
            Memuat data...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-white py-12 text-center text-slate-400 shadow">
            Produk tidak ditemukan.
          </div>
        ) : (
          products.map((product) => (
            <ProductMobileCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow lg:block">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Produk
              </th>

              <th className="px-6 py-4 text-left">
                SKU
              </th>

              <th className="px-6 py-4 text-left">
                Kategori
              </th>

              <th className="px-6 py-4 text-right">
                Harga
              </th>

              <th className="px-6 py-4 text-center">
                Stock
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center"
                >
                  Memuat data...
                </td>

              </tr>

            ) : products.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-400"
                >
                  Produk tidak ditemukan.
                </td>

              </tr>

            ) : (

              products.map((product) => {

                const status =
                  getStockStatus(product.stock);

                return (

                  <tr
                    key={product.id}
                    className="border-t transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-slate-100
                          "
                        >

                          <Package className="text-slate-500" />

                        </div>

                        <div>

                          <p className="font-semibold">
                            {product.name}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {product.sku}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className="
                          rounded-full
                          bg-blue-100
                          px-3
                          py-1
                          text-sm
                          font-medium
                          text-blue-700
                        "
                      >
                        {product.category_name ??
                          "Tanpa Kategori"}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-right font-semibold">

                      Rp{" "}
                      {product.price.toLocaleString(
                        "id-ID"
                      )}

                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className="
                          rounded-full
                          bg-slate-100
                          px-3
                          py-1
                          text-sm
                          font-semibold
                        "
                      >
                        {product.stock}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <ProductActions
                        onEdit={() =>
                          onEdit(product)
                        }
                        onDelete={() =>
                          onDelete(product)
                        }
                      />

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>
    </>
  );
}