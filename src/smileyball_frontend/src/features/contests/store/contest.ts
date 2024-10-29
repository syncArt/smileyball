import { atom } from "jotai";
import { contestInit } from "@/features/contests/constants/contestInit";
import { CreateContest } from "declarations/smileyball_backend/smileyball_backend.did";

export const createContestAtom = atom<CreateContest>(contestInit);
export const createContestLoadingAtom = atom<boolean>(false);
export const createContestErrorAtom = atom<string | null>(null);
