import { useState, useEffect } from "react";
import {
  fetchProfile,
  refreshToken,
  redirectToAuthCodeFlow,
} from "@/scripts/spotify";

export const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:3000") return;

      const { token, refreshToken, profile } = event.data;

      if (token && profile) {
        console.log(
          "Message received: setting profile and token from postMessage",
        );
        setAccessToken(token);
        setProfile(profile);
        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refreshToken);
      }
    };

    window.addEventListener("message", messageListener);

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (token) {
      console.log("Using token from localStorage:", token);
      setAccessToken(token);

      fetchProfile(token)
        .then((profileData) => {
          console.log(
            "Setting profile from token in localStorage:",
            profileData,
          );
          setProfile(profileData);
        })
        .catch(async (error) => {
          if (error.message === "Invalid access token" && refresh) {
            console.log("Access token invalid, refreshing token...");
            const newToken = await refreshToken(
              refresh,
              "bfcd922bba8541179e45752fe328af7c",
            );
            localStorage.setItem("access_token", newToken);
            setAccessToken(newToken);

            const newProfile = await fetchProfile(newToken);
            setProfile(newProfile);
          } else {
            console.error("Error fetching profile or refreshing token:", error);
          }
        });
    }
  }, []);

  const handleLogin = async () => {
    const authUrl = await redirectToAuthCodeFlow(
      "bfcd922bba8541179e45752fe328af7c",
    );
    const authWindow = window.open(
      authUrl,
      "SpotifyAuth",
      "width=500,height=800",
    );

    if (authWindow) {
      authWindow.focus();
    }
  };

  const logoutFromSpotify = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setProfile(null);
  };

  return {
    accessToken,
    profile,
    handleLogin,
    logoutFromSpotify,
  };
};
