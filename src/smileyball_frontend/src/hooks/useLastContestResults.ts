import { useEffect, useState } from "react";

export const useLastContestResults = () => {

  const apiResponseMock = {
    position: 3,
    votes_amount: 4,
    votes_average: 8.2,
    top_voters: {
      "12301-2131-23-12-31-2": {
        vote: 10,
      },
      "12301-2131-23-12-31-3": {
        vote: 9,
      },
      "12301-2131-23-12-31-4": {
        vote: 8,
      },
    },
  }

  const [lastContestResults, setLastContestResults] = useState();
  useEffect(() => {}, []);

  return [lastContestResults, setLastContestResults];
};
