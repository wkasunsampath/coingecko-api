import { Box, Divider, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { UiContext } from "../providers/UiProvider";
import { Coin, TrendingCoin } from "../utils/types";
import CoinListItem from "./CoinListItem";
import CircularProgress from "@mui/material/CircularProgress";

const CryptoSearch = () => {
  const [searchPhase, setSearchPhase] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [tendingCoins, setTendingCoins] = useState<TrendingCoin[]>([]);
  const [searchedCoins, setSearchedCoins] = useState<Coin[]>([]);
  const axios = useAxios();
  const ui = useContext(UiContext);

  useEffect(() => {
    axios
      .get("search/trending")
      .then(({ data }: { data: { coins: TrendingCoin[] } }) => {
        setTendingCoins(data.coins);
      })
      .catch((e) => ui?.setShowAxiosError(true));
  }, []);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchPhase) {
        setIsSearching(true);
        axios
          .get(`search?query=${searchPhase}`)
          .then((response) => {
            setSearchedCoins(response.data.coins);
          })
          .catch((e) => ui?.setShowAxiosError(true))
          .finally(() => setIsSearching(false));
      } else {
        setSearchedCoins([]);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [searchPhase]);

  return (
    <>
      <div className="search-box">
        <TextField
          label="Search Crypto"
          variant="outlined"
          size="small"
          sx={{ width: "300px" }}
          value={searchPhase}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onChange={(event) => setSearchPhase(event.target.value)}
          inputProps={{
            "data-testid": "text-field",
          }}
        />
        {showDropdown && (
          <div className="dropdown">
            <div className="dropdown-body">
              {!isSearching && (
                <div className="tending-coins">
                  {searchedCoins.map((coin, idx) => {
                    return <CoinListItem coin={coin} key={idx} />;
                  })}
                  <div className="title">Trending coins:</div>
                  <Divider style={{ marginBottom: "10px" }} />
                  {tendingCoins.map((coin, idx) => {
                    return <CoinListItem coin={coin.item} key={idx} />;
                  })}
                </div>
              )}
              {isSearching && (
                <Box sx={{ display: "flex", justifyContent: "center", padding: "50px 0px" }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CryptoSearch;
