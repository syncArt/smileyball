import { useSpotifyTrackList } from "@/lib/hooks/useSpotifyTrackList";
import { useSpotifyProfile } from "@/lib/hooks/useSpotifyProfile";
import { SongsList } from "@/lib/components/SongsList";
import { AddSong } from "@/features/contests/components/AddSong";

export const SongListModule = () => {
  const { spotifyProfile } = useSpotifyProfile();
  const { trackList, removeTrack, error } = useSpotifyTrackList();
  return (
    <div className="flex w-full flex-col">
      {spotifyProfile && (
        <div className="flex w-full flex-col">
          <h2 className="mt-4 flex w-full font-sequel100Black text-[12px] font-55">
            SONGS LIST:
          </h2>
          <div className="mt-3 flex">
            <SongsList songsList={trackList} removeTrack={removeTrack} />
          </div>
          <div className="mt-6 flex w-full items-end gap-2">
            <AddSong />
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};
