import { TopBarMobile } from "@/modules/topBar/TopBarMobile";
import { TopBarDesktop } from "@/modules";

export const TopBar = () => {
  return (
    <>
      <TopBarMobile />
      <TopBarDesktop />
    </>
  );
};
