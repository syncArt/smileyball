import LoginIcon from "@/assets/images/login-icon.svg";
import SmileyballLogoText from "@/assets/images/smileyball.svg";
import { useNavBarData } from "@/hooks/useNavBarData";
import Pencil from "@/assets/images/pencil.svg";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";

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
  const [nickname, setNickname] = useState("");

  const navBarData = useNavBarData();
  const { isAuthenticated, login, logout } = useAuth();

  const handleLoginLogout = () => {
    isAuthenticated ? logout() : login();
  };

  const handleUserData = async () => {
    // await user_identity.get_general_info_from_user().then((res) => {
    //   if ("Ok" in res) {
    //     setNickname(res.Ok.nickname);
    //   }
    // });
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleUserData();
    }
  }, [isAuthenticated]);

  return (
    <nav className="relative mb-2 mt-2 hidden w-full items-center justify-between text-[18px] laptop:flex">
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
        <div className="mx-2 flex h-full cursor-pointer flex-nowrap items-center text-white no-underline">
          <a
            className="flex"
            href="https://qmg3k-zyaaa-aaaan-qm24a-cai.icp0.io/"
          >
            <Pencil />
          </a>
          hey, {nickname || "unknown"}!
        </div>
        <button
          onClick={handleLoginLogout}
          className="flex h-full cursor-pointer items-center border-0 bg-transparent text-white"
        >
          <p className="pr-3">{isAuthenticated ? "LOGOUT" : "LOGIN"}</p>
          <LoginIcon />
        </button>
      </div>
    </nav>
  );
};
