import { ChangeEvent } from "react";

type CheckboxProps = {
  name: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
};

export const Checkbox = ({
  name,
  id,
  onChange,
  checked,
  label,
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-5 w-5 appearance-none rounded-sm border-2 border-grey bg-white checked:border-grey checked:bg-grey focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2"
        name={name}
        id={id}
        onChange={onChange}
        checked={checked}
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-black">
          {label}
        </label>
      )}
    </div>
  );
};
