"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function CustomerActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">

      <button
        onClick={onEdit}
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

          transition-all

          hover:bg-amber-500
          hover:text-white
        "
      >
        <Pencil
          size={17}
          className="group-hover:scale-110 transition"
        />
      </button>

      <button
        onClick={onDelete}
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

          transition-all

          hover:bg-red-500
          hover:text-white
        "
      >
        <Trash2
          size={17}
          className="group-hover:scale-110 transition"
        />
      </button>

    </div>
  );
}