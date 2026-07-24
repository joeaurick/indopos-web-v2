"use client";

import { Package } from "lucide-react";

import { Product } from "../types";
import { ProductActions } from "./ProductActions";
import { ProductMobileCard } from "./ProductMobileCard";

import {
  AppTable,
  AppTableHead,
  AppTableRow,
  AppTableCell,
} from "@/components/ui";

function getStockStatus(stock: number) {
  if (stock === 0) {
    return {
      label: "Habis",
      className:
        "bg-red-100 text-red-700 border border-red-200",
    };
  }

  if (stock <= 10) {
    return {
      label: "Menipis",
      className:
        "bg-amber-100 text-amber-700 border border-amber-200",
    };
  }

  return {
    label: "Normal",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
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

      <div className="space-y-4 pb-40 lg:hidden">

        {loading ? (
          <div className="rounded-3xl bg-white py-12 text-center shadow-sm">
            Memuat data...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl bg-white py-12 text-center text-slate-400 shadow-sm">
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

      <div
        className="
          hidden
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          lg:block
        "
      >

        <AppTable>

          <AppTableHead
            className="
              bg-gradient-to-b
              from-slate-50
              to-white
            "
          >

            <tr>

              <th className="w-[40%] px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Produk
              </th>

              <th className="w-[18%] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Kategori
              </th>

              <th className="w-[15%] px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Harga
              </th>

              <th className="w-[10%] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Stock
              </th>

              <th className="w-[10%] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="w-[7%] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Aksi
              </th>

            </tr>

          </AppTableHead>

          <tbody>

            {loading ? (

              <AppTableRow>

                <AppTableCell colSpan={6}>
                  Memuat data...
                </AppTableCell>

              </AppTableRow>

            ) : products.length === 0 ? (

              <AppTableRow>

                <AppTableCell colSpan={6}>
                  Produk tidak ditemukan.
                </AppTableCell>

              </AppTableRow>

            ) : (

              products.map((product) => {

                const status =
                  getStockStatus(product.stock);

                return (

                  <AppTableRow
                    key={product.id}
                    className="
                      h-[76px]
                      transition-all
                      duration-200
                      hover:bg-slate-50
                    "
                  >

                    {/* Produk */}

                    <AppTableCell className="px-6">

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-slate-100
                            to-slate-200
                          "
                        >

                          <Package
                            size={22}
                            className="text-slate-600"
                          />

                        </div>

                        <div>

                          <h4 className="font-semibold text-slate-800">
                            {product.name}
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            SKU : {product.sku}
                          </p>

                        </div>

                      </div>

                    </AppTableCell>

                    {/* Kategori */}

                    <AppTableCell>

                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          bg-[var(--primary)]/10
                          px-3.5
                          py-1.5
                          text-xs
                          font-semibold
                          text-[var(--primary)]
                        "
                      >
                        {product.category_name ??
                          "Tanpa Kategori"}
                      </span>

                    </AppTableCell>

                    {/* Harga */}

                    <AppTableCell className="text-right">

                      <span className="font-semibold text-slate-800">
                        Rp{" "}
                        {product.price.toLocaleString("id-ID")}
                      </span>

                    </AppTableCell>

                    {/* Stock */}

                    <AppTableCell className="text-center">

                      <span
                        className="
                          inline-flex
                          h-8
                          min-w-[56px]
                          items-center
                          justify-center
                          rounded-full
                          bg-slate-100
                          px-3
                          text-sm
                          font-bold
                          text-slate-700
                        "
                      >
                        {product.stock}
                      </span>

                    </AppTableCell>

                    {/* Status */}

                    <AppTableCell className="text-center">

                      <span
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          rounded-full
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          ${status.className}
                        `}
                      >
                        {status.label}
                      </span>

                    </AppTableCell>

                    {/* Action */}

                    <AppTableCell>

                      <div className="flex justify-center">

                        <ProductActions
                          onEdit={() => onEdit(product)}
                          onDelete={() => onDelete(product)}
                        />

                      </div>

                    </AppTableCell>

                  </AppTableRow>

                );

              })

            )}

          </tbody>

        </AppTable>

      </div>
    </>
  );
}