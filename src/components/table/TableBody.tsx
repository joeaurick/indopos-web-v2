import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TableBody({
  children,
}: Props) {
  return (
    <tbody
      className="
        divide-y
        divide-[var(--border)]
      "
    >
      {children}
    </tbody>
  );
}