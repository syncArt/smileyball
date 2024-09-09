import BottomDecoration from "../assets/images/bottom-decoration.svg";
import { TopSong } from "./TopSong";

export const ContentBox = () => {
  return (
    <div className="rounded-t-medium relative z-[2] flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-primary">
      <div className="relative top-[4px] flex h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-t-[18px] bg-primary">
        <div className="flex h-full w-full p-[22px]">
          <TopSong />
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full translate-y-full self-end">
        <BottomDecoration />
      </div>
    </div>
  );
};
