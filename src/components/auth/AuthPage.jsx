import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { useState } from "react";

const AuthPage = ({ setAuth }) => {
  const [haveAcc, setHaveAcc] = useState(false);
  
  return (
    <>
      {haveAcc ? (<Login setAuth={setAuth} setHaveAcc={setHaveAcc} />) 
              : (<Signup setAuth={setAuth} setHaveAcc={setHaveAcc} />)}
    </>
  )
}

export default AuthPage
