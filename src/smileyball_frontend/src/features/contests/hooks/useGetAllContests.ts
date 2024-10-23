import { useEffect, useState } from "react";
import { smileyball_backend } from "declarations/smileyball_backend";
import { ContestData } from "declarations/smileyball_backend/smileyball_backend.did";

export type ContestRecord = Record<number, ContestData>;

export const useGetAllContests = () => {
  const [contests, setContests] = useState<ContestRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getContests = async () => {
    setIsLoading(true);
    await smileyball_backend.contest_get_get_contest().then((res) => {
      if ("Ok" in res) {
        const data = res.Ok;
        const parsedData = data.map((el) => ({ [el[0].toString()]: el[1] }));
        setContests(parsedData);
      } else {
        console.error("Error:", res.Err);
      }
      setIsLoading(false);
    });
  };

  const deleteContest = (id: string) => {
    setIsLoading(true);
    smileyball_backend.contest_update_remove_contest(BigInt(id)).then(() => {
      getContests();
    });
  };

  useEffect(() => {
    getContests();
  }, []);

  return { contests, deleteContest, isLoading };
};
