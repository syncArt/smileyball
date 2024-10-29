import { useContestForm } from "@/features/contests/hooks";
import { useSpotifyLink, useSpotifyTrackList } from "@/lib/hooks";
import { ChangeEvent } from "react";
import { SpotifyLogin } from "@/lib/components/SpotifyLogin";
import { SongListModule } from "./SongListModule";
import { Duration } from "@/features/contests/components/Duration";

export const OneOfXForm = () => {
  const { handleUpdateMinMaxSongs, handleUpdateOptionalStages, error } =
    useContestForm();

  const handleCreateContest = () => {};

  return (
    <div className="flex flex-col">
      <SpotifyLogin />
      <SongListModule />
      <Duration />
      <button
        className="mt-2 flex font-sequel100Black text-[20px] font-55 uppercase hover:text-slate-300"
        onClick={handleCreateContest}
      >
        CREATE
      </button>
    </div>
  );
};
