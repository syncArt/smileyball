import { ReactNode } from "react";

type LabelProps = {
  children?: ReactNode;
  id: string;
  text: string;
};

export const Label = ({ children, id, text }: LabelProps) => {
  return (
    <label htmlFor={id} className="flex w-full flex-col">
      <p className="relative top-1 flex font-sequel100Black font-55 uppercase">
        {text}
      </p>
      {children}
    </label>
  );
};
