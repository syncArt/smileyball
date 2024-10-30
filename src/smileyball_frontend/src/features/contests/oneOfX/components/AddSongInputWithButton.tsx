import { Input, Label } from "@/lib/components/form";
import React, { ChangeEvent } from "react";

type AddSongProps = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAddSong: () => void;
  isAdding: boolean;
  spotifyLink: string;
};

export const AddSongInputWithButton = ({
  handleInputChange,
  handleAddSong,
  spotifyLink,
  isAdding,
}: AddSongProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-end">
        <Label id="spotify-link" text="Spotify Track Link">
          <Input
            id="spotify-link"
            name="spotify-link"
            placeholder="Paste Spotify track link here..."
            onChange={handleInputChange}
            type="text"
            theme="default"
            value={spotifyLink}
          />
        </Label>
        <button
          onClick={handleAddSong}
          className="ml-3 mt-2 flex h-10 items-center rounded-lg border-[1px] border-grey p-2 uppercase text-grey"
        >
          {isAdding ? ">>>" : "ADD"}
        </button>
      </div>
    </div>
  );
};
