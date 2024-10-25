import { useAtom } from "jotai";
import { useSpotifyCookies } from "@/lib/hooks/useSpotifyCookies";
import { SpotifyGETClient } from "@/lib/api/spotifyConfig";
import { profileTracksAtom } from "@/lib/store/profileTracks";
import { Track } from "@/lib/hooks/useSpotifyTrackList";
import useComponentError from "@/lib/hooks/useError";

export const useSpotifyProfileTracks = () => {
  const { getCookies } = useSpotifyCookies();
  const access_token = getCookies().access_token;

  const [profileTracks, setProfileTracks] = useAtom(profileTracksAtom);
  const { error, setComponentError, clearComponentError } = useComponentError(
    "useSpotifyProfileTracks",
  );
  const addTracks = async () => {
    try {
      if (!access_token) {
        throw new Error("No access token available");
      }

      if (profileTracks.length > 1) {
        return;
      }

      const trackData = await SpotifyGETClient("/v1/me/top/tracks");

      const tracks: Track[] = trackData.items.map((track: any) => ({
        albumName: track.album.name,
        artistName: track.artists[0].name,
        trackName: track.name,
        releaseDate: track.album.release_date,
        explicitContent: track.explicit,
        isrc: track.external_ids.isrc,
        durationMs: track.duration_ms,
        trackNumber: track.track_number,
        totalTracks: track.album.total_tracks,
        albumCover640: track.album.images[0].url,
        albumCover300: track.album.images[1].url,
        albumCover64: track.album.images[2].url,
        spotifyId: track.id,
      }));

      setProfileTracks((prevTracks) => [...prevTracks, ...tracks]);
      clearComponentError();
    } catch (err) {
      setComponentError("Could not fetch top tracks.");
    }
  };

  return {
    profileTracks,
    addTracks,
    error,
  };
};
