"use client";

type Props = {
  subtotal: number;

  discount: number;

  tax: number;
};

export function PurchaseSummary({
  subtotal,
  discount,
  tax,
}: Props) {

  const total =
    subtotal -
    discount +
    tax;

  return (

    <div className="rounded-xl border bg-slate-50 p-5 lg:sticky lg:top-24">

      <div className="flex justify-between py-1">

        <span>Subtotal</span>

        <span>
          Rp{" "}
          {subtotal.toLocaleString(
            "id-ID"
          )}
        </span>

      </div>

      <div className="flex justify-between py-1">

        <span>Diskon</span>

        <span>
          Rp{" "}
          {discount.toLocaleString(
            "id-ID"
          )}
        </span>

      </div>

      <div className="flex justify-between py-1">

        <span>Pajak</span>

        <span>
          Rp{" "}
          {tax.toLocaleString(
            "id-ID"
          )}
        </span>

      </div>

      <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold">

        <span>Total</span>

        <span>
          Rp{" "}
          {total.toLocaleString(
            "id-ID"
          )}
        </span>

      </div>

    </div>

  );
}