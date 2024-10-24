import { getHostUrl } from "@/lib/scripts/utils";
import {
  objectToURLSearchParams,
  SpotifyPOSTClient,
} from "@/lib/api/spotifyConfig";
import { useSpotifyCookies } from "@/lib/hooks/useSpotifyCookies";

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  if (!verifier) {
    console.error("Code verifier is missing or invalid");
  } else {
    console.log("Verifier found:", verifier);
  }

  localStorage.setItem("verifier", verifier);

  const params = objectToURLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: getHostUrl("/callback"),
    scope:
      "user-read-private user-top-read user-read-email user-library-read user-read-playback-state user-read-recently-played",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  const authWindow = window.open(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
    "_blank",
    "width=500,height=800",
  );

  if (authWindow) {
    authWindow.focus();
  }
}

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export type SpotifyAccessToken = {
  refresh_token: string;
  access_token: string;
  expires_in: number;
};

export async function getAccessToken(
  clientId: string,
  code: string,
): Promise<SpotifyAccessToken> {
  const verifier = localStorage.getItem("verifier");

  if (!verifier) {
    throw new Error(
      "Code verifier not found in localStorage. Please restart the authentication process.",
    );
  }

  const searchParams = objectToURLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: getHostUrl("/callback"),
    code_verifier: verifier,
  });

  const result = await SpotifyPOSTClient("/api/token", searchParams);

  return result;
}

export const refreshToken = async (
  refreshToken: string,
  clientId: string,
): Promise<SpotifyAccessToken> => {
  const params = objectToURLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const result = await SpotifyPOSTClient("/api/token", params);

  if (!result.ok) {
    throw new Error("Failed to refresh token: " + result.status);
  }

  return result;
};
