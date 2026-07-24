"use client";

import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { Supplier } from "../types";
import { SupplierActions } from "./SupplierActions";

type Props = {
  supplier: Supplier;

  onEdit: (supplier: Supplier) => void;

  onDelete: (supplier: Supplier) => void;
};

export function SupplierMobileCard({
  supplier,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
          "
        >
          <Building2
            size={24}
            className="text-slate-600"
          />
        </div>

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-base font-bold text-slate-900">
            {supplier.name}
          </h3>

          <p className="text-sm text-slate-500">
            Supplier
          </p>

        </div>

      </div>

      {/* Body */}

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-3">

          <User
            size={18}
            className="text-slate-400"
          />

          <span className="text-sm text-slate-700">
            {supplier.contact_person}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Phone
            size={18}
            className="text-slate-400"
          />

          <span className="text-sm text-slate-700">
            {supplier.phone}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Mail
            size={18}
            className="text-slate-400"
          />

          <span className="truncate text-sm text-slate-700">
            {supplier.email || "-"}
          </span>

        </div>

        <div className="flex items-start gap-3">

          <MapPin
            size={18}
            className="mt-0.5 text-slate-400"
          />

          <span className="text-sm text-slate-700">
            {supplier.address || "-"}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 border-t border-slate-200 pt-5">

        <SupplierActions
          onEdit={() => onEdit(supplier)}
          onDelete={() => onDelete(supplier)}
        />

      </div>

    </div>
  );
}