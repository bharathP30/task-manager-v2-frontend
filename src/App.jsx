import { Toaster } from 'react-hot-toast';
import Auth from "./components/auth/AuthPage.jsx";
import Home from "./components/pages/Home.jsx";
import { AuthProvider, useAuthContext } from './context/AuthProvider.jsx';

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