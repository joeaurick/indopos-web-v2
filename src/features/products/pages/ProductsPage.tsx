"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { notify } from "@/lib/notify";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import { Product } from "../types";
import { useProductStore } from "../store/product.store";

import { ProductToolbar } from "../components/ProductToolbar";
import { ProductTable } from "../components/ProductTable";
import { ProductDialog } from "../components/ProductDialog";
import { ProductForm } from "../components/ProductForm";

export function ProductsPage() {
  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<string | null>(null);

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
    selectedProduct,
    setSelectedProduct,
  ] = useState<Product | null>(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const products = useProductStore(
    (state) => state.products
  );

  const loading = useProductStore(
    (state) => state.loading
  );

  const fetchProducts =
    useProductStore(
      (state) => state.fetchProducts
    );

  const deleteProduct =
    useProductStore(
      (state) => state.deleteProduct
    );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return products.filter(
        (product) => {
          const matchSearch =
            keyword === "" ||
            product.name
              .toLowerCase()
              .includes(keyword) ||
            product.sku
              .toLowerCase()
              .includes(keyword);

          const matchCategory =
            !selectedCategory ||
            product.category_id ===
              selectedCategory;

          return (
            matchSearch &&
            matchCategory
          );
        }
      );
    }, [
      products,
      search,
      selectedCategory,
    ]);

  function handleEdit(
    product: Product
  ) {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  }

  function handleDelete(
    product: Product
  ) {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!selectedProduct) return;

    setDeleting(true);

    const loadingToast =
      notify.loading(
        "Menghapus produk..."
      );

    try {
      await deleteProduct(
        selectedProduct.id
      );

      notify.dismiss(loadingToast);

      notify.success(
        "Produk berhasil dihapus."
      );

      setOpenDeleteDialog(false);
      setSelectedProduct(null);
    } catch (error: any) {
      console.error(error);

      notify.dismiss(loadingToast);

      notify.error(
        error?.message ??
          "Gagal menghapus produk."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="space-y-6 pb-40">

  <ProductToolbar
    search={search}
    onSearch={setSearch}
    selectedCategory={selectedCategory}
    onSelectCategory={setSelectedCategory}
    onAdd={() => setOpenCreateDialog(true)}
  />

  <ProductTable
    products={filteredProducts}
    loading={loading}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />

</div>

      <ProductDialog
        open={openCreateDialog}
        title="Tambah Produk"
        onClose={() =>
          setOpenCreateDialog(false)
        }
      >
        <ProductForm
          mode="create"
          onSuccess={() =>
            setOpenCreateDialog(false)
          }
        />
      </ProductDialog>

      <ProductDialog
        open={openEditDialog}
        title="Edit Produk"
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedProduct(null);
        }}
      >
        <ProductForm
          mode="edit"
          product={selectedProduct}
          onSuccess={() => {
            setOpenEditDialog(false);
            setSelectedProduct(null);
          }}
        />
      </ProductDialog>

      <ConfirmDialog
        open={openDeleteDialog}
        title="Hapus Produk"
        description={`Yakin ingin menghapus "${selectedProduct?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        loading={deleting}
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => {
          setOpenDeleteDialog(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}