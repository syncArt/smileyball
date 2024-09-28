import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  const handleRedirectHomepage = () => {
    navigate("/");
  };

  return (
    <span
      onClick={handleRedirectHomepage}
      className="align-center z-1 logo-wrapper pointer-events-none relative flex shrink-0 cursor-pointer flex-col flex-wrap justify-center border-0 bg-transparent font-[5px] outline-0"
    >
      <p>🌕🌕🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌕🌕🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌕🌕🌕🌕🌕🌕🌕</p>
      <p>🌕🌕🌕🌑🌕🌕🌕🌑🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌑🌕🌕🌕🌑🌕🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌑🌕🌕🌕🌑🌕🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌕🌕🌕🌕🌕🌕🌕🌕🌕</p>
      <p>🌕🌕🌑🌕🌕🌕🌕🌕🌕🌕🌑🌕🌕</p>
      <p>🌕🌕🌑🌕🌕🌕🌕🌕🌕🌕🌑🌕🌕</p>
      <p>🌕🌕🌑🌕🌕🌕🌕🌕🌑🌕🌕</p>
      <p>🌕🌕🌕🌑🌑🌑🌑🌑🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌕🌕🌕🌕🌕</p>
      <p>🌕🌕🌕🌕🌕</p>
    </span>
  );
};
