import { useLastContest } from "@/features/contests/hooks";
import { TopSong } from "@/features/home/components/TopSong";

export const HeroPage = () => {
  const { lastContestResult, isLoading } = useLastContest();

  return (
    <>
      <TopSong
        boxName="best song!"
        ratingTitle="popularity"
        isLoading={isLoading}
        ratingScore={lastContestResult?.ratingScore}
        songTitle={lastContestResult?.songTitle}
        bandTitle={lastContestResult?.bandTitle}
        listenRedirectLink={`/${lastContestResult?.contestId}`}
      />
    </>
  );
};
