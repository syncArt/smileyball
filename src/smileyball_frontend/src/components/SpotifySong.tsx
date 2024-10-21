import { Input, Label } from "@/components/form";
import { ChangeEvent } from "react";
import { Track } from "@/hooks/useSpotifyTrackList";

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
      <h2 className="mt-4 flex w-full font-sequel100Black text-xl font-55">
        SONGS LIST:{" "}
      </h2>
      <ul className="flex flex-col">
        {trackList.map((track, index: number) => (
          <li className="flex w-full items-center" key={track.spotifyId}>
            <p className="flex font-bold">
              #{index + 1}:{track.trackName}, {track.albumName},{" "}
              {track.artistName}
            </p>
            <button
              className="relative -bottom-[1px] ml-4 flex font-sequel100Black font-55"
              onClick={() => removeTrack(track.spotifyId)}
            >
              //Remove
            </button>
          </li>
        ))}
      </ul>

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
