import { Toaster } from 'react-hot-toast';
import Auth from "./components/auth/AuthPage.jsx";
import Home from "./components/pages/Home.jsx";
import useAuth from "./components/functions/useAuth.js";

export default function App() {
  const [auth, setAuth] = useAuth();

  if (!auth) {
   return ( 
    <>
      <Toaster position="top-right" />
      <Auth setAuth={setAuth} /> 
    </>
  )
}

  return (
    <>
      <Toaster position="top-right" />
      <Home token={auth.token} setAuth={setAuth} />
    </>
  )
}


