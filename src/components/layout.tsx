import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { FirebaseUser } from "../context/auth";
import { Header } from "./header";

type Props = {
  user?: FirebaseUser;
};

const Layout: FC<PropsWithChildren<Props>> = ({ children, user }) => {
  return (
    <div>
      <Head>
        <title>podcast tables</title>
      </Head>
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
