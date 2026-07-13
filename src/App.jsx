import { Toaster } from 'react-hot-toast';
import Auth from "./components/auth/AuthPage.jsx";
import Home from "./components/pages/Home.jsx";
import { AuthProvider } from './context/AuthProvider.jsx';
import { useAuthContext } from './context/useAuthContext.js';

export default function App() {
  return (
      <AuthProvider>
          <AppContent/>
      </AuthProvider>
  )
}

function AppContent() {
  const { auth } = useAuthContext();
   return ( 
    <>
          <Toaster position="top-right" />
          { auth ? <Home/> : <Auth/> }
    </>
    )
}