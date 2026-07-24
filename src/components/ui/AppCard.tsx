import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        `
        rounded-2xl

        border
        border-slate-200

        bg-white

        shadow-sm

        transition-all
        duration-200

        hover:shadow-md
        `,
        className
      )}
    >
      {children}
    </div>
  );
}