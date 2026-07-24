import {
  TdHTMLAttributes,
} from "react";
import clsx from "clsx";

type Props =
  TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({
  className,
  ...props
}: Props) {
  return (
    <td
      {...props}
      className={clsx(
        `
        px-5
        py-4
        text-sm
        text-slate-700
        `,
        className
      )}
    />
  );
}