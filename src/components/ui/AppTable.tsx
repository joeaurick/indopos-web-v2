import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AppTable({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        `
        overflow-hidden

        rounded-2xl

        border
        border-slate-200

        bg-white

        shadow-sm
        `,
        className
      )}
    >
      <div
        className="
          w-full
          overflow-x-auto
        "
      >
        <table
          className="
            min-w-full
            border-collapse
          "
        >
          {children}
        </table>
      </div>
    </div>
  );
}