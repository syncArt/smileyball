import { Logo } from "@/components";
import LogoText from "@/assets/images/smileyball.svg";

export const TopBarMobile = () => {
  return (
    <section className="laptop:hidden m-5 flex justify-start items-center gap-10">
      <Logo />
      <LogoText />
    </section>
  );
};
