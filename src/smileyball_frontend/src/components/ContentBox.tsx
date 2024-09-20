import BottomDecoration from "@/assets/images/bottom-decoration.svg";
import { ReactNode } from "react";

export const ContentBox = ({
  children,
  className = "",
  isError = false,
}: {
  children: ReactNode;
  isError?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`${isError ? "to-error" : "to-primary"} relative z-[2] flex w-full items-center justify-center rounded-t-medium bg-gradient-to-b from-white`}
    >
      <div
        className={`${isError ? "bg-error" : "bg-primary"} relative top-[4px] flex h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-t-[18px]`}
      >
        <div className={`${className} flex h-full w-full p-[22px]`}>
          {children}
        </div>
      </div>
      <div className="absolute bottom-1 flex w-full translate-y-full self-end">
        <BottomDecoration className={isError ? "fill-error" : "fill-primary"} />
      </div>
    </div>
  );
};
