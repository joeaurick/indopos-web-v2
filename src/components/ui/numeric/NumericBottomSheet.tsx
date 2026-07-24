"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  NumericOptions,
} from "./NumericContext";

type Props = {
  open: boolean;

  options: NumericOptions;

  onClose: () => void;
};

export function NumericBottomSheet({
  open,
  options,
  onClose,
}: Props) {
  const [value, setValue] =
    useState("");

  useEffect(() => {
    if (open) {
      setValue(options.value ?? "");
    }
  }, [open, options]);

  if (!open) return null;

  function append(number: string) {
    setValue((prev) => prev + number);
  }

  function backspace() {
    setValue((prev) =>
      prev.slice(0, -1)
    );
  }

  function clear() {
    setValue("");
  }

  function submit() {
    options.onSubmit(value);

    onClose();
  }

  const display =
    options.type === "currency"
      ? value === ""
        ? ""
        : Number(value).toLocaleString(
            "id-ID"
          )
      : value;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-end
        bg-black/30
      "
    >
      <div
        className="
          w-full
          rounded-t-3xl
          bg-white
          p-6
          shadow-2xl
          animate-in
          slide-in-from-bottom
        "
      >
        {/* Handle */}

        <div className="mb-5 flex justify-center">

          <div
            className="
              h-1.5
              w-14
              rounded-full
              bg-slate-300
            "
          />

        </div>

        {/* Title */}

        <h2 className="text-center text-lg font-bold">

          {options.title ?? "Input"}

        </h2>

        {/* Value */}

        <div
          className="
            mt-5
            mb-7

            border-b-2
            border-sky-300

            pb-2

            text-center
            text-4xl
            font-semibold
          "
        >
          {display || "0"}
        </div>

        {/* Keyboard */}

        <div className="grid grid-cols-3 gap-5">

          {[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                append(item)
              }
              className="
                h-14
                rounded-xl
                text-3xl
                font-semibold
                active:bg-slate-100
              "
            >
              {item}
            </button>
          ))}

          <button
            onClick={clear}
            className="
              h-14
              rounded-xl
              text-2xl
              font-semibold
              text-red-500
            "
          >
            clr
          </button>

          <button
            onClick={() =>
              append("0")
            }
            className="
              h-14
              rounded-xl
              text-3xl
              font-semibold
            "
          >
            0
          </button>

          <button
            onClick={backspace}
            className="
              h-14
              rounded-xl
              text-2xl
            "
          >
            ⌫
          </button>

        </div>

{/* Quick Amount */}

<div className="mt-8">

  <div className="mb-4 flex items-center justify-between">

    <h3 className="text-sm font-semibold text-slate-700">
      Tambah Cepat
    </h3>

    <span className="text-xs text-slate-400">
      Shortcut Nominal
    </span>

  </div>

  <div className="grid grid-cols-5 gap-3">

    {[
      {
        label: "+5rb",
        value: 5000,
      },
      {
        label: "+10rb",
        value: 10000,
      },
      {
        label: "+20rb",
        value: 20000,
      },
      {
        label: "+50rb",
        value: 50000,
      },
      {
        label: "+100rb",
        value: 100000,
      },
    ].map((item) => (

      <button
        key={item.label}
        type="button"
        onClick={() => {
          const current =
            Number(value || 0);

          setValue(
            String(current + item.value)
          );
        }}
        className="
          group

          flex
          h-14
          flex-col
          items-center
          justify-center

          rounded-2xl

          border
          border-emerald-100

          bg-gradient-to-b
          from-white
          to-emerald-50

          shadow-sm

          transition-all
          duration-200

          hover:-translate-y-1
          hover:border-emerald-300
          hover:shadow-lg

          active:scale-95
        "
      >

        <span
          className="
            text-sm
            font-bold
            text-emerald-700

            transition-transform

            group-hover:scale-110
          "
        >
          {item.label}
        </span>

      </button>

    ))}

  </div>

</div>


        {/* Footer */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-red-300
              py-4
              font-semibold
              text-red-600
            "
          >
            Batal
          </button>

          <button
            onClick={submit}
            className="
              rounded-xl
              bg-orange-500
              py-4
              font-semibold
              text-white
            "
          >
            Proses
          </button>

        </div>

      </div>
    </div>
  );
}