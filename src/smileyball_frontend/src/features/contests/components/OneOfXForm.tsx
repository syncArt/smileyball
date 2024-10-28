import { Input, Label } from "@/lib/components/form";
import { useCreateContest } from "@/features/contests/hooks";
import SongListModule from "@/features/contests/components/AddSongs";
import { useSpotifyLink, useSpotifyTrackList } from "@/lib/hooks";
import { RadioButtons } from "@/lib/components/form/RadioButtons";
import React, { ChangeEvent, useState } from "react";
import { SpotifyLogin } from "@/lib/components/SpotifyLogin";

export const OneOfXForm = () => {
  const { handleUpdate, createContest, formData, error } = useCreateContest();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const options = [
    { label: "3 days", value: "3-days" },
    { label: "One week", value: "one-week" },
    { label: "Two weeks", value: "two-weeks" },
  ];
  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.name);
  };

  const {
    spotifyLink,
    error: linkErr,
    handleInputChange,
    extractSpotifyId,
    resetInput,
  } = useSpotifyLink();

  const {
    trackList,
    addTrack,
    removeTrack,
    loading,
    error: trackErr,
  } = useSpotifyTrackList();

  const handleAddSong = async () => {
    const id = extractSpotifyId();
    if (id) {
      await addTrack(id);
      resetInput();
    }
  };

  return (
    <div className="flex flex-col">
      <SpotifyLogin />
      <SongListModule
        trackList={trackList}
        removeTrack={removeTrack}
        handleInputChange={handleInputChange}
        spotifyLink={spotifyLink}
        handleAddSong={handleAddSong}
        loading={loading}
        linkErr={linkErr}
        trackErr={trackErr}
      />

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <div className="mt-4 flex flex-col">
        <RadioButtons
          options={options}
          selectedOption={selectedOption}
          onChange={handleSelectChange}
        />
      </div>
      <button
        className="mt-2 flex font-sequel100Black text-[20px] font-55 uppercase hover:text-slate-300"
        onClick={createContest}
      >
        CREATE
      </button>
    </div>
  );
};
