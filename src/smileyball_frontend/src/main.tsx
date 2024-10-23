import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StrictModeWrapper } from "@/lib/components";
import { AuthProvider } from "@/lib/hooks";
import { router } from "@/lib/routing";
import "@/lib/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictModeWrapper>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictModeWrapper>,
);
