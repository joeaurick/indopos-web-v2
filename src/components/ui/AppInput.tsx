import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props =
  InputHTMLAttributes<HTMLInputElement>;

export function AppInput({
  className,
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={clsx(
        `
        h-10
        w-full

        rounded-xl

        border
        border-slate-200

        bg-[var(--input)]

        px-4

        text-sm

        outline-none

        transition-colors

        placeholder:text-[var(--text-muted)]

        focus:border-[var(--primary)]
        focus:ring-2
        focus:ring-[var(--primary)]/10
        `,
        className
      )}
    />
  );
}