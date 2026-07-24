import {
  ThHTMLAttributes,
} from "react";
import clsx from "clsx";

type Props =
  ThHTMLAttributes<HTMLTableCellElement>;

export function TableHeaderCell({
  className,
  ...props
}: Props) {
  return (
    <th
      {...props}
      className={clsx(
        `
        whitespace-nowrap
        px-5
        py-4
        text-left
        text-xs
        font-bold
        uppercase
        tracking-wider
        text-slate-500
        `,
        className
      )}
    />
  );
}