import {
  HTMLAttributes,
  ReactNode,
} from "react";

import clsx from "clsx";

type Props =
  HTMLAttributes<HTMLTableSectionElement> & {
    children: ReactNode;
  };

export function AppTableBody({
  children,
  className,
  ...props
}: Props) {
  return (
    <tbody
      {...props}
      className={clsx(className)}
    >
      {children}
    </tbody>
  );
}