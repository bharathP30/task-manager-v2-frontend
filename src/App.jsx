
import Auth from "./components/auth/AuthPage.jsx";
import Home from "./components/pages/Home.jsx";
import useAuth from "./components/functions/useAuth.js";

export default function App() {
  const [auth, setAuth] = useAuth();
  const BASE_API = import.meta.env.VITE_API_URL;

  
  console.log("Auth page -", !auth, "auth details :", auth?.user.name, auth?.user._id)

  if (!auth) {
  
    return <Auth setAuth={setAuth} api={BASE_API} />
  }

  return (
    <>
      <Home api={BASE_API} token={auth.token} setAuth={setAuth} />
    </>
  )
}


