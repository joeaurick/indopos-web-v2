"use client";

import Link from "next/link";

import {
  X,
  ArrowRight,
  LayoutDashboard,
  Boxes,
  BadgeDollarSign,
  CircleHelp,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const menus = [
  {
    title: "Features",
    href: "#features",
    icon: Boxes,
  },
  {
    title: "Showcase",
    href: "#showcase",
    icon: LayoutDashboard,
  },
  {
    title: "Pricing",
    href: "#pricing",
    icon: BadgeDollarSign,
  },
  {
    title: "FAQ",
    href: "#faq",
    icon: CircleHelp,
  },
];

export function LandingMobileDrawer({
  open,
  onClose,
}: Props) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40

          bg-black/40
          backdrop-blur-sm

          transition-opacity
          duration-300

          ${
            open
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed

          left-0
          top-0

          z-[60]

          flex
          h-full
          w-[290px]
max-w-[82vw]
          flex-col

          bg-white

          shadow-2xl

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
            flex
            items-center
            justify-between

            border-b

            p-6
          "
        >

          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-4"
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-[#343C67]
              "
            >

              <img
                src="/favicon.png"
                alt="IndoPOS"
                className="h-7 w-7"
              />

            </div>

            <div>

              <h2 className="font-bold text-[#343C67]">
                IndoPOS
              </h2>

              <p className="text-xs text-slate-500">
                Smart Business Platform
              </p>

            </div>

          </Link>

          <button
            onClick={onClose}
            className="
              rounded-xl

              p-2

              transition

              hover:bg-slate-100
            "
          >

            <X size={20} />

          </button>

        </div>

        {/* MENU */}

        <div
          className="
            flex-1

            p-5
          "
        >

          <div className="space-y-2">

            {menus.map((item) => {

              const Icon = item.icon;

              return (

                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="
                    flex
                    items-center
                    gap-4

                    rounded-2xl

                    px-4
                    py-4

                    transition

                    hover:bg-slate-100
                  "
                >

                  <Icon
                    size={20}
                    className="text-[#343C67]"
                  />

                  <span className="font-medium">
                    {item.title}
                  </span>

                </a>

              );

            })}

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            border-t

            p-5

            space-y-3
          "
        >

          <Link
            href="/login"
            onClick={onClose}
            className="
              flex
              h-12
              items-center
              justify-center

              rounded-2xl

              border

              font-semibold
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={onClose}
            className="
              flex
              h-12
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-[#343C67]

              font-semibold

              text-white
            "
          >

            Mulai Gratis

            <ArrowRight size={18} />

          </Link>

        </div>

      </aside>
    </>
  );
}