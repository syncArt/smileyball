import { fetchMock } from "./fetchMockFunc";
export { fetchMock };

export const mockContestApiResponse = {
  contest_id: "12345",
  contest_title: "Annual Music Contest",
  contest_description: "A contest to find the best song of the year.",
  songs_in_lobby_amount: 22,
  total_votes: 20,
  price_pool_init: 0,
  status: {
    value: "IN PROGRESS",
    info: "",
  },
  jury: ["principal_1", "principal_2"],
  lobby_songs: [
    {
      song_id: "song_1",
      added_by: "principal_3",
      jury_votes: [
        { principal_id: "principal_1", vote: 4 },
        { principal_id: "principal_2", vote: 5 },
      ],
    },
    {
      song_id: "song_2",
      added_by: "principal_4",
      jury_votes: [
        { principal_id: "principal_1", vote: 3 },
        { principal_id: "principal_2", vote: 4 },
      ],
    },
  ],
  contest_songs: [
    {
      song_id: "song_3",
      added_by: "principal_5",
      votes: [
        { principal_id: "principal_6", vote: 4 },
        { principal_id: "principal_7", vote: 5 },
      ],
    },
    {
      song_id: "song_4",
      added_by: "principal_8",
      votes: [
        { principal_id: "principal_6", vote: 3 },
        { principal_id: "principal_7", vote: 4 },
      ],
    },
  ],
  contest_results: [
    {
      song_id: "song_5",
      position: 1,
      votes_amount: 10,
      votes_average: 8.5,
      top_voters: [
        { principal_id: "principal_9", vote: 10 },
        { principal_id: "principal_10", vote: 9 },
      ],
    },
    {
      song_id: "song_6",
      position: 2,
      votes_amount: 8,
      votes_average: 7.0,
      top_voters: [
        { principal_id: "principal_11", vote: 8 },
        { principal_id: "principal_12", vote: 7 },
      ],
    },
  ],
  finished_at: "2024-09-13T12:00:00Z",
  closed_by: "principal_13",
  added_by: "principal_14",
  created_at: "2024-09-01T08:00:00Z",
};

export const mockSongsApiResponse = {
  songs: {
    song_1: {
      spotify_id: "spotifyUniqueId1",
      band_name: "Band One",
      song_name: "Song Title One",
      popularity: 85,
      cover_img: "http://example.com/cover1.jpg",
      apps_data: {
        smileyball: {
          contest_ids: ["contest_123", "contest_456"],
        },
      },
      added_by: "principal_1",
      created_at: "2024-09-01T08:00:00Z",
    },
    song_2: {
      spotify_id: "spotifyUniqueId2",
      band_name: "Band Two",
      song_name: "Song Title Two",
      popularity: 90,
      cover_img: "http://example.com/cover2.jpg",
      apps_data: {
        smileyball: {
          contest_ids: ["contest_789", "contest_101"],
        },
      },
      added_by: "principal_2",
      created_at: "2024-09-05T10:30:00Z",
    },
    song_3: {
      spotify_id: "spotifyUniqueId3",
      band_name: "Band Three",
      song_name: "Song Title Three",
      popularity: 75,
      cover_img: "http://example.com/cover3.jpg",
      apps_data: {
        smileyball: {
          contest_ids: ["contest_111", "contest_222"],
        },
      },
      added_by: "principal_3",
      created_at: "2024-09-10T14:45:00Z",
    },
  },
};

export const mockSingleSongApiResponse = {
  spotify_id: "spotifyUniqueId1",
  band_name: "Band One",
  song_name: "Song Title One",
  popularity: 85,
  cover_img: "http://example.com/cover1.jpg",
  apps_data: {
    smileyball: {
      contest_ids: ["contest_123", "contest_456"],
    },
  },
  added_by: "principal_1",
  created_at: "2024-09-01T08:00:00Z",
};
