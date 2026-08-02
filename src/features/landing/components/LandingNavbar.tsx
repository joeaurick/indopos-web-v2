"use client";

import Link from "next/link";
import { useState } from "react";
import { LandingMobileDrawer } from "./LandingMobileDrawer";

import {
  Menu,
  ArrowRight,
} from "lucide-react";

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50

          border-b
          border-slate-200/70

          bg-white/80

          backdrop-blur-xl
        "
      >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between

          px-6

          lg:px-8
        "
      >
        {/* Logo */}

        <Link
          href="/"
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

            <h2
              className="
                text-xl
                font-bold

                text-[#343C67]
              "
            >
              IndoPOS
            </h2>

            <p
              className="
                text-xs

                text-slate-500
              "
            >
              Smart Business Platform
            </p>

          </div>

        </Link>

        {/* Desktop Menu */}

        <nav
          className="
            hidden

            items-center
            gap-10

            lg:flex
          "
        >
          <a
            href="#features"
            className="
              text-sm
              font-medium

              text-slate-600

              transition

              hover:text-[#343C67]
            "
          >
            Features
          </a>

          <a
            href="#showcase"
            className="
              text-sm
              font-medium

              text-slate-600

              transition

              hover:text-[#343C67]
            "
          >
            Showcase
          </a>

          <a
            href="#pricing"
            className="
              text-sm
              font-medium

              text-slate-600

              transition

              hover:text-[#343C67]
            "
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="
              text-sm
              font-medium

              text-slate-600

              transition

              hover:text-[#343C67]
            "
          >
            FAQ
          </a>
        </nav>

        {/* Right */}

        <div
          className="
            hidden
            items-center
            gap-4

            lg:flex
          "
        >
          <Link
            href="/login"
            className="
              rounded-2xl

              px-5
              py-3

              text-sm
              font-semibold

              text-slate-700

              transition

              hover:bg-slate-100
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
  inline-flex
  items-center
  gap-2

  rounded-2xl

  bg-[#343C67]

  px-6
  py-3

  text-sm
  font-semibold

  !text-white

  transition-all

  hover:bg-[#2B3257]
  hover:-translate-y-0.5
  hover:shadow-lg
"
          >
            Mulai Gratis

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile */}

        <button
  onClick={() => setOpen(true)}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            border
            border-slate-200

            lg:hidden
          "
        >
          <Menu size={22} />
        </button>
      </div>
      
    </header>

  <LandingMobileDrawer
    open={open}
    onClose={() => setOpen(false)}
  />
</>
  );
}