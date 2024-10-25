import { atom } from "jotai";

type ErrorState = Record<string, string | null>;

export const errorAtom = atom<ErrorState>({});
