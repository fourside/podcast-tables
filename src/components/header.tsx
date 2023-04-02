import Link from "next/link";
import Router from "next/router";
import { FC } from "react";
import { User } from "react-feather";
import { useAuth } from "../context/auth";
import { signOut } from "../lib/firebase";
import { Button } from "./button";
import { DropdownMenu } from "./dropdown-menu";

export const Header: FC = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    Router.push("/signin");
  };

  return (
    <header className="flex justify-between border-b border-b-slate-200">
      <div className="p-4">
        <Link href={"/"}>
          <a>
            <h1 className="text-slate-800 m-0 text-3xl">podcast tables</h1>
          </a>
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-8 p-2">
          <div className="text-slate-800 flex gap-1 items-center">
            <User size={20} style={{ flexShrink: 0 }} />
            {user.email}
          </div>
          <DropdownMenu />
          <Button onClick={handleSignOut} label={"Sign out"} />
        </div>
      )}
    </header>
  );
};
