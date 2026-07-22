import { LoginBackground } from "../components/LoginBackground";
import { RegisterForm } from "../components/RegisterForm";
import { LoginHero } from "../components/LoginHero";

export function RegisterPage() {
  return (
    <LoginBackground>
      <div
        className="
          relative
          w-full
          max-w-6xl
          overflow-hidden

          bg-white

          lg:grid
          lg:grid-cols-2

          lg:rounded-[36px]
          lg:border
          lg:border-white/50
          lg:bg-white/70
          lg:shadow-2xl
          lg:backdrop-blur-xl
        "
      >
        <LoginHero />

        <RegisterForm />
      </div>
    </LoginBackground>
  );
}