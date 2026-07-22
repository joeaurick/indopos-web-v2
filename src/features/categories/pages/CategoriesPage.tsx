"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { notify } from "@/lib/notify";

import { Category } from "../types";
import { useCategoryStore } from "../store/category.store";

import { CategoryToolbar } from "../components/CategoryToolbar";
import { CategoryTable } from "../components/CategoryTable";
import { CategoryDialog } from "../components/CategoryDialog";
import { CategoryForm } from "../components/CategoryForm";

type Props = {
  businessId: string;
};

export function CategoriesPage({
  businessId,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [
    openCreateDialog,
    setOpenCreateDialog,
  ] = useState(false);

  const [
    openEditDialog,
    setOpenEditDialog,
  ] = useState(false);

  const [
    openDeleteDialog,
    setOpenDeleteDialog,
  ] = useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<Category | null>(null);

  const loading = useCategoryStore(
    (state) => state.loading
  );

  const categories =
    useCategoryStore(
      (state) => state.categories
    );

  const fetchCategories =
    useCategoryStore(
      (state) => state.fetchCategories
    );

  const deleteCategory =
    useCategoryStore(
      (state) => state.deleteCategory
    );

  useEffect(() => {
  fetchCategories(businessId);
}, [businessId, fetchCategories]);

  const filteredCategories =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return categories.filter(
        (category) => {
          return (
            keyword === "" ||
            category.name
              .toLowerCase()
              .includes(keyword) ||
            (category.description ??
              "")
              .toLowerCase()
              .includes(keyword)
          );
        }
      );
    }, [
      categories,
      search,
    ]);

  function handleEdit(
    category: Category
  ) {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  }

  function handleDelete(
    category: Category
  ) {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!selectedCategory) return;

    const loadingToast =
      notify.loading(
        "Mengarsipkan kategori..."
      );

    try {
      await deleteCategory(
  businessId,
  selectedCategory.id
);

      notify.dismiss(
        loadingToast
      );

      notify.success(
        "Kategori berhasil diarsipkan."
      );

      setOpenDeleteDialog(false);
      setSelectedCategory(null);
    } catch (error: any) {
      console.error(error);

      notify.dismiss(
        loadingToast
      );

      notify.error(
        error?.message ??
          "Gagal mengarsipkan kategori."
      );
    }
  }

  return (
    <>
      <div className="space-y-6">

        <CategoryToolbar
          search={search}
          onSearch={setSearch}
          onAdd={() =>
            setOpenCreateDialog(true)
          }
        />

        <CategoryTable
          categories={
            filteredCategories
          }
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>

      <CategoryDialog
        open={openCreateDialog}
        title="Tambah Kategori"
        onClose={() =>
          setOpenCreateDialog(false)
        }
      >
        <CategoryForm
  businessId={businessId}
  mode="create"
  onSuccess={() =>
    setOpenCreateDialog(false)
  }
/>
      </CategoryDialog>

      <CategoryDialog
        open={openEditDialog}
        title="Edit Kategori"
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedCategory(null);
        }}
      >
        <CategoryForm
  businessId={businessId}
  mode="edit"
  category={selectedCategory}
          onSuccess={() => {
            setOpenEditDialog(false);
            setSelectedCategory(null);
          }}
        />
      </CategoryDialog>

      <ConfirmDialog
        open={openDeleteDialog}
        title="Arsipkan Kategori"
        description={`Yakin ingin mengarsipkan "${selectedCategory?.name}"?`}
        confirmText="Arsipkan"
        cancelText="Batal"
        onCancel={() => {
          setOpenDeleteDialog(false);
          setSelectedCategory(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}