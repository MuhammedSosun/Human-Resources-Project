// PersonalDeleteConfirm.jsx
import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
} from "@material-tailwind/react";

function PersonalDeleteConfirm({ open, personel, onCancel, onConfirm }) {
    return (
        <Dialog open={open} handler={onCancel}>
            <DialogHeader>Silme Onayı</DialogHeader>
            <DialogBody>
                {personel ? (
                    <Typography>
                        <b>{personel.firstName} {personel.lastName}</b> adlı personeli silmek istediğinize emin misiniz?
                    </Typography>
                ) : (
                    <Typography>
                        Silinecek personel bilgisi bulunamadı.
                    </Typography>
                )}
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="gray" onClick={onCancel}>
                    Vazgeç
                </Button>
                <Button variant="gradient" color="red" onClick={onConfirm}>
                    Evet, Sil
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default PersonalDeleteConfirm;
