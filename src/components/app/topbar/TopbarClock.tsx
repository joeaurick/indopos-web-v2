"use client";

import { useEffect, useState } from "react";

export function TopbarClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200/80
        bg-white
        px-6
        py-3
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-teal-200
        hover:shadow-xl
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-teal-500/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-teal-500/20
        "
      />

      <div className="relative flex items-center gap-4">

        {/* Live */}


        {/* Time */}

        <div
          className="
            font-mono
            text-[34px]
            font-bold
            tracking-[0.15em]
            text-slate-900
            transition-all
            duration-300
            group-hover:text-teal-700
          "
        >
          {time}
        </div>

      </div>
    </div>
  );
}