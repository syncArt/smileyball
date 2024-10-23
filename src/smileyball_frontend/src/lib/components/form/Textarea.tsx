import { ChangeEvent } from "react";

type TextareaProps = {
  name: string;
  id: string;
  cols: number;
  rows: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder: string;
};

export const Textarea = ({
  name,
  rows,
  onChange,
  cols,
  value,
  id,
  placeholder,
}: TextareaProps) => {
  return (
    <textarea
      className="rounded-lg border border-black bg-mattGreen p-1 text-black placeholder-grey"
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
