import {
  mockSingleSongApiResponse,
  mockContestApiResponse,
  fetchMock,
} from "./data-mocks";
import { useEffect, useState } from "react";

type LastContestResultType = {
  songTitle: string;
  bandTitle: string;
  ratingScore: number;
  contestId: string;
};

export const useLastContestResults = () => {
  const [lastContestResults, setLastContestResults] =
    useState<LastContestResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //request for latest contest results and fetch top1 song details
    fetchMock(mockContestApiResponse).then((contestData) => {
      fetchMock(mockSingleSongApiResponse).then((topSongDetails) => {
        setLastContestResults({
          songTitle: topSongDetails.song_name,
          bandTitle: topSongDetails.band_name,
          ratingScore: contestData.total_votes,
          contestId: contestData.contest_id,
        });
        setIsLoading(false);
      });
    });
  }, []);

  return { lastContestResults, isLoading };
};
