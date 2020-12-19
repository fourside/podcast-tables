import React from "react";
import Head from "next/head";

import { Header } from "./Header";

const Layout: React.FC = ({ children }) => {
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
