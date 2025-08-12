import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAccessToken, clearTokens } from "@/service/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const syncAuth = () => {
            const accessToken = getAccessToken();
            if (accessToken) {
                try {
                    const decoded = jwtDecode(accessToken);
                    const role = decoded.role;
                    const username = decoded.sub;
                    const id = decoded.id; // Eğer backend'de "id" claim'i varsa

                    setToken(accessToken);
                    setUser({ username, role, id }); // Buraya dikkat!
                } catch (err) {
                    console.error(" Token çözümlenemedi:", err);
                    clearTokens();
                }
            }
            setIsInitialized(true);
        };

        syncAuth();

        window.addEventListener("storage", syncAuth); // Başkası localStorage'a token yazarsa
        return () => window.removeEventListener("storage", syncAuth);
    }, []);


    const logout = () => {
        clearTokens();
        setUser(null);
        setToken(null);
        window.location.href = "/auth/sign-in";
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                setToken,
                setUser,
                logout,
                isInitialized,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
