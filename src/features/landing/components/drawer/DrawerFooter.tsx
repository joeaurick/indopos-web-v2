"use client";

import Link from "next/link";
import {
  ArrowRight,
  Instagram,
  Mail,
  MessageCircle,
} from "lucide-react";

type Props = {
  onClose: () => void;
};

export function DrawerFooter({
  onClose,
}: Props) {
  return (
    <div className="border-t border-slate-200 bg-white p-5">

      {/* Login */}

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
          border-slate-200

          font-semibold
          text-slate-700

          transition-all

          hover:bg-slate-100
        "
      >
        Masuk
      </Link>

      <div className="h-3" />

      {/* Register */}

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

          shadow-lg

          transition-all
          duration-300

          hover:bg-[#2B3257]
          hover:shadow-xl
        "
      >
        <span className="text-white">
          Mulai Gratis
        </span>

        <ArrowRight
          size={18}
          className="text-white"
        />
      </Link>

      <div className="my-5 border-t border-slate-200" />

      {/* Social */}

      <div className="space-y-2">

        <Link
          href="#"
          className="
            flex
            items-center
            gap-3

            rounded-xl

            px-3
            py-3

            hover:bg-green-50
          "
        >
          <MessageCircle
            size={20}
            className="text-[#25D366]"
          />

          <span className="text-sm font-medium">
            WhatsApp
          </span>

        </Link>

        <Link
          href="#"
          className="
            flex
            items-center
            gap-3

            rounded-xl

            px-3
            py-3

            hover:bg-pink-50
          "
        >
          <Instagram
            size={20}
            className="text-pink-500"
          />

          <span className="text-sm font-medium">
            Instagram
          </span>

        </Link>

        <Link
          href="#"
          className="
            flex
            items-center
            gap-3

            rounded-xl

            px-3
            py-3

            hover:bg-sky-50
          "
        >
          <Mail
            size={20}
            className="text-sky-600"
          />

          <span className="text-sm font-medium">
            Email
          </span>

        </Link>

      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">

        <p className="text-center text-xs text-slate-400">
          © 2026 IndoPOS
        </p>

      </div>

    </div>
  );
}