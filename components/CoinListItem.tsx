import { Coin } from "../utils/types";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import variables from "../styles/variables.module.scss";

const CoinListItem = ({ coin }: { coin: Coin }) => {
  return (
    <>
      <div className="display-in-row coin-row" style={{ marginBottom: "5px" }}>
        <img src={coin.thumb} alt="" width={20} />
        <div style={{ margin: "0px 10px" }}>{coin.name}</div>
        <div>
          <span
            style={{
              color: variables.secondaryColor,
            }}
          >
            {coin.symbol}
          </span>
        </div>
        <div
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={(event) => {
            window.location.assign(`https://www.coingecko.com/en/coins/${coin.id}`);
          }}
        >
          <OpenInNewIcon color="primary" fontSize="small" />
        </div>
      </div>
    </>
  );
};

export default CoinListItem;
