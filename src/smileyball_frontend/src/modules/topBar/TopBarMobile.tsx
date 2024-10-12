import { Logo } from "@/components";
import LogoText from "@/assets/images/smileyball.svg";

export const TopBarMobile = () => {
  return (
    <section className="m-5 flex items-center justify-start gap-10 laptop:hidden">
      <Logo />
      <LogoText />
    </section>
  );
};
