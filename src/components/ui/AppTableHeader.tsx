import {
  ReactNode,
  ThHTMLAttributes,
} from "react";

import clsx from "clsx";

type Props =
  ThHTMLAttributes<HTMLTableCellElement> & {
    children: ReactNode;
  };

export function AppTableHeader({
  children,
  className,
  ...props
}: Props) {
  return (
    <th
      {...props}
      className={clsx(
        `
        px-4
        py-3

        whitespace-nowrap

        text-left
        text-sm
        font-semibold
        text-slate-600
        `,
        className
      )}
    >
      {children}
    </th>
  );
}