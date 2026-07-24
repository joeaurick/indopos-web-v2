import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

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
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-xl
      "
    >
      {/* Background Glow */}

      <div
        className="absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-10"
        style={{
          background: color,
        }}
      />

      {/* Top */}

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2
            className="
              mt-3
              text-2xl
              font-bold
              tracking-tight
              text-slate-900

              md:text-3xl
            "
          >
            {value}
          </h2>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:-rotate-6
          "
          style={{
            background: `${color}15`,
            color,
          }}
        >
          {icon}
        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-slate-100" />

      {/* Bottom */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: color,
            }}
          />

          <span className="text-sm text-slate-500">
            Real-time Update
          </span>

        </div>

        <div
          className="
            flex
            items-center
            gap-1
            text-sm
            font-semibold
          "
          style={{
            color,
          }}
        >
          View

          <ArrowUpRight
            size={16}
            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>

      </div>
    </div>
  );
}