"use client";

import {
  useEffect,
  useState,
} from "react";

import clsx from "clsx";

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

  const [mounted, setMounted] =
    useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setValue(options.value ?? "");
      return;
    }

    const timer = setTimeout(() => {
      setMounted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [open, options]);

  if (!mounted) return null;

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
      className={clsx(
        `
        fixed
        inset-0
        z-[9999]

        flex
        items-end

        transition-all
        duration-300
        `,
        open
          ? "bg-black/30 opacity-100"
          : "bg-black/0 opacity-0"
      )}
    >
      <div
        className={clsx(
          `
          w-full

          rounded-t-3xl

          bg-white

          p-6

          shadow-2xl

          transform

          transition-transform
          duration-300
          ease-out
          `,
          open
            ? "translate-y-0"
            : "translate-y-full"
        )}
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

        {/* Display */}

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
              type="button"
              onClick={() =>
                append(item)
              }
              className="
                h-14
                rounded-xl

                text-3xl
                font-semibold

                transition

                active:scale-95
                active:bg-slate-100
              "
            >
              {item}
            </button>
          ))}

          <button
            type="button"
            onClick={clear}
            className="
              h-14
              rounded-xl

              text-2xl
              font-semibold

              text-red-500

              transition

              active:scale-95
            "
          >
            clr
          </button>

          <button
            type="button"
            onClick={() =>
              append("0")
            }
            className="
              h-14
              rounded-xl

              text-3xl
              font-semibold

              transition

              active:scale-95
            "
          >
            0
          </button>

          <button
            type="button"
            onClick={backspace}
            className="
              h-14
              rounded-xl

              text-2xl

              transition

              active:scale-95
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
                    String(
                      current +
                        item.value
                    )
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
            type="button"
            onClick={onClose}
            className="
              rounded-xl

              border
              border-red-300

              py-4

              font-semibold

              text-red-600

              transition

              hover:bg-red-50
            "
          >
            Batal
          </button>

          <button
            type="button"
            onClick={submit}
            className="
              rounded-xl

              bg-orange-500

              py-4

              font-semibold

              text-white

              transition

              hover:bg-orange-600
            "
          >
            Proses
          </button>
        </div>
      </div>
    </div>
  );
}