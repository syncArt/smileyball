import { BackgroundShapes, ContentBox } from "@/components";
import { TopBar, NavBar, Footer } from "@/modules";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main className="flex w-full justify-center">
      {/*<BackgroundShapes /> //TODO: need UX/UI consultations*/}
      <div className="align-center mt-3 flex w-full max-w-[1200px] flex-col justify-center">
        <TopBar />
        <NavBar />
        <Outlet />
        <span id="separator" className="h-[600px] laptop:h-[300px]" />
        <Footer />
      </div>
    </main>
  );
};
