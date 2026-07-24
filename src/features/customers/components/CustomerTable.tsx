"use client";

import {
  User,
} from "lucide-react";

import { Customer } from "../types";
import { CustomerActions } from "./CustomerActions";
import { CustomerMobileCard } from "./CustomerMobileCard";

type Props = {
  customers: Customer[];

  loading: boolean;

  onEdit: (
    customer: Customer
  ) => void;

  onDelete: (
    customer: Customer
  ) => void;
};

export function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <div className="hidden lg:block">
  <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Phone
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Address
            </th>

            <th className="px-6 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan={5}
                className="py-10 text-center"
              >
                Memuat data...
              </td>

            </tr>

          ) : customers.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="py-10 text-center text-slate-400"
              >
                Customer tidak ditemukan.
              </td>

            </tr>

          ) : (

            customers.map(
              (customer) => (

                <tr
                  key={customer.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">

                        <User className="text-slate-500" />

                      </div>

                      <div className="font-semibold">

                        {customer.name}

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {customer.phone}
                  </td>

                  <td className="px-6 py-4">
                    {customer.email}
                  </td>

                  <td className="px-6 py-4">
                    {customer.address}
                  </td>

                  <td className="px-6 py-4">

                    <CustomerActions
                      onEdit={() =>
                        onEdit(customer)
                      }
                      onDelete={() =>
                        onDelete(customer)
                      }
                    />

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

        </table>
</div>

      <div className="space-y-4 lg:hidden">

  {loading ? (

    <div className="rounded-2xl bg-white p-8 text-center">
      Memuat data...
    </div>

  ) : customers.length === 0 ? (

    <div className="rounded-2xl bg-white p-8 text-center text-slate-400">
      Customer tidak ditemukan.
    </div>

  ) : (

    customers.map((customer) => (
      <CustomerMobileCard
        key={customer.id}
        customer={customer}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))

  )}

</div>

    </div>
  );
}