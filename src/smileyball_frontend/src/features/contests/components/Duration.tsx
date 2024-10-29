import { RadioButtons } from "@/lib/components/form/RadioButtons";
import React from "react";

export const Duration = () => {
  const durationOptions = [
    { label: "3 days", value: "3-days" },
    { label: "One week", value: "one-week" },
    { label: "Two weeks", value: "two-weeks" },
  ];

  return (
    <RadioButtons
      options={durationOptions}
      selectedOption={""}
      onChange={() => {}}
    />
  );
};
