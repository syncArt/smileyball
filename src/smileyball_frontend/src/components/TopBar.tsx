import { Logo } from "./Logo";
import { MarqueeBar } from "./MarqueeBar";

export const TopBar = () => {
  return (
    <div className="flex w-full mb-2 justify-center gap-10">
      <MarqueeBar marqueeText="test" label="testowy label" />
      <Logo />
      <MarqueeBar position="right" marqueeText="test" label="test" />
    </div>
  );
};
