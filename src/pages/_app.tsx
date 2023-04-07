import type { AppProps } from "next/app";
import Router from "next/router";
import { useState } from "react";
import { Loading } from "../components/loading";
import { AuthProvider } from "../context/auth";
import { ToastProvider } from "../context/toast";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </AuthProvider>
  );
}
