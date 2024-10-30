import { RadioButtons } from "@/lib/components/form/RadioButtons";
import { DurationType } from "@/features/contests/oneOfX/store/contestDuration";
import { useContestDuration } from "@/features/contests/oneOfX/hooks/useContestDuration";

export const Duration = () => {
  const { setContestDuration, contestDuration, durationOptions } =
    useContestDuration();

  const handleRadioChange = (value: DurationType) => {
    console.log(value);
    setContestDuration(value);
  };

  return (
    <RadioButtons
      options={durationOptions}
      selectedOption={contestDuration}
      onChange={handleRadioChange}
    />
  );
};
