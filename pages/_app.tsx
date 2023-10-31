import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/global.scss";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { StrictMode } from "react";
import { UiProvider } from "../providers/UiProvider";
import { CryptoProvider } from "../providers/CryptoProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
      <CryptoProvider>
        <UiProvider>
          <Component {...pageProps} />
        </UiProvider>
      </CryptoProvider>
    </StrictMode>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
