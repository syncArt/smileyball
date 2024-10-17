import { NavLink } from "react-router-dom";
import Arrow from "@/assets/images/hamburger-menu-arrow.svg";

type PageMenuProps = {
  menuData: { name: string; link: string }[];
};

export const PageMenu = ({ menuData }: PageMenuProps) => {
  return (
    <div className="relative -left-[26px] flex h-[60px] w-[calc(100%+52px)] items-center justify-start gap-10 border-y-4 border-white bg-grey pl-[36px]">
      {menuData.map(({ name, link }) => (
        <NavLink to={link} end className="relative flex items-center">
          {({ isActive }) => {
            return (
              <>
                {isActive && (
                  <Arrow
                    className="absolute -left-3 flex w-[20px]"
                    fill="primary"
                  />
                )}
                <p
                  className={` ${isActive ? `text-primary` : `text-white`} relative mx-4 flex items-center font-sequel100Black font-55 uppercase`}
                >
                  {name}
                </p>
              </>
            );
          }}
        </NavLink>
      ))}
    </div>
  );
};
