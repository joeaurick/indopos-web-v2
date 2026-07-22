"use client";

import { Category } from "../types";
import { CategoryActions } from "./CategoryActions";

type Props = {
  categories: Category[];
  loading: boolean;

  onEdit: (category: Category) => void;

  onDelete: (category: Category) => void;
};

export function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Nama
            </th>

            <th className="px-6 py-4 text-left">
              Deskripsi
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
                colSpan={3}
                className="py-12 text-center"
              >
                Memuat data...
              </td>

            </tr>

          ) : categories.length === 0 ? (

            <tr>

              <td
                colSpan={3}
                className="py-12 text-center text-slate-400"
              >
                Belum ada kategori.
              </td>

            </tr>

          ) : (

            categories.map((category) => (

              <tr
                key={category.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-semibold">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {category.description ?? "-"}
                </td>

                <td className="px-6 py-4">

                  <CategoryActions
                    onEdit={() => onEdit(category)}
                    onDelete={() => onDelete(category)}
                  />

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}