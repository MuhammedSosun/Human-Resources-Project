import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Tokenları localStorage'a kaydet
export const saveTokens = ({ accessToken, refreshToken }) => {
    if (!accessToken || !refreshToken) {
        throw new Error("❌ Access veya Refresh token yok!");
    }
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const saveAccessToken = (accessToken) => {
    if (!accessToken) throw new Error("❌ Access token boş!");
    localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    return token;
};


export const getRefreshToken = () => localStorage.getItem("refreshToken");

// Tokenları temizle (çıkış için)
export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

// 🔐 Login fonksiyonu
export const login = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/authenticate`, {
        username,
        password,
    });

    const tokens = response?.data?.payload; // 🔥 garantili erişim
    if (!tokens?.accessToken || !tokens?.refreshToken) {
        console.error("⚠️ Backend'ten token gelmedi:", response.data);
        throw new Error("❌ Access veya Refresh token yok!");
    }

    saveTokens(tokens); // 🔐 Kaydet
    return tokens; // ✅ accessToken ve refreshToken döner
};

// 🔁 Refresh Token fonksiyonu
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) throw new Error("Refresh token yok");

    const response = await axios.post(`${BASE_URL}/refreshToken`, {
        refreshToken,
    });

    const tokens = response?.data?.payload;
    saveTokens(tokens);
    return tokens;
};
