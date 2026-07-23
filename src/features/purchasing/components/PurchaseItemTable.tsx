"use client";

import { Trash2 } from "lucide-react";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

import {
  PurchaseItem,
} from "../hooks/usePurchaseItems";

type Props = {
  items: PurchaseItem[];

  onQtyChange: (
    productId: string,
    qty: number
  ) => void;

  onPriceChange: (
    productId: string,
    price: number
  ) => void;

  onDelete: (
    productId: string
  ) => void;
};

export function PurchaseItemTable({
  items,
  onQtyChange,
  onPriceChange,
  onDelete,
}: Props) {
  return (
    <>
      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-xl border lg:block">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-left">
                Produk
              </th>

              <th className="p-3">
                Qty
              </th>

              <th className="p-3">
                Harga Modal
              </th>

              <th className="p-3">
                Subtotal
              </th>

              <th />

            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr
                key={item.product_id}
                className="border-t"
              >

                <td className="p-3">
                  {item.product_name}
                </td>

                <td className="p-3">

                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      onQtyChange(
                        item.product_id,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 rounded-lg border px-2 py-1"
                  />

                </td>

                <td className="p-3">

                  <CurrencyInput
                    value={String(item.cost_price)}
                    onChange={(value) =>
                      onPriceChange(
                        item.product_id,
                        Number(value)
                      )
                    }
                    className="w-36 rounded-lg border px-2 py-1"
                  />

                </td>

                <td className="p-3 font-semibold">

                  Rp{" "}
                  {item.subtotal.toLocaleString(
                    "id-ID"
                  )}

                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      onDelete(item.product_id)
                    }
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">

        {items.map((item) => (

          <div
            key={item.product_id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="font-semibold">
                  {item.product_name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">

                  Rp{" "}
                  {item.subtotal.toLocaleString(
                    "id-ID"
                  )}

                </p>

              </div>

              <button
                onClick={() =>
                  onDelete(item.product_id)
                }
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <div>

                <label className="mb-1 block text-xs text-slate-500">
                  Qty
                </label>

                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    onQtyChange(
                      item.product_id,
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border px-3 py-2"
                />

              </div>

              <div>

                <label className="mb-1 block text-xs text-slate-500">
                  Harga Modal
                </label>

                <CurrencyInput
                  value={String(item.cost_price)}
                  onChange={(value) =>
                    onPriceChange(
                      item.product_id,
                      Number(value)
                    )
                  }
                  className="w-full rounded-xl border px-3 py-2"
                />

              </div>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}