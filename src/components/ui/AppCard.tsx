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
        overflow-hidden
        rounded-2xl
        md:rounded-3xl

        border
        border-[var(--border)]

        bg-[var(--card)]

        shadow-sm
        transition-all
        duration-300

        hover:shadow-lg
        `,
        className
      )}
    >
      {children}
    </div>
  );
}