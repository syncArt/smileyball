import { SpotifyLogin } from "@/lib/components/SpotifyLogin";
import { SongListModule } from "./SongListModule";
import { Duration } from "./Duration";
import { useSpotifyProfile } from "@/lib/hooks/useSpotifyProfile";

export const OneOfXForm = () => {
  const { spotifyProfile } = useSpotifyProfile();

  const handleCreateContest = () => {};

  return (
    <div className="flex flex-col">
      <SpotifyLogin />
      {!!spotifyProfile && (
        <div>
          <SongListModule />
          <Duration />
          <button
            className="mt-2 flex font-sequel100Black text-[20px] font-55 uppercase hover:text-slate-300"
            onClick={handleCreateContest}
          >
            CREATE
          </button>
        </div>
      )}
    </div>
  );
};
