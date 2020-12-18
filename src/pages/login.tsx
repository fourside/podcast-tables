import { useEffect } from "react";
import Router from "next/router";
import { signIn } from "../lib/firebase";
import { useAuth } from "../context/Auth";

const Login: React.FC = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  }, [currentUser]);

  const handleSignIn = async () => {
    await signIn();
  };

  return (
     <div className="container">
      <button onClick={handleSignIn}>googleでSingInする</button>
     </div>
  )
}

export default Login;
