import { Logo, MarqueeBar } from "@/components";

export const TopBarDesktop = () => {
  return (
    <section className="mb-2 hidden w-full justify-center gap-10 laptop:flex">
      <MarqueeBar marqueeText="test" label="testowy label" />
      <Logo />
      <MarqueeBar position="right" marqueeText="test" label="test" />
    </section>
  );
};
