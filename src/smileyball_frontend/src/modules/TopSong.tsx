import ListenArrow from "@/assets/images/listen-arrow.svg";
import { ProgressBar } from "@/components";

export const TopSong = () => {
  const songTitle = "SONG TITLE";
  const bandTitle = "BAND TITLE";
  const boxName = "BEST NEW !";

  return (
    <section className="relative flex w-full max-h-[200px]">
      <div className="bg-grey rounded-medium relative z-[2] flex w-[calc(100%-50px)] flex-col justify-start gap-1 border-4 border-white p-[30px]">
        <div className="font-95 flex font-sequel100Black text-[33px] italic leading-[33px] text-secondary">
          {boxName}
        </div>
        <div className="font-spaceMono flex text-[33px] font-bold italic leading-[30px] text-white">
          {bandTitle}
        </div>
        <div className="font-spaceMono flex text-[26px] font-normal italic leading-[30px] text-white">
          {songTitle}
        </div>
        <div className="flex w-full">
          <ProgressBar progress={100} />
        </div>
      </div>
      <div className="absolute flex h-full w-full items-center justify-end rounded-[22px] bg-secondary">
        <div className="-mr-[40px] flex h-[40px] rotate-[270deg] items-center">
          <div className="font-95 align-center mr-[8px] flex justify-center font-sequel100Black text-[18px] italic">
            Listen
            <div className="ml-2 flex">
              <ListenArrow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
