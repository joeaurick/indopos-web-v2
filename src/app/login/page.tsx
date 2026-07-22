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
          max-w-6xl

          lg:grid
          lg:grid-cols-2

          overflow-hidden

          bg-white

          lg:rounded-[36px]
          lg:border
          lg:border-white/50
          lg:bg-white/70
          lg:shadow-2xl
          lg:backdrop-blur-xl
        "
      >
        <LoginHero />
        <LoginForm />
      </div>
    </LoginBackground>
  );
}