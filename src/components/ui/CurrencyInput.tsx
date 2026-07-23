"use client";

import { forwardRef } from "react";

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
    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={format(value)}
        onChange={(e) => {
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

CurrencyInput.displayName = "CurrencyInput";