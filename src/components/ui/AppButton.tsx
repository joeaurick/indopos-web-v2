import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success";

type Size =
  | "sm"
  | "md"
  | "lg";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    fullWidth?: boolean;
  };

export function AppButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={clsx(
        `
          inline-flex
          items-center
          justify-center
          gap-2

          rounded-2xl

          font-semibold

          transition-all
          duration-200

          active:scale-[.98]

          disabled:cursor-not-allowed
          disabled:opacity-50

          hover:-translate-y-0.5
        `,

        fullWidth ? "w-full" : "w-auto",

        {
          "h-10 px-4 text-sm": size === "sm",
          "h-12 px-5 text-sm": size === "md",
          "h-14 px-6 text-base": size === "lg",
        },

        {
          "bg-[var(--primary)] text-white shadow-md hover:bg-[var(--primary-hover)]":
            variant === "primary",

          "bg-slate-100 text-slate-700 hover:bg-slate-200":
            variant === "secondary",

          "border border-[var(--border)] bg-white hover:bg-slate-50":
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