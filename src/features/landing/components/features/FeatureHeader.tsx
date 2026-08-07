"use client";

export function FeatureHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
  <div className="flex justify-center">
    <span className="inline-flex rounded-full bg-[#343C67]/10 px-4 py-2 text-sm font-semibold text-[#343C67]">
      Features
    </span>
  </div>

  <h2 className="mt-8 text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
    Semua Yang Anda Butuhkan
    <br />
    Dalam Satu Platform.
  </h2>

  <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
    IndoPOS membantu Anda mengelola kasir, inventory, pelanggan, pembukuan,
    laporan bisnis hingga multi outlet dengan pengalaman yang cepat, modern,
    dan mudah digunakan.
  </p>
</div>
  );
}