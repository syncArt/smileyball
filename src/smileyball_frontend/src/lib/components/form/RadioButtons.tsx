import { Checkbox } from "@/lib/components/form/Checkbox";

type SelectWithCheckboxStyleProps<T> = {
  options: { label: string; value: string }[];
  selectedOption?: T;
  onChange: (value: T) => void;
};

export const RadioButtons = <T,>({
  options,
  selectedOption,
  onChange,
}: SelectWithCheckboxStyleProps<T>) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={option.value}
          id={option.value}
          label={option.label}
          checked={selectedOption === option.value}
          onChange={() => {
            onChange(option.value as T);
          }}
        />
      ))}
    </div>
  );
};
