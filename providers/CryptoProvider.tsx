import React, { useMemo, useState } from "react";
import { ChildrenProps, Currency } from "../utils/types";

export const CryptoContext = React.createContext<
  | {
      currency: Currency;
      currencyCount: number;
      totalMarketCap: {
        value: number;
        increase: number;
      };
      setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
      setCurrencyCount: React.Dispatch<React.SetStateAction<number>>;
      setTotalMarketCap: React.Dispatch<
        React.SetStateAction<{
          value: number;
          increase: number;
        }>
      >;
    }
  | undefined
>(undefined);

CryptoContext.displayName = "CryptoContext";

export const CryptoProvider = ({ children }: { children: ChildrenProps }) => {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [currencyCount, setCurrencyCount] = useState(0);
  const [totalMarketCap, setTotalMarketCap] = useState({
    value: 0,
    increase: 0,
  });

  const value = useMemo(() => {
    return {
      currency,
      currencyCount,
      totalMarketCap,
      setCurrency,
      setTotalMarketCap,
      setCurrencyCount,
    };
  }, [currency, totalMarketCap, currencyCount]);
  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};
