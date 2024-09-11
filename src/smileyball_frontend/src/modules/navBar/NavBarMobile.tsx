import HamburgerMenu from "@/assets/images/hamburger-menu.svg";
import HamburgerMenuArrow from "@/assets/images/hamburger-menu-arrow.svg";
import LoginIcon from "@/assets/images/login-icon.svg";
import { useState } from "react";

type NavBarMobileMenuItemProps = {
  text: string;
  link: string;
};

const NavBarMobileMenuItem = ({ text, link }: NavBarMobileMenuItemProps) => (
  <li className="flex flex-nowrap items-center">
    <HamburgerMenuArrow className="mr-2 flex" />
    <a className="font-spaceMono flex text-white" href={link}>
      {text}
    </a>
  </li>
);

export const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="laptop:hidden left-0 top-0 flex w-full">
      <HamburgerMenu
        className={`${isOpen ? "animate-rotate90" : "animate-rotateBack"} absolute right-4 top-12 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <nav
        className={`${isOpen ? "animate-fullMenuHeight" : "animate-zeroMenuHeight"} flex w-full`}
      >
        <ul className="flex w-full flex-col gap-4">
          <NavBarMobileMenuItem link="#" text="Home" />
          <NavBarMobileMenuItem link="#" text="Current contest" />
          <NavBarMobileMenuItem link="#" text="Last winners" />
          <NavBarMobileMenuItem link="#" text="About" />

          <li className="flex w-full items-center justify-end pr-8">
            <a
              className="font-spaceMono flex w-full items-center justify-end text-white"
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
