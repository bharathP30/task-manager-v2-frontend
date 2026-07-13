import { useState, useEffect } from "react";

export default function useAuth() {
    const [auth, setAuth] = useState(() => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('userData');

            if (token && user) {
                return { token, user: JSON.parse(user) };
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem('token', auth.token);
            localStorage.setItem('userData', JSON.stringify(auth.user));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
        }
    }, [auth]);

    return [auth, setAuth];
}