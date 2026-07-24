"use client";

import {
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  NumericContext,
  NumericOptions,
} from "./NumericContext";

import { NumericBottomSheet } from "./NumericBottomSheet";

type Props = {
  children: ReactNode;
};

export function NumericProvider({
  children,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [options, setOptions] =
    useState<NumericOptions>({
      onSubmit: () => {},
    });

  const show = useCallback(
    (value: NumericOptions) => {
      setOptions(value);

      setOpen(true);
    },
    []
  );

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open: show,
      close,
    }),
    [show, close]
  );

  return (
    <NumericContext.Provider
      value={value}
    >
      {children}

      <NumericBottomSheet
        open={open}
        options={options}
        onClose={close}
      />
    </NumericContext.Provider>
  );
}