import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { useState } from "react";

const AuthPage = ({ setAuth, api }) => {
  const [haveAcc, setHaveAcc] = useState(false);
  
  console.log("already have an account?", haveAcc);

  return (
    <>
      {haveAcc ? (<Login setAuth={setAuth} api={api} setHaveAcc={setHaveAcc} />) 
              : (<Signup setAuth={setAuth} api={api} setHaveAcc={setHaveAcc} />)}
    </>
  )
}

export default AuthPage
