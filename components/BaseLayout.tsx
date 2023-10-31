import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { ChildrenProps, CryptoGlobals, Currency } from "../utils/types";
import { UiContext } from "../providers/UiProvider";
import { formatCurrency, formatNumber } from "../utils/common";
import { CryptoContext } from "../providers/CryptoProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import variables from "../styles/variables.module.scss";

const BaseLayout = ({ children }: { children: ChildrenProps }) => {
  const axios = useAxios();
  const ui = useContext(UiContext);
  const crypto = useContext(CryptoContext);
  const [globals, setGlobals] = useState<CryptoGlobals>();

  useEffect(() => {
    ui?.setIsLoading(true);
    axios
      .get("global")
      .then(({ data }: { data: { data: CryptoGlobals } }) => {
        setGlobals(data.data);
        crypto?.setTotalMarketCap({
          value: data.data.total_market_cap["usd"],
          increase: data.data.market_cap_change_percentage_24h_usd,
        });
        crypto?.setCurrencyCount(data.data.active_cryptocurrencies);
      })
      .catch((e) => ui?.setShowAxiosError(true))
      .finally(() => {
        ui?.setIsLoading(false);
      });
  }, []);

  const generateDominance = () => {
    if (globals?.market_cap_percentage) {
      const shares: [string, number][] = Object.keys(globals.market_cap_percentage).map((key) => [
        key,
        globals.market_cap_percentage[key],
      ]);
      shares.sort((a, b) => b[1] - a[1]);
      return `${shares[0][0].toUpperCase()}: ${formatNumber(
        shares[0][1],
      )}%, ${shares[1][0].toUpperCase()}: ${formatNumber(shares[1][1])}%`;
    } else {
      return "";
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    crypto?.setCurrency(event.target.value as Currency);
  };

  return (
    <>
      <div className="appBar">
        <div className="crypto-globals">
          <div className="global-item">
            <div className="tile">Coins:</div>
            <div className="value">{globals?.active_cryptocurrencies}</div>
          </div>
          <div className="global-item">
            <div className="tile">Exchanges:</div>
            <div className="value">{globals?.markets}</div>
          </div>
          <div className="global-item">
            <div className="tile">Ongoing ICOs:</div>
            <div className="value">{globals?.ongoing_icos}</div>
          </div>
          <div className="global-item">
            <div className="tile">Upcoming ICOs:</div>
            <div className="value">{globals?.upcoming_icos}</div>
          </div>
          <div className="global-item">
            <div className="tile">Market Cap:</div>
            <div className="value">
              {formatCurrency("usd", crypto?.totalMarketCap.value as number)}
              &nbsp;
              <span
                style={{
                  color:
                    crypto && crypto?.totalMarketCap?.increase >= 0 ? variables.successColor : variables.errorColor,
                }}
              >
                ({crypto && crypto?.totalMarketCap?.increase >= 0 ? <>&#8613;</> : <>&#8615;</>}
                {formatNumber(crypto?.totalMarketCap?.increase as number)}%)
              </span>
            </div>
          </div>
          <div className="global-item">
            <div className="tile">Dominance:</div>
            <div className="value">{generateDominance()}</div>
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select value={crypto?.currency} onChange={handleChange} displayEmpty size="small" variant="outlined">
              <MenuItem value={"usd"}>USD</MenuItem>
              <MenuItem value={"eur"}>EUR</MenuItem>
              <MenuItem value={"jpy"}>JPY</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ padding: "0px 60px 40px 60px" }}>{children}</div>
    </>
  );
};

export default BaseLayout;
