import { Toaster } from 'react-hot-toast';
import Auth from "./components/auth/AuthPage.jsx";
import Home from "./components/pages/Home.jsx";
import { AuthProvider } from './context/AuthProvider.jsx';
import { useAuthContext } from './context/useAuthContext.js';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx';
import { GuestRoute } from './components/auth/GuestRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppContent/>
      </AuthProvider>
    </BrowserRouter>
  )
}

function AppContent() {
    const { auth } = useAuthContext();
   return (
    <>
          <Toaster position="top-right" />
            <Routes>
                <Route path='/' element={<Navigate to={auth ? '/tasks' : '/login' } replace/>}/>
                <Route path='/login' element={ <GuestRoute> <Auth/> </GuestRoute> }/>
                <Route path='/tasks' element={ <ProtectedRoute> <Home/> </ProtectedRoute> }/>
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
    </>
    )
}