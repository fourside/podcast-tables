import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import Layout from "../components/layout";
import { SignInButton, useAuth } from "../context/auth";

const SignInPage: NextPage = () => {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState === "success") {
      Router.push("/");
    }
  }, [authState]);

  if (authState === "unknown") {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-[360px] min-h-[240px] mx-auto my-12 rounded-xl border-slate-100 flex flex-col gap-8">
        <h2 className="text-center text-slate-700">Sign in</h2>
        <SignInButton />
      </div>
    </Layout>
  );
};

export default SignInPage;
