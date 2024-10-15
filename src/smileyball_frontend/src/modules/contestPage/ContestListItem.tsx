import { useState } from "react";
import { ContestData } from "declarations/smileyball_backend/smileyball_backend.did";

export type ContestListItemProps = {
  handleDeleteContest: (id: string) => void;
  id: string;
  contestResults: ContestData;
};

export const ContestListItem = ({
  handleDeleteContest,
  id,
  contestResults,
}: ContestListItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  let parsedId = id.toString()
  return (
    <div className="flex w-full flex-col">
      <div onClick={toggleVisibility} className="cursor-pointer">
        <p className="ml-6 inline-block font-bold">
          Contest #{parsedId.split('', 5)}
        </p>
        <p className="ml-1 inline-block font-bold">
          {contestResults?.contest_title ? contestResults.contest_title : ""}
        </p>
      </div>

      <div
        className={`transform transition-opacity duration-500 ease-in-out ${isVisible ? "visible h-full opacity-100" : "invisible h-0 opacity-0"}`}
      >
        <p className="ml-10">
          {contestResults?.contest_description
            ? contestResults.contest_description
            : ""}
        </p>
        <button
          className="ml-10 mt-2 font-bold hover:text-slate-300"
          onClick={() => handleDeleteContest(id)}
        >
          DELETE
        </button>
        <button className="ml-6 mt-2 font-bold hover:text-slate-300">
          APPROVE
        </button>
      </div>
    </div>
  );
};
