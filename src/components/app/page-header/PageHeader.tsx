import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  action,
}: Props) {
  const greeting = (() => {
    const hour = new Date().getHours();

    if (hour < 11) return "Selamat Pagi 👋";
    if (hour < 15) return "Selamat Siang ☀️";
    if (hour < 18) return "Selamat Sore 🌤️";

    return "Selamat Malam 🌙";
  })();

  const today = new Date().toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div
      className="
        mb-8

        flex
        flex-col
        gap-5

        rounded-3xl

        border
        border-slate-200

        bg-white

        p-6

        shadow-sm

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>

        <p
          className="
            text-sm
            font-medium

            text-[#343C67]
          "
        >
          {greeting}
        </p>

        <h1
          className="
            mt-1

            text-3xl
            font-bold

            text-slate-900
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-2

            text-sm

            text-slate-500
          "
        >
          {subtitle ?? today}
        </p>

      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}