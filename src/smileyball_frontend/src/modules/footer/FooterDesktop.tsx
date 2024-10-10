import { Logo } from "@/components";

export const FooterDesktop = () => {
  return (
    <div className="ml-24 mt-10 hidden w-full flex-col items-center justify-center laptop:flex">
      <div className="space-between flex w-full">
        <ul className="relative flex flex-col justify-end text-[33px] decoration-0">
          <li className="flex w-full font-sequel100Black text-white">
            <a href="https://oc.app/group/q7rj4-yqaaa-aaaar-bihga-cai/?ref=njbmo-taaaa-aaaar-alzwq-cai">
              OPENCHAT
            </a>
          </li>
          <li className="ml-10 flex w-full font-sequel100Black text-pink">
            <a href="https://t.me/+9I3XBbur9Mo1MmQ0">TELEGRAM</a>
          </li>
          <li className="ml-20 flex w-full font-sequel100Black text-primary">
            <a href="https://x.com/giveSmileyball">TWITTER/X</a>
          </li>
          <li className="ml-32 flex w-full font-sequel100Black text-blue">
            <a href="https://discord.gg/YFubApzuQj"> DISCORD </a>
          </li>
        </ul>
        <div className="flex w-full flex-col">
          <ul className="my-3 flex w-full flex-col items-end justify-center gap-2 text-[24px]">
            <li className="flex font-spaceMono text-white">
              <a href="https://github.com/syncArt/smileyball">GITHUB</a>
            </li>
            <li className="flex font-spaceMono text-white">
              <a href="/the-creators">ABOUT CREATORS</a>
            </li>
          </ul>
          <div className="my-3 flex w-full justify-end">
            <Logo />
          </div>
          <span className="flex w-full justify-end font-spaceMono text-primary">
            Smileyball, Warsaw, 2024
          </span>
        </div>
      </div>
    </div>
  );
};
