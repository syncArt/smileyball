import { smileyball_backend } from "declarations/smileyball_backend";
import { ChangeEvent, useState } from "react";
import {
  CreateContest,
  OptionalStages,
} from "declarations/smileyball_backend/smileyball_backend.did";

export const useCreateContest = () => {
  const [formData, setFormData] = useState<CreateContest>({
    contest_description: "",
    contest_title: "",
    max_songs_amount: [20],
    min_songs_amount: [0],
    optional_stages: [],
  });

  const [error, setError] = useState<string | null>(null);

  const createContest = () => {
    if (formData.min_songs_amount[0]! >= formData.max_songs_amount[0]!) {
      setError("Min songs must be less than max songs.");
      return;
    }
    setError(null);

    console.log(formData);
    smileyball_backend.contest_update_create_contest(formData);
  };

  const handleUpdate = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    const isCheckbox = type === "checkbox";
    const checkboxValue = (e.target as HTMLInputElement).checked;

    setFormData((prevFormData: CreateContest) => {
      let updatedFormData: CreateContest;

      if (isCheckbox) {
        updatedFormData = {
          ...prevFormData,
          optional_stages:
            prevFormData.optional_stages.length > 0
              ? ([
                  { ...prevFormData.optional_stages[0], [name]: checkboxValue },
                ] as [OptionalStages])
              : ([{ jury: false, lobby: false }] as [OptionalStages]),
        };
      } else {
        updatedFormData = {
          ...prevFormData,
          [name]:
            name === "min_songs_amount" || name === "max_songs_amount"
              ? [parseInt(value, 10)]
              : value,
        };
      }

      if (name === "min_songs_amount" || name === "max_songs_amount") {
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
      }

      return updatedFormData;
    });
  };

  return { handleUpdate, createContest, formData, error };
};
