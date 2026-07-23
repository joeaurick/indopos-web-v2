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
    <>
      {/* Desktop */}
      <div className="hidden justify-center gap-3 lg:flex">
        <button
          type="button"
          onClick={onEdit}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            bg-amber-50
            text-amber-600
            transition
            hover:bg-amber-100
          "
        >
          <Pencil size={18} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            bg-red-50
            text-red-600
            transition
            hover:bg-red-100
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        <button
          type="button"
          onClick={onEdit}
          className="
            flex items-center justify-center gap-2
            rounded-xl
            border
            border-amber-200
            bg-amber-50
            py-3
            font-medium
            text-amber-700
            transition
            active:scale-95
          "
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex items-center justify-center gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            py-3
            font-medium
            text-red-700
            transition
            active:scale-95
          "
        >
          <Trash2 size={18} />
          Hapus
        </button>
      </div>
    </>
  );
}