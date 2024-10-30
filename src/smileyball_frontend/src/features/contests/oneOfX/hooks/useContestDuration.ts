import { useAtom } from "jotai/index";
import {
  contestDurationAtom,
  DurationType,
} from "@/features/contests/oneOfX/store/contestDuration";

export const useContestDuration = () => {
  const [contestDuration, setContestDuration] = useAtom(contestDurationAtom);

  const durationOptions: { label: string; value: DurationType }[] = [
    { label: "3 days", value: "ThreeDays" },
    { label: "One week", value: "OneWeek" },
    { label: "Two weeks", value: "TwoWeeks" },
  ];

  return {
    setContestDuration,
    contestDuration,
    durationOptions,
  };
};
