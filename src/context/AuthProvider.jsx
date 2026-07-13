import useAuth from "../components/functions/useAuth"; 
import { AuthContext } from "./authContext"; // importing context with .Provider 

export function AuthProvider ({ children }) {   // create a reusable AuthProvider component to prevent using .Provider twice in one app
const [auth, setAuth] = useAuth();              // localstorage logic here, executes only once in this app

return (                                        // providing context reader component, like <Home /> 
    <AuthContext.Provider value={{ auth, setAuth }}> 
            { children }
    </AuthContext.Provider>  
)
}
