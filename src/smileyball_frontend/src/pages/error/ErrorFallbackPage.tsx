import { NavLink } from "react-router-dom";
import { ContentBox } from "@/lib/layout/ContentBox";

export const ErrorFallbackPage = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="mt-10 flex max-w-[900px]">
        <ContentBox isError className="flex-col">
          <div className="flex font-sequel100Black text-[24px] font-95 italic text-grey">
            Error
          </div>
          <div className="flex flex-col">
            <p className="flex font-sequel100Black text-[14px] font-95 uppercase text-white">
              {error.message}
            </p>
            <p className="flex font-sequel100Black text-[14px] font-95 uppercase text-white">
              Back to{" "}
              <NavLink className="ml-1 flex uppercase text-grey" to={"/"}>
                Homepage
              </NavLink>
              .
            </p>
          </div>
        </ContentBox>
      </div>
    </div>
  );
};
