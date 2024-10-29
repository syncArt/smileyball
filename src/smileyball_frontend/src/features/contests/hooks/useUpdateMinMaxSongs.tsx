import { ChangeEvent } from "react";
import { CreateContest } from "declarations/smileyball_backend/smileyball_backend.did";
import { useAtom } from "jotai/index";
import {
  createContestAtom,
  createContestErrorAtom,
} from "@/features/contests/store/contest";

export const useUpdateMinMaxSongs = () => {
  const [_1, setFormData] = useAtom(createContestAtom);
  const [_2, setError] = useAtom(createContestErrorAtom);

  const handleUpdateMinMaxSongs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData: CreateContest) => {
      let updatedFormData: CreateContest;
      updatedFormData = {
        ...prevFormData,
        [name]:
          name === "min_songs_amount" || name === "max_songs_amount"
            ? [parseInt(value, 10)]
            : value,
      };

      const minAmount = updatedFormData.min_songs_amount
        ? updatedFormData.min_songs_amount[0]
        : 0;
      const maxAmount = updatedFormData.max_songs_amount
        ? updatedFormData.max_songs_amount[0]
        : 0;

      if (minAmount! >= maxAmount!) {
        setError("Min songs must be less than max songs.");
      } else {
        setError(null);
      }

      return updatedFormData;
    });
  };

  return handleUpdateMinMaxSongs;
};
