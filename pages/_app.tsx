import "../styles/globals.css";
import type { AppProps } from "next/app";

// Import Usermaven client sdk.

import { usermavenClient, UsermavenClient } from "@usermaven/sdk-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Init Usermaven
    const usermaven: UsermavenClient = usermavenClient({
      key: "UMHixXCh1k",
      tracking_host: "https://events.usermaven.com",
    });

    // Track page views
    const handleRouteChange = () => usermaven.track("pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
