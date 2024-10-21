import { NavLink } from "react-router-dom";
import Arrow from "@/assets/images/hamburger-menu-arrow.svg";
import React, { useRef, useState } from "react";

type PageMenuProps = {
  menuData: { name: string; link: string }[];
};

export const PageMenu = ({ menuData }: PageMenuProps) => {
  const [arrowPosition, setArrowPosition] = useState(40);
  const containerRef = useRef(null);
  const arrowRef = useRef(null);

  const handleSelection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget;
    setArrowPosition(button.offsetLeft);
  };

  return (
    <div
      className="relative -left-[26px] flex h-[60px] w-[calc(100%+52px)] items-center justify-start gap-10 border-y-4 border-white bg-grey pl-[36px]"
      ref={containerRef}
    >
      {menuData.map(({ name, link }) => (
        <NavLink
          to={link}
          onClick={handleSelection}
          end
          className="relative top-[1px] flex items-center"
        >
          {({ isActive }) => {
            return (
              <>
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
      <Arrow
        ref={arrowRef}
        className={`absolute top-0 h-full w-[20px] transition-transform duration-500 ease-in-out`}
        fill="#2EF867"
        style={{ transform: `translateX(${arrowPosition - 50}px)` }}
      />
    </div>
  );
};
