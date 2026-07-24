"use client";

import { forwardRef } from "react";

import { useNumeric } from "@/components/ui/numeric/useNumeric";

type Props = {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

function format(value: string | number) {
  const raw = String(value).replace(/\D/g, "");

  if (!raw) return "";

  return Number(raw).toLocaleString("id-ID");
}

export const CurrencyInput = forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      disabled,
    },
    ref
  ) => {
    const { open } = useNumeric();

    const isMobile =
      typeof window !== "undefined" &&
      window.innerWidth < 1024;

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={format(value)}
        readOnly={isMobile}
        onFocus={(e) => {
          if (isMobile) {
            e.target.blur();
          }
        }}
        onClick={() => {
          if (!isMobile) return;

          open({
            title: "Masukkan Harga",
            type: "currency",
            value: String(value),
            onSubmit: onChange,
          });
        }}
        onChange={(e) => {
          if (isMobile) return;

          const raw = e.target.value.replace(
            /\D/g,
            ""
          );

          onChange(raw);
        }}
        className={className}
      />
    );
  }
);

CurrencyInput.displayName =
  "CurrencyInput";