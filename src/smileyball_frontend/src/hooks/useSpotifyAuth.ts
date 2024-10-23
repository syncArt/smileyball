import { useEffect } from "react";
import { refreshToken, redirectToAuthCodeFlow } from "@/scripts/spotify";
import { usePostMessageListener } from "@/hooks/useSpotifyPostMessage";

export const useSpotifyAuth = () => {
  const data = usePostMessageListener();

  const { access_token, refresh_token } = data;

  const refreshTokenIfStale = async () => {
    const expiresAt = parseInt(localStorage.getItem("expires_at") || "0", 10);

    if (Date.now() > expiresAt - 5 * 60 * 1000) {
      await refreshToken(refresh_token!, "bfcd922bba8541179e45752fe328af7c");
    }
  };

  useEffect(() => {
    refreshTokenIfStale();
  }, []);

  const handleLogin = async () => {
    await redirectToAuthCodeFlow("bfcd922bba8541179e45752fe328af7c");
  };

  const logoutFromSpotify = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return {
    access_token,
    handleLogin,
    logoutFromSpotify,
    refreshTokenIfStale,
  };
};
