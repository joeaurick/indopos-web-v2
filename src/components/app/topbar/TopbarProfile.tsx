"use client";

import { useState, useRef, useEffect } from "react";

import {
  ChevronDown,
  LogOut,
  ShieldCheck,
  Building2,
  Sparkles,
  CircleCheckBig,
} from "lucide-react";

import { logout } from "@/lib/auth/logout";
import { useBusinessStore } from "@/features/settings";

export function TopbarProfile() {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const {
    business,
    fetchBusiness,
  } = useBusinessStore();

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      {/* BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          group
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          shadow-sm
          transition-all
          duration-300
          hover:border-teal-500
          hover:shadow-lg
        "
      >
        <div className="relative">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-teal-500
              via-emerald-500
              to-cyan-500
              text-lg
              font-bold
              text-white
            "
          >
            {(business?.name?.charAt(0) ??
              "A").toUpperCase()}
          </div>

          <span
            className="
              absolute
              bottom-0
              right-0
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-white
              bg-emerald-500
            "
          />

        </div>

        <div className="hidden text-left lg:block">

          <h4 className="font-semibold leading-none">
            Administrator
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            Super Admin
          </p>

        </div>

        <ChevronDown
          size={18}
          className="
            text-slate-500
            transition
            group-hover:rotate-180
          "
        />

      </button>

      {open && (

        <div
          className="
            absolute
            right-0
            mt-4
            w-[360px]
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200
            bg-white/95
            backdrop-blur-xl
            shadow-[0_25px_70px_rgba(15,23,42,.18)]
          "
        >

          {/* HEADER */}

          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-teal-600
              via-emerald-500
              to-cyan-500
              px-6
              py-7
              text-white
            "
          >

            <div
              className="
                absolute
                -right-10
                -top-10
                h-40
                w-40
                rounded-full
                bg-white/10
              "
            />

            <div className="relative flex items-center gap-4">

              <div
                className="
                  relative
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-white/30
                  bg-white/15
                  text-2xl
                  font-bold
                "
              >
                {(business?.name?.charAt(0) ??
                  "A").toUpperCase()}

                <span
                  className="
                    absolute
                    bottom-1
                    right-1
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-white
                    bg-emerald-400
                  "
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Administrator
                </h2>

                <p className="text-white/80">
                  Super Admin
                </p>

                <p className="mt-1 text-sm text-white/70">
                  {business?.name ??
                    "IndoPOS"}
                </p>

              </div>

            </div>

          </div>

          {/* QUICK INFO */}

          <div className="space-y-4 p-5">

            <InfoCard
              icon={
                Building2
              }
              title="Business"
              value={
                business?.name ??
                "-"
              }
            />

            <InfoCard
              icon={
                ShieldCheck
              }
              title="Role"
              value="Super Administrator"
            />

            <InfoCard
              icon={
                CircleCheckBig
              }
              title="Status"
              value="Active"
            />

            <InfoCard
              icon={
                Sparkles
              }
              title="Subscription"
              value="Enterprise"
            />

          </div>

          <div className="border-t border-slate-100 p-5">

            <button
              onClick={logout}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-red-50
                px-5
                py-4
                font-semibold
                text-red-600
                transition
                hover:bg-red-500
                hover:text-white
              "
            >
              <LogOut size={20} />

              Logout
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

type InfoProps = {
  icon: any;
  title: string;
  value: string;
};

function InfoCard({
  icon: Icon,
  title,
  value,
}: InfoProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-4
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-white
          shadow-sm
        "
      >
        <Icon
          size={20}
          className="text-teal-600"
        />
      </div>

      <div>

        <p className="text-xs text-slate-500">
          {title}
        </p>

        <h4 className="font-semibold">
          {value}
        </h4>

      </div>

    </div>
  );
}