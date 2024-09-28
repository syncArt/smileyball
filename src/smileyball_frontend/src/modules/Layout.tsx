import { TopBar, NavBar, Footer } from "@/modules";
import { Outlet } from "react-router-dom";
import { ErrorFallbackPage } from "@/pages/error";
import { ErrorBoundary } from "react-error-boundary";

export const Layout = () => {
  return (
    <main className="flex w-full justify-center">
      {/*<BackgroundShapes /> //TODO: need UX/UI consultations*/}
      <div className="align-center mt-3 flex w-full max-w-[1200px] flex-col justify-center">
        <TopBar />
        <NavBar />
        <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
          <Outlet />
        </ErrorBoundary>
        <span id="separator" className="h-[600px] laptop:h-[300px]" />
        <Footer />
      </div>
    </main>
  );
};
