import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function AppToolbar({
  left,
  right,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        `
        flex
        flex-col
        gap-4

        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--card)]

        p-4

        shadow-sm

        lg:flex-row
        lg:items-center
        lg:justify-between
        `,
        className
      )}
    >
      <div
        className="
          flex
          flex-1
          flex-col
          gap-3

          lg:flex-row
          lg:items-center
        "
      >
        {left}
      </div>

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        {right}
      </div>
    </div>
  );
}