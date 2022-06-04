import React from "react";
import type { AppProps } from "next/app";
import "../../styles/index.scss";

import { GlobalFilterProvider } from "../components/helpers/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalFilterProvider>
      <Component {...pageProps} />
    </GlobalFilterProvider>
  );
}

export default MyApp;
