import React from "react";

type SpotifyAuthProps = {
  handleLogin: () => void;
  logoutFromSpotify: () => void;
  profile: any;
};

export const SpotifyAuth = ({
  handleLogin,
  logoutFromSpotify,
  profile,
}: SpotifyAuthProps) => {
  return (
    <div className="flex w-full flex-col py-2">
      {profile ? (
        <button className="flex" onClick={logoutFromSpotify}>
          Logout from spotify
        </button>
      ) : (
        <button className="flex" onClick={handleLogin}>
          Login with Spotify
        </button>
      )}
    </div>
  );
};
