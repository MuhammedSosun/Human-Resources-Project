import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { uploadPhoto } from "../services/personalService";
import { toast } from "react-toastify";


export default function PhotoUploadForm({ personalId, onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.warning("Lütfen bir dosya seçin.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Content = reader.result.split(",")[1];
            try {
                await uploadPhoto({
                    personalId,
                    fileName: selectedFile.name,
                    base64Content,
                });
                toast.success("Fotoğraf yüklendi!");
                onUploadSuccess(); // listeyi yenilemek için
            } catch (error) {
                console.error("Fotoğraf yükleme hatası:", error);
                toast.error("Yükleme başarısız oldu.");
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div className="flex flex-col gap-2 mt-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button color="blue" onClick={handleUpload}>Fotoğraf Yükle</Button>
        </div>
    );
}
