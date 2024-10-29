import { ChangeEvent } from "react";
import { Checkbox } from "@/lib/components/form/Checkbox";

type SelectWithCheckboxStyleProps = {
  options: { label: string; value: string }[];
  selectedOption?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButtons = ({
  options,
  selectedOption,
  onChange,
}: SelectWithCheckboxStyleProps) => {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={option.value}
          id={option.value}
          label={option.label}
          checked={selectedOption === option.value}
          onChange={handleOptionChange}
        />
      ))}
    </div>
  );
};
