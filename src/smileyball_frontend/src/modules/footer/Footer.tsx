import { FooterMobile } from "./FooterMobile";
import { FooterDesktop } from "./FooterDesktop";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex w-full max-w-[1200px]">
      <FooterDesktop />
      <FooterMobile />
    </footer>
  );
};
