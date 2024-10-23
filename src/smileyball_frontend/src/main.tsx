import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StrictModeWrapper } from "@/components";
import { AuthProvider } from "@/hooks";
import { router } from "./router";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictModeWrapper>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictModeWrapper>,
);
