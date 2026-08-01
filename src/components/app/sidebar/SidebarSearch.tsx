"use client";

import { Search } from "lucide-react";

import { useSidebarSearchStore } from "@/store/sidebar-search.store";

type Props = {
  collapsed: boolean;
};

export function SidebarSearch({
  collapsed,
}: Props) {
  const keyword =
    useSidebarSearchStore(
      (state) => state.keyword
    );

  const setKeyword =
    useSidebarSearchStore(
      (state) => state.setKeyword
    );

  if (collapsed) return null;

  return (
    <div className="px-4 pb-4">

      <div
        className="
          flex
          items-center
          gap-3

          rounded-2xl

          border
          border-white/10

          bg-[#242424]

          px-4
          py-3

          transition-all

          focus-within:border-[#343C67]
          focus-within:bg-[#2a2a2a]
        "
      >

        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Cari menu..."

          className="
            w-full

            border-0
            bg-transparent

            text-sm
            text-white

            outline-none

            placeholder:text-gray-500
          "
        />

      </div>

    </div>
  );
}