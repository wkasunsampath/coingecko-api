export type ChildrenProps = string | JSX.Element | JSX.Element[];

export type Currency = "usd" | "eur" | "jpy";

export type CryptoGlobals = {
  active_cryptocurrencies: number;
  ended_icos: number;
  markets: number;
  ongoing_icos: number;
  upcoming_icos: number;
  market_cap_percentage: Record<string, number>;
  total_market_cap: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
};

export type CurrencyMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export type Coin = {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: 206;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
};
export type TrendingCoin = {
  item: Coin;
};

export type EnhancedTableProps = {
  order: "asc" | "desc";
  orderBy: string;
};

export type HeadCell = {
  disablePadding: boolean;
  id: keyof CurrencyMarket;
  label: string;
  numeric: boolean;
};
