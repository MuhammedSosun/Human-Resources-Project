import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import PhotoViewer from '../PersonelComponents/PhotoViewer'
function PersonalDetailDialog({ open, personel, onClose }) {
    if (!personel) return null;


    return (
        <Dialog open={open} handler={onClose} size="lg">
            <DialogHeader className="flex flex-col items-center gap-2">
                <div className="w-40 h-52 border border-blue-gray-200 rounded-lg overflow-hidden">
                    <PhotoViewer personelId={personel.id} size="large" />

                </div>
                <Typography variant="h5">{personel.firstName} {personel.lastName}</Typography>
                <Typography variant="small" className="text-blue-gray-500">
                    Sicil No: {personel.registrationNo}
                </Typography>
            </DialogHeader>

            <DialogBody divider>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-gray-700">
                    <Typography><b>Cinsiyet:</b> {personel.gender}</Typography>
                    <Typography><b>Doğum Tarihi:</b> {personel.birthDate}</Typography>
                    <Typography><b>Medeni Durum:</b> {personel.maritalStatus}</Typography>
                    <Typography><b>TCKN:</b> {personel.tckn}</Typography>
                    <Typography><b>Mezuniyet:</b> {personel.educationLevel}</Typography>
                    <Typography><b>Birim:</b> {personel.unit}</Typography>
                    <Typography><b>Görev Ünvanı:</b> {personel.taskTitle}</Typography>
                    <Typography><b>Çalışıyor:</b> {personel.working ? "Evet" : "Hayır"}</Typography>
                    <Typography><b>İşe Başlama:</b> {personel.startDate}</Typography>
                    <Typography><b>Başlangıç Pozisyonu:</b> {personel.startingPosition}</Typography>
                    <Typography><b>Başlangıç Ünvanı:</b> {personel.startingTitle}</Typography>
                    <Typography><b>Ayrılma Tarihi:</b> {personel.resignationDate || "-"}</Typography>
                    <Typography><b>Ayrılma Nedeni:</b> {personel.resignationReason || "-"}</Typography>
                    <Typography><b>Aktif:</b> {personel.isActive ? "Evet" : "Hayır"}</Typography>
                </div>
            </DialogBody>

            <DialogFooter>
                <Button color="blue" onClick={onClose}>Kapat</Button>
            </DialogFooter>
        </Dialog>
    );
}

export default PersonalDetailDialog;
