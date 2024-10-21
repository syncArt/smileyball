import { useEffect } from "react";
import { fetchProfile, getAccessToken } from "@/scripts/spotify";

const SpotifyAuthCallback = () => {
  const handleAuthCallback = async (clientId: string, code: string) => {
    try {
      console.log("Starting token exchange with code:", code);

      const { access_token: accessToken, refresh_token: refreshToken } =
        await getAccessToken(clientId, code);
      console.log("Access token:", accessToken);

      const profile = await fetchProfile(accessToken);

      console.log("Sending message to parent window");

      window.opener.postMessage(
        { token: accessToken, refreshToken, profile },
        process.env.DFX_NETWORK !== "ic"
          ? `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.localhost:4943/create-contest/new`
          : `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.icp0.io/create-contest/new`,
      );

      setTimeout(() => {
        window.close();
      }, 100);
    } catch (error) {
      console.error("Error during auth callback:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("URL params:", params);
    console.log("Code from URL:", code);

    if (code) {
      handleAuthCallback("bfcd922bba8541179e45752fe328af7c", code);
    } else {
      console.error("No authorization code found in URL");
    }
  }, []);

  return <div>spotify auth</div>;
};

export default SpotifyAuthCallback;
