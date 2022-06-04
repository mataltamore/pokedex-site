import React from "react";
import type { AppProps } from "next/app";
import "../../styles/index.scss";

import { GlobalFilterProvider } from "../globals/context/GlobalFilter/GlobalFilterProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalFilterProvider>
      <Component {...pageProps} />
    </GlobalFilterProvider>
  );
}

export default MyApp;
