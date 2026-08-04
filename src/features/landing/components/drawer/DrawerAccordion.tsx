"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ChevronDown,
  LucideIcon,
} from "lucide-react";

import { DrawerChildItem } from "./drawer.data";

type Props = {
  title: string;
  icon: LucideIcon;
  children: DrawerChildItem[];
  onNavigate?: () => void;
};

export function DrawerAccordion({
  title,
  icon: Icon,
  children,
  onNavigate,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-transparent transition-all duration-300">

      {/* HEADER */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          group
          flex
          w-full
          items-center
          gap-4

          rounded-2xl

          px-4
          py-4

          transition-all
          duration-300

          hover:bg-slate-50
        "
      >
        {/* ICON */}

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            bg-slate-100

            text-[#343C67]

            transition-all

            group-hover:bg-[#343C67]
            group-hover:text-white
          "
        >
          <Icon size={20} />
        </div>

        {/* TITLE */}

        <div className="flex-1 text-left">

          <p className="font-semibold text-slate-800">
            {title}
          </p>

        </div>

        {/* CHEVRON */}

        <ChevronDown
          size={18}
          className={`
            text-slate-500
            transition-all
            duration-300

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* CONTENT */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300

          ${
            open
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <div className="ml-[62px] space-y-2 pb-3">

          {children.map((item) => (

            <Link
              key={item.title}
              href={item.href}
              onClick={onNavigate}
              className="
                flex
                items-center

                rounded-xl

                px-3
                py-3

                text-sm
                font-medium

                text-slate-600

                transition-all
                duration-300

                hover:bg-indigo-50
                hover:text-[#343C67]
                hover:translate-x-1
              "
            >
              {item.title}
            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}