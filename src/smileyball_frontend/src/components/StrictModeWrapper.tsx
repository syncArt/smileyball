import { ReactNode, StrictMode } from "react";

export const StrictModeWrapper = ({ children }: { children: ReactNode }) => {
  const currentPath = window.location.pathname;

  if (currentPath === "/callback") {
    return <>{children}</>;
  }

  return <StrictMode>{children}</StrictMode>;
};
