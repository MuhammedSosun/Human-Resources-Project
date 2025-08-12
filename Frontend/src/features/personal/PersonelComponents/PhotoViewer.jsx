import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import api from '../../../service/axiosInterceptor';


function PhotoViewer({ personelId, size = "small", className = "" }) {
    const [photoSrc, setPhotoSrc] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.warn("⛔ Token yok, fotoğraf isteği iptal.");
            return;
        }

        const fetchPhoto = async () => {
            try {
                const response = await api.get(`http://localhost:8080/rest/api/personal/${personelId}/photo`, {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "blob"
                });
                const imageUrl = URL.createObjectURL(response.data);
                setPhotoSrc(imageUrl);
            } catch (e) {
                console.error("❌ Fotoğraf yüklenemedi:", e);
                setPhotoSrc("/images/default-user.png");
            }
        };

        fetchPhoto();
    }, [personelId]);


    const sizeClass =
        size === "large" ? "w-40 h-52" :
            size === "medium" ? "w-24 h-32" :
                "w-12 h-12";

    return (
        <img
            src={photoSrc}
            alt="Profil Fotoğrafı"
            className={`object-cover rounded-lg border ${sizeClass} ${className}`}
        />
    );
}

PhotoViewer.propTypes = {
    personelId: PropTypes.number.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    className: PropTypes.string
};

export default PhotoViewer;
