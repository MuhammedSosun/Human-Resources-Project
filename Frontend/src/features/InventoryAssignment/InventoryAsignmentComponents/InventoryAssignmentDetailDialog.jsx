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
import PhotoViewer from '../../personal/PersonelComponents/PhotoViewer'

function InventoryAssignmentDetailDialog({ open, onClose, data }) {
    if (!data || data.length === 0) return null;

    const personal = data[0]?.personal;

    return (
        <Dialog open={open} handler={onClose} size="xl">
            <DialogHeader className="flex flex-col items-center gap-3">
                <PhotoViewer personelId={personal?.id} size="large" />
                <Typography variant="h5">{personal?.firstName} {personal?.lastName}</Typography>
                <Typography variant="small" className="text-blue-gray-500">
                    Sicil No: {personal?.registrationNo}
                </Typography>
            </DialogHeader>

            <DialogBody divider className="space-y-8 max-h-[70vh] overflow-y-auto">
                {data.map((inv) => (
                    <div key={inv.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            📦 Zimmet ID: {inv.id}
                        </Typography>

                        {/* 3'lü Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-gray-700">
                            {/* Zimmet Bilgileri */}
                            <div>
                                <Typography className="font-semibold mb-2">Zimmet Bilgisi</Typography>
                                <div>Zimmet Tarihi: {inv.assignDate}</div>
                                <div>İade Tarihi: {inv.returnDate || "-"}</div>
                                <div>Zimmetleyen: {inv.assignBy}</div>
                                <div>İade Eden: {inv.returnedBy || "-"}</div>
                                <div>Oluşturulma: {inv.createTime}</div>
                            </div>

                            {/* Envanter Bilgileri */}
                            <div>
                                <Typography className="font-semibold mb-2">Envanter Bilgisi</Typography>
                                <div>Marka: {inv.inventory.brand}</div>
                                <div>Model: {inv.inventory.model}</div>
                                <div>Seri No: {inv.inventory.serialNumber}</div>
                                <div>Durum: {inv.inventory.status}</div>
                                <div>Tip: {inv.inventory.typeName}</div>
                                <div>Giriş Tarihi: {inv.inventory.entryDate}</div>
                            </div>

                            {/* Personel Detayları */}
                            <div>
                                <Typography className="font-semibold mb-2">Personel Detayı</Typography>
                                <div>Cinsiyet: {personal?.gender}</div>
                                <div>Doğum Tarihi: {personal?.birthDate}</div>
                                <div>Medeni Durum: {personal?.maritalStatus}</div>
                                <div>TCKN: {personal?.tckn}</div>
                                <div>Ünvan: {personal?.taskTitle}</div>
                                <div>Aktif: {personal?.isActive ? "Evet" : "Hayır"}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </DialogBody>

            <DialogFooter>
                <Button color="blue" onClick={onClose}>Kapat</Button>
            </DialogFooter>
        </Dialog>
    );
}

export default InventoryAssignmentDetailDialog;
