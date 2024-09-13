import HamburgerMenu from "@/assets/images/hamburger-menu.svg";
import HamburgerMenuArrow from "@/assets/images/hamburger-menu-arrow.svg";
import LoginIcon from "@/assets/images/login-icon.svg";
import { useState } from "react";
import { useNavBarData } from "@/hooks/useNavBarData";

type NavBarMobileMenuItemProps = {
  text: string;
  link: string;
};

const NavBarMobileMenuItem = ({ text, link }: NavBarMobileMenuItemProps) => (
  <li className="flex flex-nowrap items-center uppercase">
    <HamburgerMenuArrow className="mr-2 flex" />
    <a className="flex font-spaceMono text-white" href={link}>
      {text}
    </a>
  </li>
);

export const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navBarData = useNavBarData();

  return (
    <div className="left-0 top-0 flex w-full laptop:hidden">
      <HamburgerMenu
        className={`${isOpen ? "animate-rotate90" : "animate-rotateBack"} absolute right-4 top-12 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <nav
        className={`${isOpen ? "animate-fullMenuHeight" : "animate-zeroMenuHeight"} flex w-full`}
      >
        <ul className="flex w-full flex-col gap-4">
          {navBarData.map((item) => (
            <NavBarMobileMenuItem
              key={`navbar-mobile-${item.name}`}
              link={item.link}
              text={item.name}
            />
          ))}

          <li className="flex w-full items-center justify-end pr-8">
            <a
              className="flex w-full items-center justify-end font-spaceMono text-white"
              href="#"
            >
              LOGIN
              <LoginIcon className="ml-2 flex" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
