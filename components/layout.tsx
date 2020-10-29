import { ReactNode } from "react";
import Head from "next/head";

import styles from "./layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>podcast tables</title>
      </Head>
      <header className={styles.header}>
        <h1>podcast tables</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
export default Layout;