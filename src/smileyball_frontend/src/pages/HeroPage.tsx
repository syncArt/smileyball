import { TopSong } from "@/modules";
import { useLastContest } from "@/hooks";

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
