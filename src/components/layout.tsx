import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Header } from "./header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>podcast tables</title>
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
