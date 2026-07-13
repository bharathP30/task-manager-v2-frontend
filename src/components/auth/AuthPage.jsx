import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const [haveAcc, setHaveAcc] = useState(() => {
    const saved = localStorage.getItem('saved');
    return saved ? JSON.parse(saved): false
  });

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(haveAcc));
  }, [haveAcc]);

  return (
    <>
      {haveAcc ? (<Login setHaveAcc={setHaveAcc} />) 
              : (<Signup setHaveAcc={setHaveAcc} />)}
    </>
  )
}

export default AuthPage
