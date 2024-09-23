import { ContentBox, ProgressBar } from "@/components";
import { useLastContestResults } from "@/hooks";

export const CreateContestPage = () => {

  const { lastContestResults } = useLastContestResults();

  return (
    <ContentBox>
      <div className="flex flex-col">
        <h1 className="font-sequel100Black text-[24px] ">ADD CONTEST</h1>
        <h2 className="text-[24px] font-120 italic text-grey text-bold">FILL THE FORM AND CREATE NEW CONTEST</h2>
        <div className="font-spaceMono ml-10">
          <h3 className="font- mt-6  font-bold">CONTEST WAITING FOR LOBBY</h3>

          <p className="ml-6 inline-block font-bold" >Contest #{lastContestResults ? lastContestResults.contestId : 'Loading...'}</p>
          <p className="inline-block font-bold">- {lastContestResults ? lastContestResults.contestDesc : 'Loading...'}</p>
          <p className="ml-10">Some description to a contest for people and for jury to let them know what is the subject of assesment</p>

          <button className="ml-10 mt-2 font-bold hover:text-slate-300">DELETE</button>
          <button className="ml-6 mt-2 font-bold hover:text-slate-300">APPROVE</button>

          <button className="flex mt-2 font-bold">ADD NEW CONTEST</button>

          <input className="mt-4 p-1 w-80 text-black bg-mattGreen border rounded-lg border-black placeholder-black" placeholder="CONTEST_TITLE:_" />
          <input className="flex mt-4 px-1 w-80 h-40 text-black bg-mattGreen border rounded-lg border-black placeholder: text-start placeholder-black" placeholder="CONTEST_DESCRIPTION:_" />
          <input className="flex mt-4 p-1 w-80 text-black bg-mattGreen border rounded-lg border-black placeholder: text-start placeholder-black" placeholder="PRICE_POOL_INIT:_" />

          <button className="mt-2 flex text-[20px] font-95 uppercase font-bold hover:text-slate-300">ADD NEW CONTEST</button>
        </div>
      </div>
    </ContentBox >
  );
};
