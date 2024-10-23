import { getHostUrl } from "@/scripts/utils";

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  if (!verifier) {
    console.error("Code verifier is missing or invalid");
  } else {
    console.log("Verifier found:", verifier);
  }

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", getHostUrl("/callback"));
  params.append(
    "scope",
    "user-read-private user-read-email user-library-read user-read-playback-state user-read-recently-played",
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

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

export async function getAccessToken(
  clientId: string,
  code: string,
): Promise<{ refresh_token: string; access_token: string }> {
  const verifier = localStorage.getItem("verifier");

  if (!verifier) {
    throw new Error(
      "Code verifier not found in localStorage. Please restart the authentication process.",
    );
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", getHostUrl("/callback"));
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await result.json();

  const { access_token, refresh_token, expires_in } = data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem(
    "expires_at",
    (Date.now() + expires_in * 1000).toString(),
  );

  return { access_token, refresh_token };
}

export async function fetchProfile(token: string): Promise<any> {
  let result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch profile: " + result.status);
  }

  const data = await result.json();
  return data;
}

export async function refreshToken(
  refreshToken: string,
  clientId: string,
): Promise<string> {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("client_id", clientId);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error("Failed to refresh token: " + result.status);
  }

  const newAccessToken: string = data.access_token;

  const expiresIn = data.expires_in || 3600;
  localStorage.setItem("access_token", newAccessToken);
  localStorage.setItem(
    "expires_at",
    (Date.now() + expiresIn * 1000).toString(),
  );

  return newAccessToken;
}

export async function fetchTrack(token: string, trackId: string): Promise<any> {
  const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error(`Failed to fetch track: ${result.status}`);
  }

  const data = await result.json();
  console.log("Track data:", data);

  return data;
}
