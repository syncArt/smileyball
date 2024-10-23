export function getHostUrl(path: string = ""): string {
  const isViteRunning = process.env.DFX_VITE_LOCAL === "true";

  if (isViteRunning) {
    console.log("localhost");
    return `http://localhost:3000${path}`;
  }

  if (process.env.DFX_NETWORK !== "ic") {
    console.log("dev-chain");
    return `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.localhost:4943${path}`;
  }
  console.log("prod");
  return `http://${process.env.CANISTER_ID_SMILEYBALL_FRONTEND}.icp0.io${path}`;
}
