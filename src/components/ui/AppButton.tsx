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

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
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

        rounded-xl

        border
        border-transparent

        font-semibold
        tracking-tight

        transition-all
        duration-200

        active:scale-[0.98]

        focus:outline-none
        focus:ring-2
        focus:ring-[var(--primary)]/20
        focus:ring-offset-1

        disabled:pointer-events-none
        disabled:opacity-50
        `,
        fullWidth && "w-full",
        !fullWidth && "w-auto",

        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-5 text-sm",

        variant === "primary" &&
          "bg-[var(--primary)] text-white shadow-sm hover:brightness-105 hover:shadow-md",

        variant === "secondary" &&
          "bg-slate-100 text-slate-700 hover:bg-slate-200",

        variant === "outline" &&
          "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",

        variant === "danger" &&
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md",

        variant === "success" &&
          "bg-green-600 text-white shadow-sm hover:bg-green-700 hover:shadow-md",

        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}