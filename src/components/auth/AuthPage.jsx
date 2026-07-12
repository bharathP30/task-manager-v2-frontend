import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { useEffect, useState } from "react";

const AuthPage = ({ setAuth }) => {
  const [haveAcc, setHaveAcc] = useState(() => {
    const saved = localStorage.getItem('saved');
    return saved ? JSON.parse(saved): false
  });

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(haveAcc));
  }, [haveAcc]);

  return (
    <>
      {haveAcc ? (<Login setAuth={setAuth} setHaveAcc={setHaveAcc} />) 
              : (<Signup setAuth={setAuth} setHaveAcc={setHaveAcc} />)}
    </>
  )
}

export default AuthPage
