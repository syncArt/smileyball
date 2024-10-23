import { useAuth } from "@/lib/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginWithII } from "@/features/signIn/LoginWithII";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from: string = location.state?.from?.pathname || "/";

  const handleLoginLogout = () => {
    login(() => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <LoginWithII handleLoginLogout={handleLoginLogout} />
    </div>
  );
};
