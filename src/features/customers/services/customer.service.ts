import { getSupabaseClient } from "@/services/supabase/client";

import {
  Customer,
  CustomerPayload,
} from "../types";

const supabase = getSupabaseClient();

export const customerService = {
  async getCustomers(
    businessId: string
  ): Promise<Customer[]> {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("business_id", businessId)
      .eq("is_active", true)
      .order("name", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as Customer[];
  },

  async createCustomer(
    businessId: string,
    payload: CustomerPayload
  ) {
    const { data, error } = await supabase
      .from("customers")
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

  async updateCustomer(
    businessId: string,
    id: string,
    payload: CustomerPayload
  ) {
    const { data, error } = await supabase
      .from("customers")
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

  async deleteCustomer(
    businessId: string,
    id: string
  ) {
    const { error } = await supabase
      .from("customers")
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