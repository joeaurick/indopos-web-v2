import { TdHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = TdHTMLAttributes<HTMLTableCellElement> & {
  children: ReactNode;
};

export function AppTableCell({
  children,
  className,
  ...props
}: Props) {
  return (
    <td
      {...props}
      className={clsx(
        `
        h-16
        px-5
        py-4

        align-middle
        whitespace-nowrap

        text-sm
        font-medium
        text-slate-700
        `,
        className
      )}
    >
      {children}
    </td>
  );
}