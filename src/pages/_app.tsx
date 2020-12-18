import { useState } from "react"
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Router from "next/router";

import { Loading } from "../components/Loading";
import "../styles/globals.css";
import { AuthProvider } from "../context/Auth";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
