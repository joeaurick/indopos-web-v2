import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { businessId: null },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { businessId: null },
      { status: 404 }
    );
  }

  return NextResponse.json({
    businessId: data.business_id,
  });
}