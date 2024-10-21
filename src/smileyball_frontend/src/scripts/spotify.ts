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
  params.append(
    "redirect_uri",
    process.env.DFX_NETWORK !== "ic"
      ? `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.localhost:4943/callback`
      : `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.icp0.io/callback`,
  );
  params.append(
    "scope",
    "user-read-private user-read-email user-library-read user-read-playback-state user-read-recently-played",
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
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

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append(
    "redirect_uri",
    process.env.DFX_NETWORK !== "ic"
      ? `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.localhost:4943/callback`
      : `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.icp0.io/callback`,
  );
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await result.json();

  const { access_token, refresh_token } = data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  return { access_token, refresh_token };
}

export async function fetchProfile(token: string): Promise<any> {
  let result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.status === 401) {
    console.log("Token expired, refreshing token...");
    const newToken = await refreshToken(
      token,
      "bfcd922bba8541179e45752fe328af7c",
    );

    result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${newToken}` },
    });
  }

  if (!result.ok) {
    throw new Error("Failed to fetch profile: " + result.status);
  }

  const data = await result.json();
  console.log("Response status:", result.status);
  console.log("Response data:", data);

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

  console.log("Refresh token response:", data); // Zaloguj pełną odpowiedź

  if (!result.ok) {
    throw new Error("Failed to refresh token: " + result.status);
  }

  const newAccessToken: string = data.access_token;

  localStorage.setItem("access_token", newAccessToken);

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
