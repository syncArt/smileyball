import {
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from "@dfinity/auth-client";

export const getIdentityProvider = (): string | undefined => {
  let idpProvider;
  if (typeof window !== "undefined") {
    const isLocal = process.env.DFX_NETWORK !== "ic";
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isLocal && isSafari) {
      idpProvider = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
    } else if (isLocal) {
      idpProvider = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
    }
  }
  return idpProvider;
};

export type AuthConfig = {
  createOptions: AuthClientCreateOptions;
  loginOptions: AuthClientLoginOptions;
};

export const defaultOptions: AuthConfig = {
  /**
   *  @type {AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  /**
   * @type {AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider: getIdentityProvider(),
    windowOpenerFeatures:
      "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
  },
};
