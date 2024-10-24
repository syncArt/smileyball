import React, { useEffect } from "react";
import { useSpotifyProfileTracks } from "@/lib/hooks/useSpotifyProfileTracks";

const SpotifyProfileTracks = () => {
  const { profileTracks, addTracks, error } = useSpotifyProfileTracks();

  useEffect(() => {
    addTracks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Top Spotify Tracks</h2>
      <ul>
        {profileTracks.map((track) => (
          <li key={track.spotifyId}>
            <strong>{track.trackName}</strong> by {track.artistName} <br />
            <img src={track.albumCover64} alt={track.albumName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyProfileTracks;
