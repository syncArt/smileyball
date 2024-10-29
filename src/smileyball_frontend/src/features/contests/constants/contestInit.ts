import { CreateContest } from "declarations/smileyball_backend/smileyball_backend.did";

export const contestInit: CreateContest = {
  contest_description: "",
  contest_title: "",
  max_songs_amount: [20],
  min_songs_amount: [0],
  optional_stages: [],
};
