import { useEffect } from "react";
import Router from "next/router";
import styled from "styled-components";

import Layout from "../components/layout";
import { useAuth, SignInButton } from "../context/Auth";

const Login: React.FC = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  }, [currentUser]);

  if (currentUser === undefined) {
    return null;
  }

  return (
    <Layout>
      <Container>
        <Title>Sign in</Title>
        <SignInButton />
      </Container>
    </Layout>
  )
}

export default Login;

const Title = styled.h2({
  marginBottom: "2em",
  textAlign: "center",
  color: "#888",
});

const Container = styled.div({
  maxWidth: "360px",
  minHeight: "240px",
  margin: "3rem auto 6rem",
  border: "1px solid #eee",
  borderRadius: "10px",
});
