"use client";
import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { signIn, useAuth } from "../../components/auth-context";
import { HeaderLayout } from "../../components/header-layout";
import { Loading } from "../../components/loading";

export const SignInPage: FC = () => {
  const authState = useAuth();

  useEffect(() => {
    if (authState.type === "authenticated") {
      Router.push("/");
    }
  }, [authState]);

  const [loading, setLoading] = useState(false);
  const handleSignInClick = async () => {
    setLoading(true);
    try {
      await signIn();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (authState.type === "initialized" || authState.type === "authenticated") {
    return <Loading />;
  }

  return (
    <HeaderLayout>
      <div className="max-w-[360px] min-h-[240px] mx-auto my-12 rounded-xl border-slate-100 flex flex-col gap-8 items-center">
        <button
          onClick={handleSignInClick}
          className="w-52 border border-slate-500 rounded-lg grid grid-cols-[auto,1fr] items-center py-2 px-4 text-sm text-slate-700 hover:shadow"
          disabled={loading}
        >
          {loading ? (
            "Signing in..."
          ) : (
            <>
              <GoogleIcon />
              Sign In
            </>
          )}
        </button>
      </div>
    </HeaderLayout>
  );
};

const GoogleIcon: FC = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      height="1.5em"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"></path>
    </svg>
  );
};
