"use client";

export function HeroStats() {
  return (
    <div
      className="
        mt-12

        flex
        flex-wrap
        items-center

        gap-10
      "
    >
      <div>
        <h3 className="text-3xl font-black">
          500+
        </h3>

        <p className="mt-2 text-sm text-indigo-200">
          Merchant Aktif
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-black">
          99.9%
        </h3>

        <p className="mt-2 text-sm text-indigo-200">
          Cloud Uptime
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-black">
          24/7
        </h3>

        <p className="mt-2 text-sm text-indigo-200">
          Customer Support
        </p>
      </div>
    </div>
  );
}