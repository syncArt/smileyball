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
        <ContentBox className="min-h-screen">
          <Outlet />
        </ContentBox>
        <span id="separator" className="laptop:h-[300px] h-[600px]" />
        <Footer />
      </div>
    </main>
  );
};
