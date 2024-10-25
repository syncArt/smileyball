import React from "react";
import { useSpotifyProfile } from "@/lib/hooks/useSpotifyProfile";

export const SpotifyLogin = () => {
  const {
    spotifyProfile,
    handleLoginWithProfileData,
    handleLogoutFromSpotify,
  } = useSpotifyProfile();

  return (
    <div>
      {spotifyProfile ? (
        <button onClick={handleLogoutFromSpotify}>Logout from spotify</button>
      ) : (
        <button onClick={handleLoginWithProfileData}>Login to spotify</button>
      )}
    </div>
  );
};
