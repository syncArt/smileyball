import { useEffect, useState } from "react";
import { smileyball_backend } from "declarations/smileyball_backend";
import { ContestData } from "declarations/smileyball_backend/smileyball_backend.did";

export const useLastContestResults = () => {
  const [lastContestResults, setLastContestResults] =
    useState<ContestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getContests = async () => {
    setIsLoading(true);
    await smileyball_backend.get_contests().then((res) => {
      console.log("res", res);
      if ("Ok" in res) {
        const data = res.Ok[0];
        setLastContestResults(data[1]);
      } else {
        console.error("Error:", res);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getContests();
  }, []);

  return { lastContestResults, isLoading };
};
