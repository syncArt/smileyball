import { useState } from "react";
import { useLastContestResults } from "@/hooks";

export const ContestsList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { lastContestResults } = useLastContestResults();

  console.log(lastContestResults);

  const toggleVisibility = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <div className="ml-10 font-spaceMono">
      <h3 className="font- mt-6 font-bold">CONTEST WAITING FOR LOBBY</h3>
      <div onClick={toggleVisibility} className="cursor-pointer">
        <p className="ml-6 inline-block font-bold">
          Contest #
          {lastContestResults ? lastContestResults.contest_title : "Loading..."}
        </p>
        <p className="ml-1 inline-block font-bold">
          {" "}
          -{" "}
          {lastContestResults
            ? lastContestResults.contest_description
            : "Loading..."}
        </p>
      </div>

      <div
        className={`transform transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"} ${isVisible ? "visible" : "invisible"}`}
      >
        <p className="ml-10">
          Some description to a contest for people and for jury to let them know
          what is the subject of assesment
        </p>
        <button className="ml-10 mt-2 font-bold hover:text-slate-300">
          DELETE
        </button>
        <button className="ml-6 mt-2 font-bold hover:text-slate-300">
          APPROVE
        </button>
      </div>
    </div>
  );
};
