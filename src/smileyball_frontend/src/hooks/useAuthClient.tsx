"use client";

import { AuthClient } from "@dfinity/auth-client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  canisterId,
  createActor,
  CreateActorOptions,
} from "declarations/user_identity";
import { AuthConfig, defaultOptions } from "./config/authConfig";
import { Identity, ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { _SERVICE } from "declarations/user_identity/user_identity.did";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  authClient: AuthClient | null;
  identity: Identity | null;
  principal: Principal | null;
  whoamiActor: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthClient = (options: AuthConfig = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [whoamiActor, setWhoamiActor] =
    useState<ActorSubclass<_SERVICE> | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Stan ładowania

  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      await updateClient(client);
      setLoading(false);
    });
  }, []);

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        console.log("success", authClient);
        updateClient(authClient);
      },
      onError: () => {
        console.log("couldn't authorize", authClient);
      },
    });
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    } as CreateActorOptions);

    setWhoamiActor(actor);
  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient!);
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
    loading,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthClient();

  return (
    <AuthContext.Provider value={auth as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
