import { ChangeEvent } from "react";
import {
  CreateContest,
  OptionalStages,
} from "declarations/smileyball_backend/smileyball_backend.did";
import { useAtom } from "jotai/index";
import { createContestAtom } from "@/features/contests/store/contest";

export const useUpdateOptionalStages = () => {
  const [_, setFormData] = useAtom(createContestAtom);

  const handleUpdateOptionalStages = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    const checkboxValue = (e.target as HTMLInputElement).checked;

    setFormData((prevFormData: CreateContest) => {
      let updatedFormData: CreateContest;
      updatedFormData = {
        ...prevFormData,
        optional_stages:
          prevFormData.optional_stages.length > 0
            ? ([
                { ...prevFormData.optional_stages[0], [name]: checkboxValue },
              ] as [OptionalStages])
            : ([{ jury: false, lobby: false }] as [OptionalStages]),
      };
      return updatedFormData;
    });
  };

  return handleUpdateOptionalStages;
};
