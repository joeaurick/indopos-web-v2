"use client";

import { Pencil, Trash2 } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function CategoryActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex justify-center gap-2">

      <button
        onClick={onEdit}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-amber-100
          text-amber-600
          transition
          hover:bg-amber-200
        "
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={onDelete}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-red-100
          text-red-600
          transition
          hover:bg-red-200
        "
      >
        <Trash2 size={16} />
      </button>

    </div>
  );
}