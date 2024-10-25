import { useAtom } from "jotai";
import { useEffect } from "react";
import { spotifyProfileAtom } from "@/lib/store/profile";
import { SpotifyGETClient } from "@/lib/api/spotifyConfig";
import { useSpotifyAuth } from "@/lib/hooks/useSpotifyAuth";
import { useSpotifyCookies } from "@/lib/hooks/useSpotifyCookies";
import useComponentError from "@/lib/hooks/useError";

export const useSpotifyProfile = () => {
  const [spotifyProfile, setSpotifyProfile] = useAtom(spotifyProfileAtom);

  const { handleLogin, logoutFromSpotify } = useSpotifyAuth();
  const { error, setComponentError, clearComponentError } =
    useComponentError("useSpotifyProfile");

  const { getCookies } = useSpotifyCookies();
  const access_token = getCookies().access_token;

  const fetchProfileData = async () => {
    try {
      const profile = await SpotifyGETClient("/v1/me");
      setSpotifyProfile(profile);
      clearComponentError();
    } catch (err) {
      setComponentError("Couldn’t fetch profile data");
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchProfileData();
    }
  }, [access_token]);

  const handleLoginWithProfileData = async () => {
    await handleLogin();
  };

  const handleLogoutFromSpotify = () => {
    logoutFromSpotify();
  };

  return {
    spotifyProfile,
    handleLogoutFromSpotify,
    spotifyProfileError: error,
    handleLoginWithProfileData,
  };
};
