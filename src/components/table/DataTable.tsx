import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function DataTable({
  children,
}: Props) {
  return (
    <div
      className="
        overflow-x-auto
      "
    >
      <table
        className="
          min-w-full
          border-collapse
        "
      >
        {children}
      </table>
    </div>
  );
}