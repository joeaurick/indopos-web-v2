import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <div className="text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
            📧
          </div>

          <h1 className="text-3xl font-bold">
            Cek Email Anda
          </h1>

          <p className="mt-4 text-slate-500">
            Kami telah mengirim email verifikasi.
            Silakan buka email Anda lalu klik tombol
            <strong> Verifikasi Email</strong>.
          </p>

          <Link
            href="/login"
            className="
              mt-8
              inline-flex
              h-12
              items-center
              justify-center
              rounded-2xl
              bg-[var(--primary)]
              px-8
              font-semibold
              text-white
            "
          >
            Kembali ke Login
          </Link>

        </div>

      </div>
    </main>
  );
}