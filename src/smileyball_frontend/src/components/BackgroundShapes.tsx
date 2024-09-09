import BgShapeSVG from "../assets/images/bg-shape.svg";

export const BackgroundShapes = () => {
  return (
    <div className="m-auto bg-shape min-w-[2200px] w-full absolute flex justify-center">
      <div className="absolute left-0 top-0">
        <BgShapeSVG />
      </div>
      <div className="absolute right-0 top-0 rotate-[180deg]">
        <BgShapeSVG />
      </div>
    </div>
  );
};
