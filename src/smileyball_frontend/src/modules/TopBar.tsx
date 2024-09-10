import { Logo } from "@/components";
import { MarqueeBar } from "@/modules";

export const TopBar = () => {
  return (
    <div className="mb-2 flex w-full justify-center gap-10">
      <MarqueeBar marqueeText="test" label="testowy label" />
      <Logo />
      <MarqueeBar position="right" marqueeText="test" label="test" />
    </div>
  );
};
