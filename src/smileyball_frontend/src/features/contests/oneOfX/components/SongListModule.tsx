import { useSpotifyTrackList } from "@/features/contests/oneOfX/hooks/useSpotifyTrackList";
import { SongsList } from "@/lib/components/SongsList";
import { useSpotifyLink } from "@/lib/hooks";
import { AddSongInputWithButton } from "@/features/contests/oneOfX/components/AddSongInputWithButton";

export const SongListModule = () => {
  const {
    trackList,
    removeTrack,
    error: errorSpotifyTrackList,
  } = useSpotifyTrackList();

  const {
    handleInputChange,
    resetInput,
    extractSpotifyId,
    spotifyLink,
    error: errorSpotifyLink,
  } = useSpotifyLink();

  const {
    addTrack,
    loading: loadingSpotifyTrackList,
    clearError,
  } = useSpotifyTrackList();

  const handleAddSong = async () => {
    clearError();
    const id = extractSpotifyId();
    if (id) {
      await addTrack(id);
      resetInput();
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col">
        {trackList?.length > 0 && (
          <div className="mt-3 flex">
            <SongsList songsList={trackList} removeTrack={removeTrack} />
          </div>
        )}
        <div className="mt-6 flex w-full items-end gap-2">
          <AddSongInputWithButton
            handleAddSong={handleAddSong}
            handleInputChange={handleInputChange}
            isAdding={loadingSpotifyTrackList}
            spotifyLink={spotifyLink}
          />
        </div>
        {(errorSpotifyTrackList || errorSpotifyLink) && (
          <p className="mt-2 text-red-500">
            {errorSpotifyTrackList || errorSpotifyLink}
          </p>
        )}
      </div>
    </div>
  );
};
