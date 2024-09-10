import { BackgroundShapes, ContentBox, NavBar } from "@/components";
import { TopBar } from "@/modules";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main className="flex w-full justify-center">
      {/*<BackgroundShapes /> //TODO: need UX/UI consultations*/}
      <div className="align-center flex w-full max-w-[1200px] flex-col justify-center">
        <TopBar />
        <NavBar />
        <ContentBox>
          <Outlet />
        </ContentBox>
      </div>
    </main>
  );
};
