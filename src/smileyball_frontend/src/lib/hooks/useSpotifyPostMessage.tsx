import { useState, useEffect } from "react";
import { getHostUrl } from "@/lib/scripts/utils";

export type PostMessageListenerData = {
  access_token?: string | null;
  refresh_token?: string | null;
};

export const usePostMessageListener = (): PostMessageListenerData => {
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [refresh_token, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const validOrigin = getHostUrl();

      if (event.origin !== validOrigin) {
        console.warn("Untrusted message origin:", event.origin);
        return;
      }

      const { access_token, refreshToken } = event.data;

      if (access_token) {
        setAccessToken(access_token);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return { access_token, refresh_token };
};
