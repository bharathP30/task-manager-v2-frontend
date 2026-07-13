import { createContext } from "react";

export const AuthContext = createContext();            // create raw context object here, with .Provider

// Fast refresh only works when a file only exports components. 
// New file is required to share constants or functions between components.
// This file creates context required for storing useAuth.js data

// context object with .Provider is exported to useAuthContext.js hook
