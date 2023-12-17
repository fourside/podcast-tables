import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { Search, User } from "react-feather";
import { FirebaseUser, signOut } from "./auth-context";
import { DropdownMenu } from "./dropdown-menu";
import classes from "./header-layout.module.css";

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
    <header className={classes.header}>
      <div className={classes.titleWrapper}>
        <Link href={"/"}>
          <h1 className={classes.title}>podcast tables</h1>
        </Link>
      </div>
      {props.user !== undefined && (
        <div className={classes.content}>
          {!props.inSearchPage && (
            <Link
              href="/search"
              className={classes.link}
            >
              <Search size={16} /> search
            </Link>
          )}
          <div className={classes.user}>
            <User size={20} style={{ flexShrink: 0 }} />
            {props.user.email}
          </div>
          <DropdownMenu user={props.user} />
          <button
            onClick={props.onSignOut}
            className={classes.signOutButton}
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
};
