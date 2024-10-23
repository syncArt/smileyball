import React, { ChangeEvent } from "react";
import { useSpotifyAuth } from "@/lib/hooks";
import { Track } from "@/lib/hooks/useSpotifyTrackList";
import { useSpotifyProfile } from "@/lib/hooks/useSpotifyProfile";
import { SpotifyAuth } from "./SpotifyAuth";
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
  const { handleLogin, logoutFromSpotify } = useSpotifyAuth();
  const { profile, handleClearProfile } = useSpotifyProfile();

  const handleLogout = () => {
    handleClearProfile();
    logoutFromSpotify();
  };
  return (
    <div className="flex w-full flex-col">
      <SpotifyAuth
        handleLogin={handleLogin}
        logoutFromSpotify={handleLogout}
        profile={profile}
      />
      {profile && (
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
