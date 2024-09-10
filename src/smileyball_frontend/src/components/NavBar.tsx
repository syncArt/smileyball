import LoginIcon from "@/assets/images/login-icon.svg";
import SmileyballText from "@/assets/images/smileyball.svg";

export const NavBar = () => {
  return (
    <div className="relative mb-2 flex h-[50px] w-full items-center justify-between text-[18px]">
      <div className="font-spaceMono ml-[20px] flex gap-[20px] font-bold italic">
        <a
          href="#"
          className="cursor-pointer font-bold text-[#2ef867] no-underline"
        >
          TOP LIST
        </a>
        <a
          href="#"
          className="cursor-pointer font-bold text-[#2ef867] no-underline"
        >
          REQUEST
        </a>
        <a
          href="#"
          className="cursor-pointer font-bold text-[#2ef867] no-underline"
        >
          VOTE
        </a>
      </div>
      <div className="absolute pointer-events-none flex w-full justify-center">
        <SmileyballText />
      </div>
      <div className="font-spaceMono mr-[20px] flex justify-end font-bold italic">
        <a
          href="#"
          className="flex h-full cursor-pointer items-center text-white no-underline"
        >
          <p className="pr-3">LOGIN</p>
          <LoginIcon />
        </a>
      </div>
    </div>
  );
};
