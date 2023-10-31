import { useMemo, useState } from "react";
import { CryptoProvider } from "../../providers/CryptoProvider";
import { UiContext } from "../../providers/UiProvider";

export default function MockContextWithoutBaseUI({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAxiosError, setShowAxiosError] = useState(false);
  const value = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      setShowAxiosError,
    };
  }, [isLoading]);
  return (
    <CryptoProvider>
      <UiContext.Provider value={value}>{children}</UiContext.Provider>
    </CryptoProvider>
  );
}
