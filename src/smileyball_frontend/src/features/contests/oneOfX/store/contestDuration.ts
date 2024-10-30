import { atom } from "jotai";
import { Duration } from "declarations/smileyball_backend/smileyball_backend.did";

export type DurationType = keyof {
  [K in Duration as keyof K]: K;
};

export const contestDurationAtom = atom<DurationType>("ThreeDays");
