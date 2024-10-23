import { PageMenu } from "@/lib/components/PageMenu";
import { Outlet } from "react-router-dom";
import { ContentBox } from "@/lib/layout/ContentBox";

export const CreateContestPage = () => {
  return (
    <ContentBox>
      <div className="flex w-full flex-col">
        <div className="mb-5 flex flex-col">
          <h1 className="font-sequel100Black text-[24px] font-95 italic">
            ADD CONTEST
          </h1>
          <h2 className="font-120 text-bold text-[18px] italic text-grey">
            FILL THE FORM AND CREATE NEW CONTEST
          </h2>
        </div>
        <PageMenu
          menuData={[
            { name: "New Contest", link: "new" },
            { name: "List", link: "list" },
          ]}
        />
        <Outlet />
      </div>
    </ContentBox>
  );
};
