import axios from "axios";
import { getAccessToken, getRefreshToken, saveAccessToken } from "./authService";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("🔑 Access Token yok!");
    }
    return config;
});


api.interceptors.response.use(

    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refresh = getRefreshToken();
                const res = await axios.post("http://localhost:8080/refreshToken", {
                    refreshToken: refresh,
                });
                console.log("📦 Refresh Response:", res.data); // Buraya bak payload mı data mı


                const tokens = res.data.payload;
                const newAccessToken = tokens.accessToken;
                console.log("Yeni Token:", newAccessToken);

                saveAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                console.log("🧠 Header'a Eklenen:", originalRequest.headers.Authorization);
                return api(originalRequest);
            } catch (refreshError) {
                toast.error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
                localStorage.clear();
                window.location.href = "/auth/sign-in";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
