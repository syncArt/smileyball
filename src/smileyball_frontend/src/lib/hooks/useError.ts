import { useAtom } from "jotai";
import { errorAtom } from "@/lib/store/error";

const useComponentError = (componentName: string) => {
  const [errorState, setErrorState] = useAtom(errorAtom);

  const setComponentError = (errorMessage: string) => {
    setErrorState((prevState) => ({
      ...prevState,
      [componentName]: errorMessage,
    }));
  };

  const clearComponentError = () => {
    setErrorState((prevState) => ({
      ...prevState,
      [componentName]: null,
    }));
  };

  return {
    error: errorState[componentName],
    setComponentError,
    clearComponentError,
  };
};

export default useComponentError;
