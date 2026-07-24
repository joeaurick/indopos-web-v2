"use client";

import {
  Package,
  Boxes,
} from "lucide-react";

import { Product } from "../types";
import { ProductActions } from "./ProductActions";

function getStockStatus(stock: number) {
  if (stock === 0) {
    return {
      label: "Habis",
      className:
        "bg-red-100 text-red-700 border-red-200",
    };
  }

  if (stock <= 10) {
    return {
      label: "Menipis",
      className:
        "bg-amber-100 text-amber-700 border-amber-200",
    };
  }

  return {
    label: "Normal",
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
}

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductMobileCard({
  product,
  onEdit,
  onDelete,
}: Props) {
  const status = getStockStatus(product.stock);

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center gap-4 border-b border-slate-100 p-5">

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

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-lg font-bold text-slate-900">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            SKU • {product.sku}
          </p>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-5">

        <div className="flex flex-wrap gap-2">

          <span
            className="
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            {product.category_name ??
              "Tanpa Kategori"}
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
          >
            {status.label}
          </span>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div
            className="
              rounded-2xl
              bg-slate-50
              p-4
            "
          >
            <p className="text-xs text-slate-500">
              Harga
            </p>

            <h4 className="mt-2 text-lg font-bold text-emerald-600">
              Rp {product.price.toLocaleString("id-ID")}
            </h4>

          </div>

          <div
            className="
              rounded-2xl
              bg-slate-50
              p-4
            "
          >
            <div className="flex items-center gap-2">

              <Boxes
                size={16}
                className="text-slate-500"
              />

              <p className="text-xs text-slate-500">
                Stock
              </p>

            </div>

            <h4 className="mt-2 text-lg font-bold">
              {product.stock}
            </h4>

          </div>

        </div>

        <div className="border-t border-slate-100 pt-4">

          <ProductActions
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product)}
          />

        </div>

      </div>

    </div>
  );
}