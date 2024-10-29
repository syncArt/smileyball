import { Input, Label } from "@/lib/components/form";
import React from "react";
import { useSpotifyLink } from "@/lib/hooks";

export const AddSong = ({
  onAddSong,
}: {
  onAddSong: (trackId?: string) => void;
}) => {
  const { spotifyLink, handleInputChange, trackId } = useSpotifyLink();

  const handleAddSong = () => {
    onAddSong(trackId);
  };

  return (
    <>
      <Label id="spotify-link" text="Spotify Track Link">
        <Input
          id="spotify-link"
          name="spotify-link"
          placeholder="Paste Spotify track link here..."
          onChange={handleInputChange}
          value={spotifyLink}
          type="text"
          theme="default"
        />
      </Label>
      <button
        onClick={handleAddSong}
        className="mt-2 flex h-10 items-center rounded-lg border-[1px] border-grey p-2 uppercase text-grey"
      >
        {/*{loading ? ">>>" : "ADD"}*/}
      </button>
    </>
  );
};
