import { HTMLAttributes } from "react";
import clsx from "clsx";

type Props =
  HTMLAttributes<HTMLTableRowElement>;

export function TableRow({
  className,
  ...props
}: Props) {
  return (
    <tr
      {...props}
      className={clsx(
        `
        transition-all
        duration-200
        hover:bg-slate-50
        even:bg-slate-50/40
        `,
        className
      )}
    />
  );
}