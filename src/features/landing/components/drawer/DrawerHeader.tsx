"use client";

import Link from "next/link";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export function DrawerHeader({
  onClose,
}: Props) {
  return (
    <div
      className="
        border-b
        border-slate-200

        bg-white

        px-6
        py-6
      "
    >
      <div className="flex items-start justify-between">

        {/* LOGO */}

        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-4"
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-[#343C67]
              to-[#4F5D95]

              shadow-lg
            "
          >
            <img
              src="/favicon.png"
              alt="IndoPOS"
              className="h-8 w-8"
            />
          </div>

          <div>

            <h2
              className="
                text-lg
                font-bold

                tracking-tight

                text-[#343C67]
              "
            >
              IndoPOS
            </h2>

            <p
              className="
                mt-1

                text-xs

                leading-5

                text-slate-500
              "
            >
              Smart Business Platform
            </p>

          </div>

        </Link>

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            transition-all
            duration-300

            hover:bg-slate-100
            hover:rotate-90
          "
        >
          <X
            size={20}
            className="text-slate-700"
          />
        </button>

      </div>
    </div>
  );
}