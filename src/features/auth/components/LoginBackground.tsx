import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function LoginBackground({
  children,
}: Props) {
  return (
    <main
      className="
        relative

        min-h-screen
        w-full

        overflow-x-hidden

        bg-gradient-to-br
        from-slate-100
        via-white
        to-teal-50

        lg:flex
        lg:items-center
        lg:justify-center
        lg:p-8
      "
    >
      ...
      <div className="relative z-10 w-full lg:max-w-6xl">
        {children}
      </div>
    </main>
  );
}