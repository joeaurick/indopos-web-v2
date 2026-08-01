"use client";

import { useEffect, useState } from "react";

import {
  ChevronRight,
  Menu,
} from "lucide-react";

import { useBusinessStore } from "@/features/settings";

import { MobileMenuSheet } from "@/components/mobile/MobileMenuSheet";

export function TopbarMobile() {
  const {
    business,
    fetchBusiness,
  } = useBusinessStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-40

          md:hidden

          bg-[#343C67]

          px-4
          pt-safe
          pt-5
          pb-6

          shadow-lg
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setOpen(true)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-2xl

                bg-white/10

                transition

                hover:bg-white/20
              "
            >
              <Menu
                size={22}
                className="text-white"
              />
            </button>

            <div>

              <h1
                className="
                  text-[22px]
                  font-bold
                  leading-none
                  text-white
                "
              >
                {business?.name ?? "IndoPOS"}
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-200
                "
              >
                {business?.business_type ?? "Point of Sale"}
              </p>

            </div>

          </div>

          <div
  className="
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-xl
  "
>
  <img
    src="/favicon.png"
    alt="IndoPOS"
    className="h-8 w-8 object-contain"
  />
</div>

        </div>

        {/* WORKSPACE */}

        <button
          className="
            mt-5

            flex
            w-full
            items-center
            justify-between

            rounded-2xl

            border
            border-white/10

            bg-white/10

            px-4
            py-3

            backdrop-blur

            transition-all

            hover:bg-white/15
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-gray-100
            "
          >
            Business Management
          </p>

          <ChevronRight
            size={18}
            className="text-gray-200"
          />

        </button>

      </header>

      <MobileMenuSheet
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}