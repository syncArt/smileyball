import { smileyball_backend } from "declarations/smileyball_backend";
import { ContestData } from "declarations/smileyball_backend/smileyball_backend.did";
import { ChangeEvent, useState } from "react";

export const CreateContestForm = () => {
  const [formData, setFormData] = useState<ContestData>({
    contest_songs: [],
    contest_description: "",
    contest_title: "",
  });

  const createContest = () => {
    smileyball_backend.create_contest(formData);
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input
        name="contest_title"
        className="bg-mattGreen mt-4 w-80 rounded-lg border border-black p-1 text-black placeholder-black"
        placeholder="CONTEST_TITLE:_"
        onChange={handleUpdate}
        value={formData.contest_title}
      />
      <input
        name="contest_description"
        className="bg-mattGreen placeholder: mt-4 flex h-40 w-80 rounded-lg border border-black px-1 text-start text-black placeholder-black"
        placeholder="CONTEST_DESCRIPTION:_"
        onChange={handleUpdate}
        value={formData.contest_description}
      />

      <button
        className="mt-2 flex font-sequel100Black text-[20px] font-55 uppercase hover:text-slate-300"
        onClick={createContest}
      >
        CREATE
      </button>
    </div>
  );
};
