import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: Variant;
    loading?: boolean;
  };

export function AppButton({
  children,
  variant = "primary",
  loading,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        `
        inline-flex
        min-h-11
        w-full
        items-center
        justify-center
        gap-2

        rounded-2xl

        px-5
        py-3

        text-sm
        font-semibold

        transition-all
        duration-200

        active:scale-[.98]

        disabled:cursor-not-allowed
        disabled:opacity-50

        md:min-h-12
        md:w-auto

        hover:-translate-y-0.5
        `,

        {
          "bg-[var(--primary)] text-white shadow-md hover:bg-[var(--primary-hover)]":
            variant === "primary",

          "bg-slate-100 text-slate-700 hover:bg-slate-200":
            variant === "secondary",

          "border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--hover)]":
            variant === "outline",

          "bg-red-500 text-white hover:bg-red-600":
            variant === "danger",

          "bg-green-600 text-white hover:bg-green-700":
            variant === "success",
        },

        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}