import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const supabase = await createClient();

  // Exchange code -> session
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          exchangeError.message
        )}`,
        request.url
      )
    );
  }

  // Ambil user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const meta = user.user_metadata;

  // ==========================
  // PROFILE
  // ==========================

  const profileResult =
    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: meta.owner_name,
        phone: meta.phone,
      });

  if (profileResult.error) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          profileResult.error.message
        )}`,
        request.url
      )
    );
  }

  // ==========================
  // SUDAH PUNYA BUSINESS?
  // ==========================

  const { data: existing } =
    await supabase
      .from("business_users")
      .select("business_id")
      .eq("user_id", user.id)
      .maybeSingle();

  if (!existing) {
    const trialStart = new Date();

    const trialEnd = new Date();

    trialEnd.setDate(
      trialEnd.getDate() + 14
    );

    const businessResult =
      await supabase
        .from("businesses")
        .insert({
          name: meta.business_name,
          business_type:
            meta.business_type,
          phone: meta.phone,
          email: user.email,

          status: "trial",

          is_active: true,

          trial_start:
            trialStart.toISOString(),

          trial_end:
            trialEnd.toISOString(),
        })
        .select()
        .single();

    if (businessResult.error) {
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            businessResult.error.message
          )}`,
          request.url
        )
      );
    }

    const memberResult =
      await supabase
        .from("business_users")
        .insert({
          business_id:
            businessResult.data.id,

          user_id: user.id,

          role: "owner",

          is_active: true,
        });

    if (memberResult.error) {
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            memberResult.error.message
          )}`,
          request.url
        )
      );
    }
  }

  // ==========================
  // SELESAI VERIFIKASI
  // ARAHKAN KE LOGIN
  // ==========================

  return NextResponse.redirect(
    new URL(
      "/login?verified=true",
      request.url
    )
  );
}