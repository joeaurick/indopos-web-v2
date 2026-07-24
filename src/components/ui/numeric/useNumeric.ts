"use client";

import { useContext } from "react";

import { NumericContext } from "./NumericContext";

export function useNumeric() {
  return useContext(
    NumericContext
  );
}