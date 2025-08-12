// src/features/inventoryAssignment/components/InventoryAssignmentDeleteConfirm.jsx

import React from "react";
import { Dialog } from "@material-tailwind/react";

const InventoryAssignmentDeleteConfirm = ({ open, onClose, onDelete, assignment }) => {
    return (
        <Dialog open={open} handler={onClose} size="sm" className="p-6">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-red-600">Zimmet Silinsin mi?</h3>
                <p>
                    Aşağıdaki zimmet kaydı silinecektir:
                    <br />
                    <span className="font-medium text-gray-700">
                        {assignment?.personalFullName} → {assignment?.inventorySerialNumber}
                    </span>
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    >
                        İptal
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Evet, Sil
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default InventoryAssignmentDeleteConfirm;
