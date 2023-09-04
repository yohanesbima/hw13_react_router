import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        // In a real implementation, you might make an API request to authenticate the user.
        // For this example, we'll just set the user directly.
        setCurrentUser(user);
    };

    const logout = () => {
        // In a real implementation, you might clear the user's token or session.
        // For this example, we'll just set the user to null.
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
