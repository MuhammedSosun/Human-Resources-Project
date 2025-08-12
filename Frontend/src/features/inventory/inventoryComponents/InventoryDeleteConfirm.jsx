import React from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

function InventoryDeleteConfirm({ open, inventory, onCancel, onConfirm }) {
    return (
        <Dialog open={open} handler={onCancel}>
            <DialogHeader>Silme Onayı</DialogHeader>
            <DialogBody>
                {inventory ? (
                    <p>
                        <span className="font-semibold text-red-700">
                            {inventory.brand} {inventory.model}
                        </span>{" "}
                        envanterini silmek üzeresiniz. Devam etmek istiyor musunuz?
                    </p>
                ) : (
                    <p className="text-gray-500">Envanter bilgisi alınamadı.</p>
                )}
            </DialogBody>

            <DialogFooter>
                <Button variant="text" color="gray" onClick={onCancel} className="mr-2">
                    Vazgeç
                </Button>
                <Button variant="gradient" color="red" onClick={onConfirm}>
                    Sil
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default InventoryDeleteConfirm;
