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
      <div className="relative flex h-[24px] w-marqueeWidth flex-shrink self-center overflow-hidden rounded-medium bg-gradient-to-r from-marqueeLeftStart to-marqueeLeftEnd">
        <div className="pointer-events-none absolute right-1 top-0 z-[3] mr-marqueeLabelWidth h-full w-[60px] bg-gradient-to-l from-transparent via-marqueeLeftMiddle via-5% to-transparent" />
        <div className="absolute -left-[2px] top-0 z-[3] h-full w-[60px] bg-gradient-to-l from-transparent via-marqueeLeftStart via-95% to-transparent" />
        <div className="relative mt-[1px] flex h-full min-w-10 shrink grow items-center font-spaceMono text-[14px] italic text-white">
          <Marquee autoFill direction="left">
            {marqueeText}
          </Marquee>
        </div>
        <div className="relative right-0 ml-2 flex h-full min-w-marqueeLabelMinWidth shrink-0 grow flex-nowrap items-center justify-end overflow-hidden whitespace-nowrap via-marqueeLeftMiddle font-sequel100Black text-[8px] font-95 uppercase italic text-white">
          <p className="align-center relative mr-4 mt-[2px] flex justify-end">
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[24px] w-marqueeWidth flex-shrink flex-row-reverse self-center overflow-hidden rounded-medium bg-gradient-to-r from-marqueeRightStart to-marqueeRightEnd">
      <div className="pointer-events-none absolute left-1 top-0 z-[3] ml-marqueeLabelWidth h-full w-[60px] bg-gradient-to-l from-transparent via-marqueeRightMiddle via-95% to-transparent" />
      <div className="absolute -right-[2px] top-0 z-[3] h-full w-[60px] bg-gradient-to-l from-transparent via-marqueeRightEnd via-5% to-transparent" />
      <div className="relative mt-[1px] flex h-full min-w-10 shrink grow items-center font-spaceMono text-[14px] italic text-white">
        <Marquee autoFill direction="right">
          {marqueeText}
        </Marquee>
      </div>
      <div className="relative left-0 ml-2 flex h-full w-marqueeLabelWidth min-w-marqueeLabelMinWidth flex-nowrap items-center justify-start overflow-hidden whitespace-nowrap font-sequel100Black text-[8px] font-95 uppercase italic text-white">
        <p className="align-center ml-4 mt-[2px] flex">{label}</p>
      </div>
    </div>
  );
};
