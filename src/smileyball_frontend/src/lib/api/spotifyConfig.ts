import { useSpotifyCookies } from "@/lib/hooks/useSpotifyCookies";

export const SpotifyGETClient = async (path: string) => {
  const { getCookies } = useSpotifyCookies();
  const access_token = getCookies().access_token;

  const result = await fetch(`https://api.spotify.com${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!result.ok) {
    throw new Error(
      `Failed to fetch data for spotify path: ${path} ` + result.status,
    );
  }

  const data = await result.json();
  return data;
};

export const SpotifyPOSTClient = async (
  path: string,
  params: URLSearchParams,
) => {
  const { getCookies } = useSpotifyCookies();
  const access_token = getCookies().access_token;

  const result = await fetch(`https://accounts.spotify.com${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) {
    throw new Error(
      `Failed to fetch data for spotify path: ${path} ` + result.status,
    );
  }

  const data = await result.json();
  return data;
};

export const objectToURLSearchParams = (
  obj: Record<string, string>,
): URLSearchParams => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    params.append(key, value);
  }
  return params;
};
