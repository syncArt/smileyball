import { useState, useEffect } from "react";
import { fetchProfile } from "@/lib/scripts/spotify";

export const useSpotifyProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const access_token = localStorage.getItem("access_token");

  const fetchProfileData = async () => {
    try {
      if (access_token) {
        const profile = await fetchProfile(access_token);
        setProfile(profile);
      }
    } catch (err) {
      // refresh token and fetchProfile again if didnt work remove tokens from localStorage
      console.error("Couldnt fetch profile data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearProfile = () => {
    setProfile(null);
  };

  useEffect(() => {
    setLoading(true);
    if (access_token) {
      fetchProfileData();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [access_token]);

  return { profile, loading, handleClearProfile };
};
