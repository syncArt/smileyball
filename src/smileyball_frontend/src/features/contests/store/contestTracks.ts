import { atom } from "jotai/index";
import { Track } from "@/lib/hooks/useSpotifyTrackList";

export const contestTracksAtom = atom<Track[]>([]);
export const contestTracksLoadingAtom = atom<boolean>(false);
export const contestTracksErrorAtom = atom<string | null>(null);
