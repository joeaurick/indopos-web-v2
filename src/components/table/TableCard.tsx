import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TableCard({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        `
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        shadow-sm
        `,
        className
      )}
    >
      {children}
    </div>
  );
}