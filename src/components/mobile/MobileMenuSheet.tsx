"use client";

import { logout } from "@/lib/auth/logout";
import { useBusinessStore } from "@/features/settings";
import { useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
// ===== TAMBAHKAN DIBAWAH IMPORT INI =====

import { Logo } from "@/components/app/logo/Logo";

// ===== SELESAI =====

import { X, LogOut } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

// ===== GANTI const menus DENGAN INI =====

import { navigation } from "@/constants/navigation";

// ===== SELESAI =====

export function MobileMenuSheet({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();
  const {
  fetchBusiness,
} = useBusinessStore();

useEffect(() => {
  fetchBusiness();
}, [fetchBusiness]);


  return (
    <>
  
      {/* Drawer */}

<div
  className={`
    fixed
    inset-0
    z-50

    transition-all
    duration-300

    ${
      open
        ? "pointer-events-auto"
        : "pointer-events-none"
    }
  `}
>

  {/* Overlay */}

  <div
    onClick={onClose}
    className={`
      absolute
      inset-0

      bg-black/45
      backdrop-blur-sm

      transition-opacity
      duration-300

      ${
        open
          ? "opacity-100"
          : "opacity-0"
      }
    `}
  />

  {/* Sidebar */}

  <aside
  className={`
    absolute
    left-0
    top-0

    flex
    h-full
    w-[310px]
    flex-col

    rounded-r-[28px]

    bg-[#18181B]

    shadow-[0_0_40px_rgba(0,0,0,.45)]

      transition-transform
      duration-300

      ${
        open
          ? "translate-x-0"
          : "-translate-x-full"
      }
    `}
  >

    {/* HEADER */}

<div
  className="
    border-b
    border-white/10

    bg-[#1D1D1D]

    px-5
    py-7
  "
>

  <div className="flex items-start justify-between">

    <div className="flex items-center gap-4">

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-2xl

          text-gray-300
        "
      >
        <img
          src="/favicon.png"
          alt="IndoPOS"
          className="h-8 w-8 object-contain"
        />
      </div>

      <div>

        <h2
          className="
            text-[20px]
            font-bold
            leading-none

            text-white
          "
        >
          INDOPOS
        </h2>

        <p
          className="
            mt-1

            text-sm

            text-gray-400
          "
        >
          Jasa Layanan
        </p>

        <div
          className="
            mt-2

            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2
              w-2

              rounded-full

              bg-emerald-400
            "
          />

          <span
            className="
              text-xs

              font-medium

              text-gray-300
            "
          >
            Online
          </span>

        </div>

      </div>

    </div>

    <button
      onClick={onClose}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center

        rounded-xl

        text-gray-400

        transition

        hover:bg-[#2B2B2B]
        hover:text-white
      "
    >
      <X size={20} />
    </button>

  </div>

</div>

    {/* MENU */}

<div
  className="
    flex-1
    overflow-y-auto

    px-5
    py-6

    space-y-8

    [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:none]
    [scrollbar-width:none]
"
>

  {navigation.map((group) => (

    <div
      key={group.title}
      className="space-y-2"
    >

      <h3
        className="
          mb-3
          px-2

          text-[11px]
          font-semibold
          uppercase
          tracking-wider

          text-gray-400
        "
      >
        {group.title}
      </h3>

      <div className="space-y-1">

        {group.items.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (
              item.href !== "/" &&
              pathname.startsWith(item.href)
            );

          return (

            <Link
  key={item.href}
  href={item.href}
  onClick={onClose}
  className={`
    group

    relative

    flex
    items-center

    gap-4

    rounded-2xl

    px-4
    py-3.5

    transition-all
    duration-200

    ${
      active
        ? "bg-[#343C67] text-white shadow-sm"
        : "text-[#E5E7EB] hover:bg-[#2A2A2A]"
    }
  `}
>

              <Icon
                size={21}
                className={`
  shrink-0
  transition-colors

  ${
    active
      ? "text-white"
      : "text-gray-300 group-hover:text-white"
  }
`}
              />

              <span
  className={`
    flex-1

    truncate

    text-[15px]

    ${
      active
        ? "font-semibold text-white"
        : "font-medium text-[#E5E7EB]"
    }
  `}
>
                {item.title}
              </span>

            </Link>

          );

        })}

      </div>

    </div>

  ))}

</div>

    {/* FOOTER */}

    <div
      className="
border-t
border-white/10

bg-[#1D1D1D]

px-5
py-5
"
    >

      <button
        onClick={logout}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3

          rounded-3xl

          bg-red-500/15

          px-4
          py-4

          font-semibold

          text-red-300

          transition

          hover:bg-red-500/20
        "
      >

        <LogOut size={18} />

        Logout

      </button>

    </div>

  </aside>

</div>
    </>
  );
}