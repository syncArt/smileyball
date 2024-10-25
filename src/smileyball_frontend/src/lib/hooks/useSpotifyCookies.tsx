import Cookies from "js-cookie";

export const useSpotifyCookies = () => {
  const setAccessToken = (access_token: string, expires_in: number) => {
    Cookies.set("spotify_access_token", access_token, {
      path: "/",
      secure: true,
    });
    Cookies.set(
      "spotify_expires_at",
      (Date.now() + expires_in * 1000).toString(),
      {
        path: "/",
        secure: true,
      },
    );
  };
  const setRefreshToken = (refresh_token: string) => {
    Cookies.set("spotify_refresh_token", refresh_token, {
      path: "/",
      secure: true,
    });
  };

  const removeCookies = () => {
    Cookies.remove("spotify_access_token", { path: "/" });
    Cookies.remove("spotify_refresh_token", { path: "/" });
    Cookies.remove("spotify_expires_at", { path: "/" });
  };

  const getCookies = () => {
    const access_token = Cookies.get("spotify_access_token");
    const refresh_token = Cookies.get("spotify_access_token");
    const expires_at = Cookies.get("spotify_access_token");

    return { access_token, refresh_token, expires_at };
  };

  return { setAccessToken, setRefreshToken, removeCookies, getCookies };
};
