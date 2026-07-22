"use client";

import { useEffect } from "react";

import { useDashboardStore } from "@/features/dashboard/store/dashboard-store";

type Props = {
  businessId: string;
};

export function DashboardLoader({
  businessId,
}: Props) {
  const fetchDashboard = useDashboardStore(
    (state) => state.fetchDashboard
  );

  useEffect(() => {
    fetchDashboard(businessId);
  }, [businessId, fetchDashboard]);

  return null;
}