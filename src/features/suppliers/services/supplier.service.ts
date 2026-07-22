import { getSupabaseClient } from "@/services/supabase/client";

import {
  Supplier,
  SupplierPayload,
} from "../types";

const supabase = getSupabaseClient();

export const supplierService = {
  async getSuppliers(
    businessId: string
  ): Promise<Supplier[]> {
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("name", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as Supplier[];
  },

  async createSupplier(
    businessId: string,
    payload: SupplierPayload
  ) {
    const { data, error } = await supabase
      .from("suppliers")
      .insert({
        ...payload,
        business_id: businessId,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async updateSupplier(
    businessId: string,
    id: string,
    payload: SupplierPayload
  ) {
    const { data, error } = await supabase
      .from("suppliers")
      .update(payload)
      .eq("id", id)
      .eq("business_id", businessId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async deleteSupplier(
    businessId: string,
    id: string
  ) {
    const { error } = await supabase
      .from("suppliers")
      .update({
        is_active: false,
      })
      .eq("id", id)
      .eq("business_id", businessId);

    if (error) {
      throw error;
    }
  },
};