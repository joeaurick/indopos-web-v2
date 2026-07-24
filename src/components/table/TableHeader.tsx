import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
};

export function TableHeader({
  title,
  description,
  icon,
  actions,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        gap-5
        border-b
        border-[var(--border)]
        p-6

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[var(--hover)]
              text-[var(--primary)]
            "
          >
            {icon}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions}
    </div>
  );
}