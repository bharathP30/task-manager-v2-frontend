import { Toaster } from 'react-hot-toast';
import Auth from "./components/auth/AuthPage.jsx";
import Home from "./components/pages/Home.jsx";
import useAuth from "./components/functions/useAuth.js";

export default function App() {
  const [auth, setAuth] = useAuth();
  const BASE_API = import.meta.env.VITE_API_URL;

  if (!auth) {
    <Toaster position="top-right" />
    return <Auth setAuth={setAuth} api={BASE_API} />
  }

  return (
    <>
      <Toaster position="top-right" />
      <Home api={BASE_API} token={auth.token} setAuth={setAuth} />
    </>
  )
}


