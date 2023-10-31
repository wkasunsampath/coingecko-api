import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { UiContext } from "../providers/UiProvider";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { CurrencyMarket, EnhancedTableProps, HeadCell } from "../utils/types";
import { CryptoContext } from "../providers/CryptoProvider";
import Box from "@mui/material/Box";
import { formatCurrency, formatNumber } from "../utils/common";
import variables from "../styles/variables.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import CryptoSearch from "../components/CryptoSearch";

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "#",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Coin",
  },
  {
    id: "current_price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "price_change_percentage_1h_in_currency",
    numeric: true,
    disablePadding: false,
    label: "1h",
  },
  {
    id: "price_change_percentage_24h_in_currency",
    numeric: true,
    disablePadding: false,
    label: "24h",
  },
  {
    id: "price_change_percentage_7d_in_currency",
    numeric: true,
    disablePadding: false,
    label: "7d",
  },
  {
    id: "total_volume",
    numeric: true,
    disablePadding: false,
    label: "Total Volume",
  },
  {
    id: "market_cap",
    numeric: true,
    disablePadding: false,
    label: "Mkt Cap",
  },
  {
    id: "low_24h",
    numeric: true,
    disablePadding: false,
    label: "Last 7 Days",
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default function Index() {
  const axios = useAxios();
  const ui = useContext(UiContext);
  const crypto = useContext(CryptoContext);
  const [markets, setMarkets] = useState<CurrencyMarket[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    ui?.setIsLoading(true);
    axios
      .get(
        `coins/markets?vs_currency=${crypto?.currency}&page=${
          activePage + 1
        }&per_page=${rowsPerPage}&price_change_percentage=1h,24h,7d`,
      )
      .then(({ data }: { data: CurrencyMarket[] }) => {
        setMarkets(data);
      })
      .catch((e) => {
        ui?.setShowAxiosError(true);
        setMarkets([]);
      })
      .finally(() => {
        ui?.setIsLoading(false);
      });
  }, [crypto?.currency, activePage, rowsPerPage]);

  const getCoinId = (imageLink: string) => {
    return parseInt(imageLink.split("https://assets.coingecko.com/coins/images/")[1].split("/large/")[0]);
  };

  return (
    <>
      <Head>
        <title>Crypto Info - Home</title>
      </Head>
      <div className="display-in-row">
        <h1>Hello, Cryptoholics!</h1>
        <div style={{ marginLeft: "auto" }}>
          <CryptoSearch />
        </div>
      </div>

      <div className="page-title">Cryptocurrency Prices by Market Cap</div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        {ui?.isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "50px 0px" }}>
            <CircularProgress />
          </Box>
        )}
        {!ui?.isLoading && (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"small"}>
                <EnhancedTableHead order={"asc"} orderBy={"asc"} />
                <TableBody>
                  {markets?.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) => {
                          window.location.assign(`https://www.coingecko.com/en/coins/${row.id}`);
                        }}
                        role="checkbox"
                        aria-checked={false}
                        tabIndex={-1}
                        key={row.id}
                        selected={false}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell component="th" scope="row">
                          {row.market_cap_rank}
                        </TableCell>
                        <TableCell>
                          <div className="display-in-row">
                            <div style={{ marginTop: "5px" }}>
                              <img src={row.image} alt="" width={16} />{" "}
                            </div>
                            <div style={{ fontWeight: 500, margin: "0px 10px" }}>{row.name}</div>{" "}
                            <div
                              style={{
                                color: variables.secondaryColor,
                                fontSize: "12px",
                              }}
                            >
                              {row.symbol.toUpperCase()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(crypto?.currency as string, row.current_price)}
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              color:
                                row.price_change_percentage_1h_in_currency >= 0
                                  ? variables.successColor
                                  : variables.errorColor,
                            }}
                          >
                            {row.price_change_percentage_1h_in_currency >= 0 ? <>&#8613; </> : <>&#8615; </>}
                            {formatNumber(row.price_change_percentage_1h_in_currency)}%
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              color:
                                row.price_change_percentage_24h_in_currency >= 0
                                  ? variables.successColor
                                  : variables.errorColor,
                            }}
                          >
                            {row.price_change_percentage_24h_in_currency >= 0 ? <>&#8613; </> : <>&#8615; </>}
                            {formatNumber(row.price_change_percentage_24h_in_currency)}%
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              color:
                                row.price_change_percentage_7d_in_currency >= 0
                                  ? variables.successColor
                                  : variables.errorColor,
                            }}
                          >
                            {row.price_change_percentage_7d_in_currency >= 0 ? <>&#8613; </> : <>&#8615; </>}
                            {formatNumber(row.price_change_percentage_7d_in_currency)}%
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(crypto?.currency as string, row.total_volume)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(crypto?.currency as string, row.market_cap)}
                        </TableCell>
                        <TableCell align="right">
                          <div style={{ marginTop: "5px" }}>
                            <img
                              src={`https://www.coingecko.com/coins/${getCoinId(row.image)}/sparkline.svg`}
                              alt=""
                              width={100}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {markets.length === 0 && (
                    <TableRow
                      style={{
                        height: 200,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 15, 25]}
              component="div"
              count={crypto?.currencyCount as number}
              rowsPerPage={rowsPerPage}
              page={activePage}
              onPageChange={(event: unknown, newPage: number) => {
                setActivePage(newPage);
              }}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
              }}
            />
          </>
        )}
      </Paper>
    </>
  );
}
