import { useEffect } from "react";
import { getAccessToken } from "@/scripts/spotify";
import { getHostUrl } from "@/scripts/utils";

const SpotifyAuthCallback = () => {
  const handleAuthCallback = async (clientId: string, code: string) => {
    try {
      const { access_token, refresh_token } = await getAccessToken(
        clientId,
        code,
      );

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

export default SpotifyAuthCallback;
