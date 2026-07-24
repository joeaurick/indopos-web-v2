import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TableHead({
  children,
}: Props) {
  return (
    <thead
      className="
        sticky
        top-0
        z-10
        bg-slate-50
      "
    >
      {children}
    </thead>
  );
}