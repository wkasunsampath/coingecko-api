import React, { useMemo, useState } from "react";
import { ChildrenProps } from "../utils/types";
import BaseLayout from "../components/BaseLayout";
import { Alert, Snackbar } from "@mui/material";

export const UiContext = React.createContext<
  | {
      isLoading: boolean;
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
      setShowAxiosError: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

UiContext.displayName = "UiContext";

export const UiProvider = ({ children }: { children: ChildrenProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAxiosError, setShowAxiosError] = useState(false);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAxiosError(false);
  };
  const value = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      setShowAxiosError,
    };
  }, [isLoading]);
  return (
    <UiContext.Provider value={value}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showAxiosError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">Something went wrong while fetching data!</Alert>
      </Snackbar>
      <BaseLayout>{children}</BaseLayout>
    </UiContext.Provider>
  );
};
