"use client";

import { Building2 } from "lucide-react";

import {
  AppTable,
  AppTableBody,
  AppTableCell,
  AppTableHead,
  AppTableHeader,
  AppTableRow,
} from "@/components/ui";

import { Supplier } from "../types";
import { SupplierActions } from "./SupplierActions";
import { SupplierMobileCard } from "./SupplierMobileCard";

type Props = {
  suppliers: Supplier[];
  loading: boolean;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
};

export function SupplierTable({
  suppliers,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      {/* Desktop */}

      <div className="hidden lg:block">

        <AppTable>

          <AppTableHead>

            <AppTableRow>

              <AppTableHeader>
                Supplier
              </AppTableHeader>

              <AppTableHeader>
                Contact
              </AppTableHeader>

              <AppTableHeader>
                Phone
              </AppTableHeader>

              <AppTableHeader>
                Email
              </AppTableHeader>

              <AppTableHeader>
                Address
              </AppTableHeader>

              <AppTableHeader className="text-center">
                Action
              </AppTableHeader>

            </AppTableRow>

          </AppTableHead>

          <AppTableBody>

            {loading ? (

              <AppTableRow>

                <AppTableCell
                  colSpan={6}
                  className="py-16 text-center"
                >
                  Memuat data...
                </AppTableCell>

              </AppTableRow>

            ) : suppliers.length === 0 ? (

              <AppTableRow>

                <AppTableCell
                  colSpan={6}
                  className="py-16 text-center text-slate-400"
                >
                  Supplier tidak ditemukan.
                </AppTableCell>

              </AppTableRow>

            ) : (

              suppliers.map((supplier) => (

                <AppTableRow key={supplier.id}>

                  <AppTableCell>

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-slate-100
                        "
                      >
                        <Building2
                          size={20}
                          className="text-slate-500"
                        />
                      </div>

                      <div>

                        <div className="font-semibold">
                          {supplier.name}
                        </div>

                      </div>

                    </div>

                  </AppTableCell>

                  <AppTableCell>
                    {supplier.contact_person}
                  </AppTableCell>

                  <AppTableCell>
                    {supplier.phone}
                  </AppTableCell>

                  <AppTableCell>
                    {supplier.email || "-"}
                  </AppTableCell>

                  <AppTableCell className="max-w-xs truncate">
                    {supplier.address || "-"}
                  </AppTableCell>

                  <AppTableCell>

                    <SupplierActions
                      onEdit={() => onEdit(supplier)}
                      onDelete={() => onDelete(supplier)}
                    />

                  </AppTableCell>

                </AppTableRow>

              ))

            )}

          </AppTableBody>

        </AppTable>

      </div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">

        {loading ? (

          <div className="rounded-2xl bg-white p-8 text-center">
            Memuat data...
          </div>

        ) : suppliers.length === 0 ? (

          <div className="rounded-2xl bg-white p-8 text-center text-slate-400">
            Supplier tidak ditemukan.
          </div>

        ) : (

          suppliers.map((supplier) => (

            <SupplierMobileCard
              key={supplier.id}
              supplier={supplier}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))

        )}

      </div>

    </>
  );
}