import { ChangeEvent } from "react";

export type InputProps = {
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  type?: string;
  theme?: "default" | "spotify";
};

export const Input = ({
  onChange,
  type,
  value,
  placeholder,
  name,
  id,
  theme = "default",
}: InputProps) => {
  const themes = {
    default:
      "w-full bg-mattGreen rounded-lg h-10 border border-black p-1 text-black placeholder-grey",
    spotify:
      "w-full bg-mattGreen rounded-lg h-10 border border-black p-1 text-black placeholder-grey font-sequel100Black font-55",
  };

  return (
    <input
      className={themes[theme]}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      id={id}
    />
  );
};
