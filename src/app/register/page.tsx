import { LoginBackground } from "@/features/auth/components/LoginBackground";
import { LoginHero } from "@/features/auth/components/LoginHero";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <LoginBackground>
      <div
        className="
          w-full
          max-w-6xl

          overflow-hidden

          rounded-none
          bg-white

          md:rounded-[36px]
          md:border
          md:border-white/50
          md:bg-white/70
          md:shadow-2xl

          lg:grid
          lg:grid-cols-2
        "
      >
        <LoginHero />

        <RegisterForm />
      </div>
    </LoginBackground>
  );
}