// InventoryList.jsx
import React from "react";
import {
    Button,
    Chip,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function InventoryList({ inventoryList = [], onEditClick, onDeleteClick, onDetailClick }) {
    if (!Array.isArray(inventoryList)) {
        return <p className="text-red-500 font-semibold">Envanter listesi yüklenemedi.</p>;
    }
    const statusLabelMap = {
        IN_PERSONAL: "Personelde",
        IN_WAREHOUSE: "Depoda",
        IN_OFFICE: "Ofiste"
    };

    return (
        <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-blue-gray-50">
                <tr>
                    <th className="p-4">Marka</th>
                    <th className="p-4">Model</th>
                    <th className="p-4">Seri No</th>
                    <th className="p-4">Tip</th>
                    <th className="p-4">Durum</th>
                    <th className="p-4">Kayıt Tarihi</th>
                    <th className="p-4 text-right">İşlem</th>
                </tr>
            </thead>
            <tbody>
                {inventoryList.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="p-4 text-center text-blue-gray-400">
                            Hiç envanter bulunamadı.
                        </td>
                    </tr>
                ) : (
                    inventoryList.map((item, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4">{item.brand}</td>
                            <td className="p-4">{item.model}</td>
                            <td className="p-4">{item.serialNumber}</td>
                            <td className="p-4">{item.typeName || "N/A"}</td>
                            <td className="p-4">
                                <Chip
                                    value={statusLabelMap[item.status] || item.status}

                                />
                            </td>
                            <td className="p-4">
                                {new Date(item.entryDate).toLocaleDateString("tr-TR")}
                            </td>
                            <td className="p-4 text-right space-x-2">
                                <Tooltip content="Detay Göster">
                                    <IconButton
                                        onClick={() => {
                                            console.log("Detay gösteriliyor:", item); // Log bırak
                                            onDetailClick?.(item); // Dialog'u tetikle
                                        }}
                                        size="sm"
                                        variant="outlined"
                                        color="blue-gray"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>

                                <Button
                                    variant="outlined"
                                    size="sm"
                                    color="blue"
                                    onClick={() => onEditClick?.(item)}
                                >
                                    Güncelle
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    color="red"
                                    onClick={() => onDeleteClick?.(item)}
                                >
                                    Sil
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default InventoryList;
