import { Input, Label } from "@/lib/components/form";
import { ChangeEvent } from "react";
import { Track } from "@/lib/hooks/useSpotifyTrackList";
import { SongsList } from "@/lib/components/SongsList";

export type UseSpotifyTrackList = {
  trackList: Track[];
  removeTrack: (spotifyId: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  spotifyLink: string;
  handleAddSong: () => void;
  loading: boolean;
  linkErr: string | null;
  trackErr: string | null;
};

export const SpotifySong = ({
  trackList,
  removeTrack,
  handleInputChange,
  spotifyLink,
  handleAddSong,
  loading,
  linkErr,
  trackErr,
}: UseSpotifyTrackList) => {
  return (
    <div className="flex w-full flex-col">
      <h2 className="mt-4 flex w-full font-sequel100Black text-[12px] font-55">
        SONGS LIST:
      </h2>
      <div className="mt-3 flex">
        <SongsList songsList={trackList} removeTrack={removeTrack} />
      </div>
      <div className="mt-6 flex w-full items-end gap-2">
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
          {loading ? ">>>" : "ADD"}
        </button>
      </div>

      {linkErr ||
        (trackErr && (
          <p className="mt-2 text-red-500">{linkErr || trackErr}</p>
        ))}
    </div>
  );
};
