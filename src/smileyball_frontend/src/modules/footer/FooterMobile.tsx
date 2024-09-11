import { Logo } from "@/components";

export const FooterMobile = () => {
  return (
    <div className="laptop:hidden mb-2 mt-10 flex w-full flex-col items-center justify-center">
      <ul className="flex flex-col text-[33px] decoration-0">
        <li className="font-95 flex w-full font-sequel100Black italic text-white">
          OPENCHAT
        </li>
        <li className="font-95 flex w-full font-sequel100Black italic text-pink">
          TELEGRAM
        </li>
        <li className="font-95 flex w-full font-sequel100Black italic text-primary">
          TWITTER/X
        </li>
        <li className="font-95 flex w-full font-sequel100Black italic text-blue">
          DISCORD
        </li>
      </ul>
      <ul className="my-3 flex w-full flex-col items-center justify-center gap-2 text-[33px]">
        <li className="font-spaceMono flex text-white">GITHUB</li>
        <li className="font-spaceMono flex text-white">ABOUT CREATORS</li>
      </ul>
      <div className="my-3 flex">
        <Logo />
      </div>
      <span className="font-spaceMono flex text-primary">
        Smileyball, Warsaw, 2024
      </span>
    </div>
  );
};
