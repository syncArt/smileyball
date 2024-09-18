import LoginIcon from "@/assets/images/login-icon.svg";
import SmileyballLogoText from "@/assets/images/smileyball.svg";
import { useNavBarData } from "@/hooks/useNavBarData";

type NavBarMobileMenuItemProps = {
  text: string;
  link: string;
};

const NavBarDesktopMenuItem = ({ text, link }: NavBarMobileMenuItemProps) => (
  <a
    href={link}
    className="cursor-pointer font-bold uppercase text-[#2ef867] no-underline"
  >
    {text}
  </a>
);

export const NavBarDesktop = () => {
  const navBarData = useNavBarData();

  return (
    <nav className="relative mb-2 hidden h-[50px] w-full items-center justify-between text-[18px] laptop:flex">
      <div className="ml-[20px] flex gap-[20px] font-spaceMono font-bold italic">
        {navBarData.map((item) => (
          <NavBarDesktopMenuItem
            key={`navbar-deskotp-${item.name}`}
            text={item.name}
            link={item.link}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute flex w-full justify-center">
        <SmileyballLogoText />
      </div>
      <div className="mr-[20px] flex justify-end font-spaceMono font-bold italic">
        <a
          href="#"
          className="flex h-full cursor-pointer items-center text-white no-underline"
        >
          <p className="pr-3">LOGIN</p>
          <LoginIcon />
        </a>
      </div>
    </nav>
  );
};
