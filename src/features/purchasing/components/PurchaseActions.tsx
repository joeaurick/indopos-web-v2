"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function PurchaseActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
      "
    >
      <button
        type="button"
        onClick={onEdit}
        title="Edit Pembelian"
        className="
          group
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          border
          border-amber-200

          bg-amber-50
          text-amber-600

          shadow-sm

          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:border-amber-300
          hover:bg-amber-500
          hover:text-white
          hover:shadow-md

          focus:outline-none
          focus:ring-2
          focus:ring-amber-300
        "
      >
        <Pencil
          size={17}
          className="
            transition-transform
            duration-200
            group-hover:scale-110
          "
        />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Hapus Pembelian"
        className="
          group
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          border
          border-red-200

          bg-red-50
          text-red-600

          shadow-sm

          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:border-red-300
          hover:bg-red-500
          hover:text-white
          hover:shadow-md

          focus:outline-none
          focus:ring-2
          focus:ring-red-300
        "
      >
        <Trash2
          size={17}
          className="
            transition-transform
            duration-200
            group-hover:scale-110
          "
        />
      </button>
    </div>
  );
}