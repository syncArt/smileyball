import { Input, Textarea, Label, Checkbox } from "@/lib/components/form";
import { useCreateContest } from "@/features/contests/hooks";
import SongListModule from "@/features/contests/components/AddSongs";
import { useSpotifyLink, useSpotifyTrackList } from "@/lib/hooks";

export const CreateContestForm = () => {
  const { handleUpdate, createContest, formData, error } = useCreateContest();
  const {
    spotifyLink,
    error: linkErr,
    handleInputChange,
    extractSpotifyId,
    resetInput,
  } = useSpotifyLink();

  const {
    trackList,
    addTrack,
    removeTrack,
    loading,
    error: trackErr,
  } = useSpotifyTrackList();

  const handleAddSong = async () => {
    const id = extractSpotifyId();
    if (id) {
      await addTrack(id);
      resetInput();
    }
  };

  return (
    <div className="flex flex-col">
      <Label id="contest_title" text="Title">
        <Input
          onChange={handleUpdate}
          id="contest_title"
          value={formData.contest_title}
          placeholder=""
          name="contest_title"
        />
      </Label>
      <Label id="contest_description" text="Description">
        <Textarea
          name="contest_description"
          id="contest_description"
          cols={2}
          rows={4}
          onChange={handleUpdate}
          value={formData.contest_description}
          placeholder=""
        />
      </Label>

      {formData.optional_stages[0]?.lobby ? (
        <div className="flex">
          <Label id="min_songs_amount" text="Min songs">
            <Input
              name="min_songs_amount"
              id="min_songs_amount"
              type="number"
              onChange={handleUpdate}
              value={formData.min_songs_amount[0]?.toString()}
              placeholder="0"
            />
          </Label>
          <Label id="max_songs_amount" text="Max songs">
            <Input
              name="max_songs_amount"
              id="max_songs_amount"
              type="number"
              onChange={handleUpdate}
              value={formData.max_songs_amount[0]?.toString()}
              placeholder="0"
            />
          </Label>
        </div>
      ) : (
        <div className="flex">
          <SongListModule
            trackList={trackList}
            removeTrack={removeTrack}
            handleInputChange={handleInputChange}
            spotifyLink={spotifyLink}
            handleAddSong={handleAddSong}
            loading={loading}
            linkErr={linkErr}
            trackErr={trackErr}
          />
        </div>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <div className="mt-4 flex flex-col">
        <Checkbox
          name="jury"
          id="with_jury"
          onChange={handleUpdate}
          checked={formData.optional_stages[0]?.jury}
          label="With Jury"
        />
        <Checkbox
          name="lobby"
          id="with_lobby"
          onChange={handleUpdate}
          checked={formData.optional_stages[0]?.lobby}
          label="With public lobby"
        />
      </div>
      <button
        className="mt-2 flex font-sequel100Black text-[20px] font-55 uppercase hover:text-slate-300"
        onClick={createContest}
      >
        CREATE
      </button>
    </div>
  );
};
