export const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="relative flex w-full justify-end">
      <div className="relative flex h-[16px] w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 shadow-inner">
        <span
          className="absolute right-0 flex h-[16px] justify-end bg-grey transition-[width] duration-[500ms] ease-in-out"
          style={{
            width: `calc(100% - ${progress}%`,
          }}
        />
      </div>
    </div>
  );
};
