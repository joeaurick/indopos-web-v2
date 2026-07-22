import {
  createServerClient,
} from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

import { env } from "../env";

export async function updateSession(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase =
    createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },

          setAll(cookiesToSet) {
            cookiesToSet.forEach(
              ({ name, value }) => {
                request.cookies.set(
                  name,
                  value
                );
              }
            );

            response =
              NextResponse.next({
                request,
              });

            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                response.cookies.set(
                  name,
                  value,
                  options
                );
              }
            );
          },
        },
      }
    );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/check-email",
    "/auth/callback",
  ];

  const isPublic =
    publicRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          route + "/"
        )
    );

  if (!user && !isPublic) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
  user &&
  pathname === "/register"
) {
  return NextResponse.redirect(
    new URL(
      "/dashboard",
      request.url
    )
  );
}

  return response;
}