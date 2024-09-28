import { Logo, MarqueeBar } from "@/components";

export const TopBarDesktop = () => {
  return (
    <section className="laptop:flex mb-2 hidden w-full justify-center gap-10">
      <MarqueeBar marqueeText="test" label="testowy label" />
      <Logo />
      <MarqueeBar position="right" marqueeText="test" label="test" />
    </section>
  );
};
