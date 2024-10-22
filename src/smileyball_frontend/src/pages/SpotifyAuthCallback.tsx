import { useEffect } from "react";
import { fetchProfile, getAccessToken } from "@/scripts/spotify";

const SpotifyAuthCallback = () => {
  const handleAuthCallback = async (clientId: string, code: string) => {
    try {
      const { access_token: accessToken, refresh_token: refreshToken } =
        await getAccessToken(clientId, code);

      const profile = await fetchProfile(accessToken);

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

  const handleMessage = (event: MessageEvent) => {
    const validOrigin =
      process.env.DFX_NETWORK !== "ic"
        ? `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.localhost:4943`
        : `https://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.icp0.io`;

    if (event.origin !== validOrigin) return;

    const { verifier } = event.data;
    if (verifier) {
      localStorage.setItem("verifier", verifier);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
