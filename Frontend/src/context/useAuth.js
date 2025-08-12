import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const {
        token,
        user,
        logout,
        setToken,
        setUser,
        isInitialized,
    } = context;


    return {
        token,
        user,
        logout,
        setToken,
        setUser,
        isInitialized,
    };
};
