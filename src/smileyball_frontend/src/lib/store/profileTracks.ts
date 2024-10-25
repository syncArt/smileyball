import { atom } from "jotai";
import { Track } from "@/lib/hooks/useSpotifyTrackList";

export const profileTracksAtom = atom<Track[]>([]);
