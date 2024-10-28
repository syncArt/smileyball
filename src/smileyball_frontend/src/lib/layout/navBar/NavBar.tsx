import { NavBarDesktop } from "@/lib/layout/navBar/NavBarDesktop";
import { NavBarMobile } from "@/lib/layout/navBar/NavBarMobile";
import { useNavBarData } from "@/lib/hooks/useNavBarData";

export const NavBar = () => {
  const navbarData = useNavBarData();

  return (
    <>
      <NavBarDesktop navbarData={navbarData} />
      <NavBarMobile navbarData={navbarData} />
    </>
  );
};
