# Getting Started with Usermaven and Next.js

This project shows how to track events with Usermaven and Next.js using Usermaven JS SDK.

The first thing you want to do is to install the usermaven-sdk-js library in your project - so add it using your package manager:

`yarn add @usermaven/sdk-js`

or

`npm install --save @usermaven/sdk-js`

After that, we want to initialize the Usermaven instance in `pages/_app.js` or `pages/_app.tsx`

### For Typescript

```ts
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
      key: "YOUR_PROJECT_KEY",
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
```

### For Javascript

```js
import { useRouter } from 'next/router';
import { usermavenClient } from "@usermaven/sdk-js";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
   // Init Usermaven
    const usermaven: UsermavenClient = usermavenClient({
      key: "YOUR_PROJECT_KEY",
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
```

### Note

By default Usermaven does not send the pageview event when SDK is initialized. The pageview track event is only fired when page/route changes. If you'd like to send an event when someone opens your website/app, you'll need to trigger the pageview event on main page.

```ts
 useEffect(() => {
    // Init Usermaven
    const usermaven: UsermavenClient = usermavenClient({
      key: "UMHixXCh1k",
      tracking_host: "https://events.usermaven.com",
    });

    // Track page views
    usermaven.track("pageview");
  }, []);
```