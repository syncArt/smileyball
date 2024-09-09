import { ContentBox } from "./components/ContentBox";
import { TopBar } from "./components/TopBar";
import { NavBar } from "./components/NavBar";
import { BackgroundShapes } from "./components/BackgroundShapes";

function App() {
  return (
    <main className="flex w-full my-3 justify-center">
      <BackgroundShapes />
      <div className="align-center flex w-full max-w-[1200px] flex-col justify-center">
        <TopBar />
        <NavBar />
        <ContentBox />
      </div>
    </main>
  );
}

export default App;
