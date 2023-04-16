import type { AppProps } from "next/app";
import { Noto_Sans_JP } from "next/font/google";
import Router from "next/router";
import { useState } from "react";
import { AuthProvider } from "../components/auth-context";
import { Loading } from "../components/loading";
import { ToastProvider } from "../context/toast";
import "../styles/globals.css";

const notoSansJp = Noto_Sans_JP({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={notoSansJp.className}>
      <AuthProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}
