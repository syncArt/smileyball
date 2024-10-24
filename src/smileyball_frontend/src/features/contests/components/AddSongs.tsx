import React, { ChangeEvent } from "react";
import { Track } from "@/lib/hooks/useSpotifyTrackList";
import { useSpotifyProfile } from "@/lib/hooks/useSpotifyProfile";
import { SpotifyLogin } from "./SpotifyLogin";
import { SpotifySong } from "./SpotifySong";

type SongListModuleProps = {
  trackList: Track[];
  removeTrack: (spotifyId: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  spotifyLink: string;
  handleAddSong: () => void;
  loading: boolean;
  linkErr: string | null;
  trackErr: string | null;
};

const SongListModule = ({
  trackList,
  removeTrack,
  handleInputChange,
  spotifyLink,
  handleAddSong,
  loading,
  linkErr,
  trackErr,
}: SongListModuleProps) => {
  const { spotifyProfile } = useSpotifyProfile();

  return (
    <div className="flex w-full flex-col">
      <SpotifyLogin />
      {spotifyProfile && (
        <SpotifySong
          trackList={trackList}
          removeTrack={removeTrack}
          handleInputChange={handleInputChange}
          spotifyLink={spotifyLink}
          handleAddSong={handleAddSong}
          loading={loading}
          linkErr={linkErr}
          trackErr={trackErr}
        />
      )}
    </div>
  );
};

export default SongListModule;
