import { ContestData } from "declarations/smileyball_backend/smileyball_backend.did";
import { ContestRecord, useGetAllContests } from "../hooks/useGetAllContests";
import { ContestListItem } from "./ContestListItem";

export const ContestsList = () => {
  const { contests, deleteContest } = useGetAllContests();

  return (
    <div className="ml-10 font-spaceMono">
      <h3 className="mt-6 font-bold">CONTEST WAITING FOR LOBBY</h3>
      <div className="flex w-full flex-col">
        {contests?.map((contestItem) => {
          const id: string | null = contestItem
            ? Object.keys(contestItem as ContestRecord)[0]
            : null;

          const { ...contestResults }: ContestData | null = contestItem
            ? Object.values(contestItem as ContestRecord)[0]
            : null;

          if (!id) {
            return null;
          }

          return (
            <ContestListItem
              handleDeleteContest={deleteContest}
              id={id}
              contestResults={contestResults}
            />
          );
        })}
      </div>
    </div>
  );
};
