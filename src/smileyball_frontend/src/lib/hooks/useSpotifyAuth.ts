import { useEffect } from "react";
import { refreshToken, redirectToAuthCodeFlow } from "@/lib/scripts/spotify";
import { usePostMessageListener } from "@/features/contests/hooks/useSpotifyPostMessage";
import { useSpotifyCookies } from "@/lib/hooks/useSpotifyCookies";
import { useAtom } from "jotai/index";
import { spotifyProfileAtom } from "@/lib/store/profile";

export const useSpotifyAuth = () => {
  const [_, setSpotifyProfile] = useAtom(spotifyProfileAtom);

  const data = usePostMessageListener();
  const { access_token, refresh_token } = data;

  const { getCookies, removeCookies, setRefreshToken, setAccessToken } =
    useSpotifyCookies();
  const expires_at = getCookies().expires_at;

  const refreshTokenIfStale = async () => {
    const expiresAt = parseInt(expires_at || "0", 10);

    if (Date.now() > expiresAt - 5 * 60 * 1000) {
      const {
        access_token: new_access_token,
        refresh_token: new_refresh_token,
        expires_in: new_expires_in,
      } = await refreshToken(
        refresh_token!,
        "bfcd922bba8541179e45752fe328af7c",
      );

      setAccessToken(new_access_token, new_expires_in);
      setRefreshToken(new_refresh_token);
    }
  };

  useEffect(() => {
    if (refresh_token) refreshTokenIfStale();
  }, []);

  const handleLogin = async () => {
    await redirectToAuthCodeFlow("bfcd922bba8541179e45752fe328af7c");
  };

  const logoutFromSpotify = () => {
    removeCookies();
    setSpotifyProfile(null);
  };

  return {
    access_token,
    handleLogin,
    logoutFromSpotify,
    refreshTokenIfStale,
  };
};
