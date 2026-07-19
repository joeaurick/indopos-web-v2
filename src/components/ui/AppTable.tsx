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
        md:rounded-3xl

        border
        border-[var(--border)]

        bg-[var(--card)]

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
            min-w-[700px]
            w-full
          "
        >
          {children}
        </table>
      </div>
    </div>
  );
}