import CrossSVG from "@/assets/images/cross.svg";

export const SongsList = ({
  songsList,
  removeTrack,
}: {
  songsList: {
    spotifyId: string;
    trackName: string;
    albumName: string;
    artistName: string;
  }[];
  removeTrack: (trackId: string) => void;
}) => {
  return (
    <ul className="flex flex-col">
      <h2 className="mt-4 flex w-full font-sequel100Black text-[16px] font-55">
        SONGS LIST:
      </h2>
      {songsList.map((track) => (
        <li
          className="relative my-1 box-content flex h-[16px] w-full items-center border-0 border-grey p-1 hover:h-[12px] hover:border-2"
          key={track.spotifyId}
        >
          <button
            className="relative mr-4 flex h-[14px] w-[14px]"
            onClick={() => removeTrack(track.spotifyId)}
          >
            <CrossSVG />
          </button>
          <p className="flex font-spaceMono font-[14px]">
            {track.trackName}, {track.albumName}, {track.artistName}
          </p>
        </li>
      ))}
    </ul>
  );
};
