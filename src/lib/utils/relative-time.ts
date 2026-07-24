export function relativeTime(
  date: string | Date
) {
  const target =
    typeof date === "string"
      ? new Date(date)
      : date;

  const now = new Date();

  const diff =
    now.getTime() -
    target.getTime();

  const seconds = Math.floor(
    diff / 1000
  );

  if (seconds < 60)
    return "Baru saja";

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60)
    return `${minutes} menit lalu`;

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24)
    return `${hours} jam lalu`;

  const days = Math.floor(
    hours / 24
  );

  if (days < 7)
    return `${days} hari lalu`;

  return target.toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}