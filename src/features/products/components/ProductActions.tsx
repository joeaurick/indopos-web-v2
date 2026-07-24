"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function ProductActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-3">

      <button
        type="button"
        onClick={onEdit}
        className="
          flex-1
          inline-flex
          h-11
          items-center
          justify-center
          gap-2

          rounded-xl

          border
          border-amber-200

          bg-amber-50

          text-sm
          font-semibold
          text-amber-700

          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:border-amber-300
          hover:bg-amber-500
          hover:text-white
          hover:shadow-md

          active:scale-[0.98]
        "
      >
        <Pencil size={17} />

        <span>Edit</span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="
          flex-1
          inline-flex
          h-11
          items-center
          justify-center
          gap-2

          rounded-xl

          border
          border-red-200

          bg-red-50

          text-sm
          font-semibold
          text-red-700

          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:border-red-300
          hover:bg-red-500
          hover:text-white
          hover:shadow-md

          active:scale-[0.98]
        "
      >
        <Trash2 size={17} />

        <span>Hapus</span>
      </button>

    </div>
  );
}