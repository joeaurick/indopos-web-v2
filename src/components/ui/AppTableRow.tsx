import {
  HTMLAttributes,
  ReactNode,
} from "react";

import clsx from "clsx";

type Props =
  HTMLAttributes<HTMLTableRowElement> & {
    children: ReactNode;
  };

export function AppTableRow({
  children,
  className,
  ...props
}: Props) {
  return (
    <tr
      {...props}
      className={clsx(
        `
        border-b
        border-slate-100

        transition-all
        duration-200

        hover:bg-slate-50
        `,
        className
      )}
    >
      {children}
    </tr>
  );
}