"use client";

type Props = {
  search: string;
  onSearch: (value: string) => void;
};

export function StockCardToolbar({
  search,
  onSearch,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <input
        value={search}
        onChange={(e) =>
          onSearch(e.target.value)
        }
        placeholder="Cari di sini..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />
    </div>
  );
}