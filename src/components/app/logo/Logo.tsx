"use client";

import { useEffect } from "react";

import {
  useBusinessStore,
} from "@/features/settings";

export function Logo() {
  const {
    business,
    fetchBusiness,
  } = useBusinessStore();

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  return (
    <div className="flex min-w-0 items-center gap-4">

      {business?.logo_url ? (
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            overflow-hidden

            rounded-2xl

            bg-[#343C67]

            shadow-md
          "
        >
          <img
            src={business.logo_url}
            alt={business.name}
            className="h-7 w-7 object-contain"
          />
        </div>
      ) : (
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            rounded-2xl

            bg-[#343C67]

            text-xl
            font-bold
            text-white

            shadow-md
          "
        >
          {business?.name?.charAt(0)?.toUpperCase() ?? "I"}
        </div>
      )}

      <div className="min-w-0">

        <h2
          className="
            truncate
            text-[18px]
            font-bold
            leading-none
            text-white
          "
        >
          {business?.name ?? "IndoPOS"}
        </h2>

        <p
          className="
            mt-1
            truncate
            text-xs
            text-gray-400
          "
        >
          {business?.business_type ?? "Point of Sale"}
        </p>

      </div>

    </div>
  );
}