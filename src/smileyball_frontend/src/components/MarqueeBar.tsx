import Marquee from "react-fast-marquee";

type MarqueeBarProps = {
  marqueeText: string;
  label: string;
  position?: "left" | "right";
};

export const MarqueeBar = ({
  marqueeText,
  label,
  position = "left",
}: MarqueeBarProps) => {
  if (position === "left") {
    return (
      <div className="rounded-medium w-marqueeWidth relative flex h-[24px] flex-shrink self-center overflow-hidden bg-gradient-to-r from-marqueeLeftStart to-marqueeLeftEnd">
        <div className="via-marqueeLeftMiddle mr-marqueeLabelWidth pointer-events-none absolute right-1 top-0 z-[3] h-full w-[60px] bg-gradient-to-l from-transparent via-5% to-transparent" />
        <div className="absolute -left-[2px] top-0 z-[3] h-full w-[60px] bg-gradient-to-l from-transparent via-marqueeLeftStart via-95% to-transparent" />
        <div className="font-spaceMono relative mt-[1px] flex h-full min-w-10 shrink grow items-center text-[14px] italic text-white">
          <Marquee autoFill direction="left">
            {marqueeText}
          </Marquee>
        </div>
        <div className="font-95 via-marqueeLeftMiddle min-w-marqueeLabelMinWidth relative right-0 ml-2 flex h-full shrink-0 grow flex-nowrap items-center justify-end overflow-hidden whitespace-nowrap font-sequel100Black text-[8px] uppercase italic text-white">
          <p className="align-center relative mr-4 mt-[2px] flex justify-end">
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-medium w-marqueeWidth relative flex h-[24px] flex-shrink flex-row-reverse self-center overflow-hidden bg-gradient-to-r from-marqueeRightStart to-marqueeRightEnd">
      <div className="via-marqueeRightMiddle ml-marqueeLabelWidth pointer-events-none absolute left-1 top-0 z-[3] h-full w-[60px] bg-gradient-to-l from-transparent via-95% to-transparent" />
      <div className="absolute -right-[2px] top-0 z-[3] h-full w-[60px] bg-gradient-to-l from-transparent via-marqueeRightEnd via-5% to-transparent" />
      <div className="font-spaceMono relative mt-[1px] flex h-full min-w-10 shrink grow items-center text-[14px] italic text-white">
        <Marquee autoFill direction="right">
          {marqueeText}
        </Marquee>
      </div>
      <div className="font-95 min-w-marqueeLabelMinWidth w-marqueeLabelWidth relative left-0 ml-2 flex h-full flex-nowrap items-center justify-start overflow-hidden whitespace-nowrap font-sequel100Black text-[8px] uppercase italic text-white">
        <p className="align-center ml-4 mt-[2px] flex">{label}</p>
      </div>
    </div>
  );
};
