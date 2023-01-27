import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState } from "react";
import getQueryClient from "../utils/queryClient";
import { Hydrate, QueryClientProvider } from "react-query";
import "@etchteam/next-pagination/dist/index.css";
import Layout from "../components/Layout";


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedAuthState}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </Hydrate>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}
