import { Database } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export function TableEmpty({
  title = "Belum ada data",
  description = "Data akan muncul di sini setelah dibuat.",
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
      "
    >
      <div
        className="
          mb-5
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-slate-100
        "
      >
        <Database
          size={34}
          className="text-slate-400"
        />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}