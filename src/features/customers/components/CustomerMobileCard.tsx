"use client";

import {
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { Customer } from "../types";
import { CustomerActions } from "./CustomerActions";

type Props = {
  customer: Customer;

  onEdit: (customer: Customer) => void;

  onDelete: (customer: Customer) => void;
};

export function CustomerMobileCard({
  customer,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--border)]
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="flex gap-4">

        {/* Avatar */}

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
          "
        >
          <User className="text-slate-500" />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-base font-bold">
            {customer.name}
          </h3>

          <div className="mt-4 space-y-2 text-sm">

            <div className="flex items-center gap-2 text-slate-600">
              <Phone size={15} />
              <span className="truncate">
                {customer.phone || "-"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Mail size={15} />
              <span className="truncate">
                {customer.email || "-"}
              </span>
            </div>

            <div className="flex items-start gap-2 text-slate-600">
              <MapPin
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span className="line-clamp-2">
                {customer.address || "-"}
              </span>
            </div>

          </div>

          <div className="mt-5">

            <CustomerActions
              onEdit={() => onEdit(customer)}
              onDelete={() => onDelete(customer)}
            />

          </div>

        </div>

      </div>
    </div>
  );
}