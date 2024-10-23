import ListenArrow from "@/assets/images/listen-arrow.svg";
import { ProgressBar } from "@/lib/components";
import { ContentBox } from "@/lib/layout/ContentBox";

export type TopSongProps = {
  songTitle?: string;
  bandTitle?: string;
  ratingScore?: number;
  boxName: string;
  listenRedirectLink: string;
  ratingTitle: string;
  isLoading: boolean;
};

export const TopSong = ({
  songTitle,
  bandTitle,
  boxName,
  listenRedirectLink,
  ratingTitle,
  isLoading,
  ratingScore,
}: TopSongProps) => {
  if (isLoading) {
    return (
      <ContentBox>
        <section className="relative flex max-h-[200px] w-full animate-pulse">
          <div className="relative z-[2] flex w-[calc(100%-50px)] flex-col justify-start gap-1 rounded-medium border-4 border-white bg-grey p-[30px]">
            <div className="h-8 w-1/3 rounded bg-slate-700"></div>
            {/* Placeholder for boxName */}
            <div className="h-8 w-1/2 rounded bg-slate-700"></div>
            {/* Placeholder for bandTitle */}
            <div className="h-6 w-2/3 rounded bg-slate-700"></div>
            {/* Placeholder for songTitle */}
            <div className="mt-2 flex w-full">
              <div className="h-4 w-full rounded bg-slate-700"></div>
              {/* Placeholder for ProgressBar */}
            </div>
          </div>
          <div className="absolute flex h-full w-full items-center justify-end rounded-[22px] bg-secondary">
            <div className="-mr-[20px] flex h-[40px] rotate-[270deg] items-center">
              <div className="align-center mr-[8px] flex justify-center font-sequel100Black text-[18px] font-95 italic">
                <div className="h-4 w-16 rounded bg-slate-700"></div>
                {/* Placeholder for 'Listen' button */}
                <div className="ml-2 flex">
                  <div className="h-4 w-4 rounded-full bg-slate-700"></div>
                  {/* Placeholder for ListenArrow */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ContentBox>
    );
  }

  return (
    <ContentBox>
      <section className="relative flex max-h-[200px] w-full">
        <div className="relative z-[2] flex w-[calc(100%-50px)] flex-col justify-start gap-1 rounded-medium border-4 border-white bg-grey p-[30px]">
          <div className="flex font-sequel100Black text-[33px] font-95 uppercase italic leading-[33px] text-secondary">
            {boxName}
          </div>
          <div className="flex font-spaceMono text-[33px] font-bold uppercase italic leading-[30px] text-white">
            {bandTitle}
          </div>
          <div className="flex font-spaceMono text-[26px] font-normal uppercase italic leading-[30px] text-white">
            {songTitle}
          </div>
          <div className="flex w-full">
            <ProgressBar progress={ratingScore} />
          </div>
        </div>
        <div className="absolute flex h-full w-full items-center justify-end rounded-[22px] bg-secondary">
          <div className="-mr-[40px] flex h-[40px] rotate-[270deg] items-center">
            <a href={listenRedirectLink}>
              <div className="align-center mr-[8px] flex justify-center font-sequel100Black text-[18px] font-95 italic">
                Listen
                <div className="ml-2 flex">
                  <ListenArrow />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </ContentBox>
  );
};
