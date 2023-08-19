import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { Search, User } from "react-feather";
import { FirebaseUser, signOut } from "./auth-context";
import { DropdownMenu } from "./dropdown-menu";

type Props = {
  user?: FirebaseUser;
};

export const HeaderLayout: FC<PropsWithChildren<Props>> = ({ children, user }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <div>
      <Header user={user} inSearchPage={pathname === "/search"} onSignOut={handleSignOut} />
      <main>{children}</main>
    </div>
  );
};

type HeaderProps = {
  user?: FirebaseUser;
  inSearchPage: boolean;
  onSignOut: () => Promise<void>;
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className="flex justify-between border-b border-b-slate-200">
      <div className="p-4">
        <Link href={"/"}>
          <h1 className="text-slate-800 m-0 text-3xl">podcast tables</h1>
        </Link>
      </div>
      {props.user !== undefined && (
        <div className="flex items-center gap-8 p-2">
          {!props.inSearchPage && (
            <Link
              href="/search"
              className="grid grid-cols-[auto,1fr] gap-2 items-center text-slate-500 hover:border-b hover:border-b-slate-500"
            >
              <Search size={16} /> search
            </Link>
          )}
          <div className="text-slate-800 flex gap-1 items-center">
            <User size={20} style={{ flexShrink: 0 }} />
            {props.user.email}
          </div>
          <DropdownMenu user={props.user} />
          <button
            onClick={props.onSignOut}
            className="bg-transparent border border-slate-200 rounded-lg text-slate-500 py-2 px-3 text-sm cursor-pointer hover:shadow hover:shadow-slate-200"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
};
