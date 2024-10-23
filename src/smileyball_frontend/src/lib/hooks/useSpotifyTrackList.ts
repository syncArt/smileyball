import { useState } from "react";
import { fetchTrack } from "@/lib/scripts/spotify";

export type Track = {
  albumName: string;
  artistName: string;
  trackName: string;
  releaseDate: string;
  explicitContent: boolean;
  isrc: string;
  durationMs: number;
  trackNumber: number;
  totalTracks: number;
  albumCover640: string;
  albumCover300: string;
  albumCover64: string;
  spotifyId: string;
};

export const useSpotifyTrackList = () => {
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem("access_token");

  const addTrack = async (trackId: string) => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token available");
      }

      const trackData = await fetchTrack(accessToken, trackId);

      const newTrack = {
        albumName: trackData.album.name,
        artistName: trackData.artists[0].name,
        trackName: trackData.name,
        releaseDate: trackData.album.release_date,
        explicitContent: trackData.explicit,
        isrc: trackData.external_ids.isrc,
        durationMs: trackData.duration_ms,
        trackNumber: trackData.track_number,
        totalTracks: trackData.album.total_tracks,
        albumCover640: trackData.album.images[0].url,
        albumCover300: trackData.album.images[1].url,
        albumCover64: trackData.album.images[2].url,
        spotifyId: trackData.id,
      };

      const isTrackAlreadyInList = trackList.some(
        (track) => track.spotifyId === newTrack.spotifyId,
      );

      if (isTrackAlreadyInList) {
        throw new Error(
          "Track with the same Spotify ID is already in the list.",
        );
      }

      setTrackList((prevTrackList) => [...prevTrackList, newTrack]);
    } catch (err) {
      setError((err as Error).message);
      console.error("Error fetching track:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeTrack = (spotifyId: string) => {
    setTrackList((prevTrackList) =>
      prevTrackList.filter((track) => track.spotifyId !== spotifyId),
    );
  };

  return { trackList, addTrack, removeTrack, loading, error };
};
