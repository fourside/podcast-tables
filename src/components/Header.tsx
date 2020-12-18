import React from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { signOut } from "../lib/firebase";

import { Button } from "./Button";

export const Header: React.FC = () => {

  const handleSignOut = async () => {
    await signOut();
    Router.push("/login");
  };

  return (
    <_Header>
      <LeftContainer>
        <Link href={"/"}>
          <a><Title>podcast tables</Title></a>
        </Link>
      </LeftContainer>
      <RightContainer>
        <UserName>hogehoe</UserName>
        <Button label={"SignOut"} onClick={handleSignOut} />
      </RightContainer>
    </_Header>
  );
}

const _Header = styled.header({
  display: "flex",
  borderBottom: "1px solid #eee",
  justifyContent: "space-between",
});

const LeftContainer = styled.div({
  padding: "0.5em 0 1em 1em",
});

const RightContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "32px",
  padding: "8px",
});

const Title = styled.h1({
  color: "#333",
  margin: "0",
});

const UserName = styled.div({
});

