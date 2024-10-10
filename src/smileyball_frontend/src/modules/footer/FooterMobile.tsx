import { Logo } from "@/components";

export const FooterMobile = () => {
  return (
    <div className="mb-2 mt-10 flex w-full flex-col items-center justify-center laptop:hidden">
      <ul className="flex flex-col text-[33px] decoration-0">
        <li className="flex w-full font-sequel100Black font-95 italic text-white">
          OPENCHAT
        </li>
        <li className="flex w-full font-sequel100Black font-95 italic text-pink">
          TELEGRAM
        </li>
        <li className="flex w-full font-sequel100Black font-95 italic text-primary">
          TWITTER/X
        </li>
        <li className="flex w-full font-sequel100Black font-95 italic text-blue">
          DISCORD
        </li>
      </ul>
      <ul className="my-3 flex w-full flex-col items-center justify-center gap-2 text-[33px]">
        <li className="flex font-spaceMono text-white">GITHUB</li>
        <li className="flex font-spaceMono text-white">ABOUT CREATORS</li>
      </ul>
      <div className="my-3 flex">
        <Logo />
      </div>
      <span className="flex font-spaceMono text-primary">
        Smileyball, Warsaw, 2024
      </span>
    </div>
  );
};
