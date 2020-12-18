import React from "react";
import Head from "next/head";
import styled from "styled-components";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Head>
        <title>podcast tables</title>
      </Head>
      <Header>
        <h1>podcast tables</h1>
      </Header>
      <main>{children}</main>
    </Container>
  );
}
export default Layout;

const Container = styled.div({
  maxWidth: "720px",
  margin: "3rem auto 6rem",
});

const Header = styled.header({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
