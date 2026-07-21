import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const [haveAcc, setHaveAcc] = useState(() => {
    const saved = localStorage.getItem('saved');
    return saved ? JSON.parse(saved): false
  });

  //NOTE: there is no real user need for this but i wanted the state to remember it across visits
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(haveAcc));
  }, [haveAcc]);

  return (
    <>
      <div className={
        `absolute min-h-dvh min-w-dvw inset-0 box-border
        bg-[url(https://wallpapercave.com/wp/wp9024400.jpg)]
         bg-cover flex justify-center items-center`} >

            {haveAcc ? (<Login setHaveAcc={setHaveAcc} />) : (<Signup setHaveAcc={setHaveAcc} />)}
            
        </div>
    </>
  )
}

export default AuthPage