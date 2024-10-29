import { useUpdateOptionalStages } from "@/features/contests/hooks/useUpdateOptionalStages";
import { useUpdateMinMaxSongs } from "@/features/contests/hooks/useUpdateMinMaxSongs";
import { useAtom } from "jotai";
import {
  createContestAtom,
  createContestErrorAtom,
} from "@/features/contests/store/contest";

export const useContestForm = () => {
  const [formData] = useAtom(createContestAtom);
  const [error] = useAtom(createContestErrorAtom);
  const handleUpdateOptionalStages = useUpdateOptionalStages();
  const handleUpdateMinMaxSongs = useUpdateMinMaxSongs();

  return {
    handleUpdateMinMaxSongs,
    handleUpdateOptionalStages,
    formData,
    error,
  };
};
