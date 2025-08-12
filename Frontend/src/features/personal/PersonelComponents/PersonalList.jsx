import React from "react";
import {
    Button,
    Chip,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import PhotoViewer from '../PersonelComponents/PhotoViewer';

function PersonalList({ personelList = [], onDetailClick, onEditClick, onDeleteClick }) {
    if (!Array.isArray(personelList)) {
        return <p className="text-red-500 font-semibold">Personel listesi yüklenemedi.</p>;
    }

    return (
        <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-blue-gray-50">
                <tr>
                    <th className="p-4">Profil</th>
                    <th className="p-4">Ad Soyad</th>
                    <th className="p-4">Görev</th>
                    <th className="p-4">Durum</th>
                    <th className="p-4">İşe Giriş</th>
                    <th className="p-4 text-right">İşlem</th>
                </tr>
            </thead>
            <tbody>
                {personelList.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="p-4 text-center text-blue-gray-400">
                            Hiç personel bulunamadı.
                        </td>
                    </tr>
                ) : (
                    personelList.map((p, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <PhotoViewer personelId={p.id} size="small" />

                            </td>
                            <td className="p-4">
                                <Typography className="font-bold text-blue-gray-800">
                                    {p.firstName} {p.lastName}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography className="font-semibold text-sm">
                                    {p.taskTitle}
                                </Typography>
                                <Typography variant="small" color="blue-gray">
                                    {p.unit}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Chip
                                    value={p.isActive ? "AKTİF" : "PASİF"}
                                    color={p.isActive ? "green" : "blue-gray"}
                                    size="sm"
                                />
                            </td>
                            <td className="p-4">{p.startDate}</td>
                            <td className="p-4 text-right space-x-2">
                                <Tooltip content="Detay Göster">
                                    <IconButton
                                        onClick={() => onDetailClick?.(p)}
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
                                    onClick={() => onEditClick?.(p)}
                                >
                                    Güncelle
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    color="red"
                                    onClick={() => onDeleteClick?.(p)}
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

export default PersonalList;
