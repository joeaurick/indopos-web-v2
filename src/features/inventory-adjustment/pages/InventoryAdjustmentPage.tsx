"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAdjustmentStore } from "../store/adjustment.store";

import { AdjustmentToolbar } from "../components/AdjustmentToolbar";
import { AdjustmentTable } from "../components/AdjustmentTable";
import { AdjustmentDialog } from "../components/AdjustmentDialog";
import { AdjustmentForm } from "../components/AdjustmentForm";

type Props = {
  businessId: string;
};

export function InventoryAdjustmentPage({
  businessId,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  const adjustments =
    useAdjustmentStore(
      (state) =>
        state.adjustments
    );

  const loading =
    useAdjustmentStore(
      (state) =>
        state.loading
    );

  const fetchAdjustments =
    useAdjustmentStore(
      (state) =>
        state.fetchAdjustments
    );

  useEffect(() => {
    fetchAdjustments(
      businessId
    );
  }, [
    businessId,
    fetchAdjustments,
  ]);

  const filtered =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      return adjustments.filter(
        (item) =>
          item.product_name
            .toLowerCase()
            .includes(keyword) ||
          item.sku
            .toLowerCase()
            .includes(keyword)
      );
    }, [
      adjustments,
      search,
    ]);

  return (
    <>
      <div className="space-y-6">
        <AdjustmentToolbar
          search={search}
          onSearch={setSearch}
          onAdd={() =>
            setOpenDialog(true)
          }
        />

        <AdjustmentTable
          adjustments={filtered}
          loading={loading}
        />
      </div>

      <AdjustmentDialog
        open={openDialog}
        title="Stock Adjustment"
        onClose={() =>
          setOpenDialog(false)
        }
      >
        <AdjustmentForm
          businessId={businessId}
          onSuccess={() =>
            setOpenDialog(false)
          }
        />
      </AdjustmentDialog>
    </>
  );
}