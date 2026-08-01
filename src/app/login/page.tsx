import { LoginBackground } from "@/features/auth/components/LoginBackground";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginHero } from "@/features/auth/components/LoginHero";

export default function LoginPage() {
  return (
    <LoginBackground>
      <div
        className="
          relative
          w-full
          max-w-7xl

          overflow-hidden

          bg-white

          lg:grid
          lg:grid-cols-[1.1fr_.9fr]

          lg:rounded-[36px]
          lg:border
          lg:border-white/40
          lg:bg-white/70
          lg:shadow-[0_30px_80px_rgba(15,23,42,.12)]
          lg:backdrop-blur-xl
        "
      >
        {/* Hero hanya Desktop */}

        <div className="hidden lg:block">
          <LoginHero />
        </div>

        {/* Form */}

        <LoginForm />
      </div>
    </LoginBackground>
  );
}