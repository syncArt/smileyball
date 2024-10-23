import { ChangeEvent, useState } from "react";

export const useSpotifyLink = () => {
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [trackId, setTrackId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpotifyLink(e.target.value);
    setError(null);
  };

  const extractTrackId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/open\.spotify\.com\/track\/|spotify:track:)([a-zA-Z0-9]{22})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractSpotifyId = () => {
    const extractedTrackId = extractTrackId(spotifyLink);
    if (extractedTrackId) {
      setTrackId(extractedTrackId);
      setError(null);
      return extractedTrackId;
    } else {
      setTrackId(undefined);
      setError("Invalid Spotify link. Please provide a valid track link.");
    }
  };

  const resetInput = () => {
    setSpotifyLink("");
  };

  return {
    spotifyLink,
    trackId,
    error,
    resetInput,
    handleInputChange,
    extractSpotifyId,
  };
};
