import React from "react";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  // You can include any global styles or configurations

  return <Component {...pageProps} />;
}

export default MyApp;
