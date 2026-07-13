import { useContext } from "react";
import { AuthContext } from "./authContext"; 
// import authContext ( it also comes with a .Provider but we do not need it here )

export function useAuthContext () { 
    const ctx = useContext(AuthContext); // read context with useContext hook and send
    if (!ctx) throw new Error("useAuthContext() must be used inside <AuthProvider>"); 
            // ctx does not exist if its called from a comp that is not nested inside .Provider
            // ctx can exist if the user logged out (auth = null) but its null
        //NOTE: If the guard checked !auth instead of !ctx, it would incorrectly throw an error at logged out
    return ctx;
}

//INFO: useContext() doesn't read from the object where you called createContext() 
//INFO: it looks upward through the component tree, at render time, for the nearest <AuthContext.Provider> ancestor
//INFO: that is what the error guard is catching
//INFO: the component that imports and uses useAuthContext() must be nested inside <AuthContext.Provider>
//INFO: <AuthContext.Provider value={{x, y}}> puts values inside
//INFO: so, const ctx = useContext(AuthContext); pulls data from <AuthContext.Provider value={{x, y}}> x, y in this case