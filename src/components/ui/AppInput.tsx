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
        h-11
        w-full

        rounded-2xl

        border
        border-[var(--border)]

        bg-[var(--input)]

        px-4

        text-sm

        outline-none

        transition-all

        placeholder:text-[var(--text-muted)]

        focus:border-[var(--primary)]
        focus:ring-4
        focus:ring-teal-500/10

        md:h-12
        `,
        className
      )}
    />
  );
}