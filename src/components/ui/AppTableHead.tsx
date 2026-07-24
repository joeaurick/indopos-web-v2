import {
  ReactNode,
  HTMLAttributes,
} from "react";

import clsx from "clsx";

type Props =
  HTMLAttributes<HTMLTableSectionElement> & {
    children: ReactNode;
  };

export function AppTableHead({
  children,
  className,
  ...props
}: Props) {
  return (
    <thead
  className={clsx(
    `
    sticky
    top-0
    z-10

    bg-slate-50

    border-b
    border-slate-200

    text-slate-500
    `,
    className
  )}
>
      {children}
    </thead>
  );
}