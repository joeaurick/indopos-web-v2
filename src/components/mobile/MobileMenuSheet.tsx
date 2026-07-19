"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Package,
  Boxes,
  Users,
  Truck,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  Settings,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const menus = [
  {
    title: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Truck,
  },
  {
    title: "Cash In",
    href: "/cash-in",
    icon: ArrowDownCircle,
  },
  {
    title: "Cash Out",
    href: "/cash-out",
    icon: ArrowUpCircle,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function MobileMenuSheet({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-40
          bg-slate-900/45
          backdrop-blur-sm
        "
      />

      {/* Sheet */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50

          rounded-t-[32px]

          bg-[var(--card)]

          px-5
          pb-8
          pt-4

          shadow-[0_-15px_40px_rgba(0,0,0,.18)]

          animate-in
          slide-in-from-bottom
          duration-300
        "
      >
        {/* Handle */}

        <div className="mb-5 flex justify-center">

          <div
            className="
              h-1.5
              w-14
              rounded-full
              bg-slate-300
            "
          />

        </div>

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Menu
            </h2>

            <p className="text-sm text-slate-500">
              Pilih menu yang ingin dibuka
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              transition
              hover:bg-slate-200
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Menu */}

        <div className="grid grid-cols-3 gap-4">

          {menus.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className={`
                  group

                  flex
                  flex-col
                  items-center
                  justify-center

                  rounded-3xl

                  p-4

                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-teal-50 border border-teal-200"
                      : "bg-white border border-slate-200 hover:border-teal-200 hover:shadow-md active:scale-95"
                  }
                `}
              >
                <div
                  className={`
                    mb-3

                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-2xl

                    transition-all

                    ${
                      active
                        ? "bg-[var(--primary)] text-white"
                        : "bg-slate-100 text-[var(--primary)] group-hover:bg-teal-50"
                    }
                  `}
                >
                  <Icon size={28} />
                </div>

                <span
                  className="
                    text-center
                    text-xs
                    font-semibold
                    leading-4
                  "
                >
                  {item.title}
                </span>

              </Link>
            );

          })}

        </div>

        <div className="h-6" />
      </div>
    </>
  );
}