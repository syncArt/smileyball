import { ContentBox } from "@/components";
import { NavLink } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <ContentBox isError className="h-full w-full flex-col">
      <div className="flex font-sequel100Black text-[24px] font-95 italic text-grey">
        Error - page not found.
      </div>
      <div className="flex flex-col">
        <p className="flex font-sequel100Black text-[14px] font-95 uppercase text-white">
          Back to{" "}
          <NavLink className="ml-1 flex uppercase text-grey" to={"/"}>
            Homepage
          </NavLink>
          .
        </p>
      </div>
    </ContentBox>
  );
};
