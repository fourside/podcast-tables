import { useEffect } from "react";
import Router from "next/router";

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
     <div className="container">
       <SignInButton />
     </div>
  )
}

export default Login;
