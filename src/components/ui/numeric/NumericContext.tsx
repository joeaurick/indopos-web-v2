"use client";

import { createContext } from "react";

export type NumericType =
  | "number"
  | "currency";

export type NumericOptions = {
  title?: string;

  type?: NumericType;

  value?: string;

  onSubmit: (value: string) => void;
};

export type NumericContextType = {
  open: (
    options: NumericOptions
  ) => void;

  close: () => void;
};

export const NumericContext =
  createContext<NumericContextType>({
    open: () => {},

    close: () => {},
  });