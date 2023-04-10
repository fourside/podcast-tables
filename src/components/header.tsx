import Link from "next/link";
import Router from "next/router";
import { FC } from "react";
import { User } from "react-feather";
import { FirebaseUser } from "../context/auth";
import { signOut } from "../lib/firebase";
import { DropdownMenu } from "./dropdown-menu";

type Props = {
  user?: FirebaseUser;
};

export const Header: FC<Props> = ({ user }) => {
  const handleSignOut = async () => {
    await signOut();
    Router.push("/signin");
  };

  return (
    <header className="flex justify-between border-b border-b-slate-200">
      <div className="p-4">
        <Link href={"/"}>
          <h1 className="text-slate-800 m-0 text-3xl">podcast tables</h1>
        </Link>
      </div>
      {user !== undefined && (
        <div className="flex items-center gap-8 p-2">
          <div className="text-slate-800 flex gap-1 items-center">
            <User size={20} style={{ flexShrink: 0 }} />
            {user.email}
          </div>
          <DropdownMenu user={user} />
          <Button onClick={handleSignOut} label={"Sign out"} />
        </div>
      )}
    </header>
  );
};

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border border-slate-200 rounded-lg text-slate-500 py-2 px-3 text-sm cursor-pointer hover:shadow hover:shadow-slate-200"
    >
      {label}
    </button>
  );
};
