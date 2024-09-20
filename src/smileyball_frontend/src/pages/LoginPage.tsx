import IIButtonSvg from "@/assets/images/II-login-button.svg";
import { useAuth } from "@/hooks";

export const LoginPage = () => {
  const { login } = useAuth();

  const handleLoginLogout = () => {
    login();
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative mt-10 flex h-[140px] w-full max-w-[420px] flex-col items-center rounded-medium bg-gray-300 before:absolute before:left-0 before:top-0 before:-z-10 before:h-[140px] before:w-full before:bg-primary before:opacity-0 before:blur-xl before:duration-300 hover:before:opacity-100">
        <span className="mt-8 flex font-spaceMono text-[12px] font-bold uppercase text-grey">
          Login with Internet Identity
        </span>
        <button
          className="flex w-[214px] border-0 bg-transparent"
          onClick={handleLoginLogout}
        >
          <IIButtonSvg />
        </button>
      </div>
    </div>
  );
};
