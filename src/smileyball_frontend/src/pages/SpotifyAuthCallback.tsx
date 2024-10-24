import { useEffect } from "react";
import { getAccessToken } from "@/lib/scripts/spotify";
import { getHostUrl } from "@/lib/scripts/utils";
import { useSpotifyCookies } from "@/lib/hooks/useSpotifyCookies";

export const SpotifyAuthCallback = () => {
  const { setRefreshToken, setAccessToken } = useSpotifyCookies();

  const handleAuthCallback = async (clientId: string, code: string) => {
    try {
      const { access_token, refresh_token, expires_in } = await getAccessToken(
        clientId,
        code,
      );

      setAccessToken(access_token, expires_in);
      setRefreshToken(refresh_token);

      window.opener.postMessage(
        {
          access_token,
          refresh_token,
          loggedIn: !!access_token && !!refresh_token,
        },
        getHostUrl("/create-contest/new"),
      );

      window.close();
    } catch (error) {
      console.error("Error during auth callback:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      handleAuthCallback("bfcd922bba8541179e45752fe328af7c", code);
    } else {
      console.error("No authorization code found in URL");
    }
  }, []);

  return <div>spotify auth</div>;
};
