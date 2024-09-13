import { TopSong } from "@/modules";
import { useLastContestResults } from "@/hooks";

export const HeroPage = () => {
  const { lastContestResults, isLoading } = useLastContestResults();

  return (
    <>
      <TopSong
        boxName="best song!"
        ratingTitle="popularity"
        isLoading={isLoading}
        ratingScore={lastContestResults?.ratingScore}
        songTitle={lastContestResults?.songTitle}
        bandTitle={lastContestResults?.bandTitle}
        listenRedirectLink={`/${lastContestResults?.contestId}`}
      />
    </>
  );
};
