import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
};

export function StatCard({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
      />

      <div
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[90px] opacity-10"
        style={{
          background: color,
        }}
      />

      <div className="relative flex items-start justify-between">

        <div className="flex-1">

          <span
            className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            {title}
          </span>

          <h2 className="mt-5 break-words text-3xl font-bold leading-tight text-slate-900 md:text-[34px]">
            {value}
          </h2>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Update Real-time
          </div>

        </div>

        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:-rotate-6
          "
          style={{
            backgroundColor: `${color}15`,
            color,
          }}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}