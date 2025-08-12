import React, { useState } from "react";
import { getAllAssignmentsByPersonalId } from "../services/inventoryAssignmentService";
import InventoryAssignmentDetailDialog from "./InventoryAssignmentDetailDialog"; // 📌 Dialog import edildi

const InventoryAssignmentList = ({ assignments, onEditClick, onDeleteClick }) => {
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [detailData, setDetailData] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const handleDetailClick = async (assignment) => {
        ("📦 Gelen assignment objesi:", assignment);
        ("assignment:", assignment);
        ("assignment.personal:", assignment.personal);
        ("assignment.personal?.id:", assignment.personal?.id);


        const personalId = assignment.personal?.id || assignment.personalId;

        if (!personalId) {
            console.warn("❗ personalId eksik: ", assignment);
            return;
        }

        setLoadingId(assignment.id);
        try {
            const result = await getAllAssignmentsByPersonalId(personalId);
            setDetailData(result || []);
            setDetailDialogOpen(true);
        } catch (error) {
            console.error("Zimmet detayları alınamadı:", error);
            setDetailData([]);
        } finally {
            setLoadingId(null);
        }
    };





    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-2 border w-10"></th>
                        <th className="p-2 border">Personel</th>
                        <th className="p-2 border">Envanter</th>
                        <th className="p-2 border">Zimmet Tarihi</th>
                        <th className="p-2 border">İade Tarihi</th>
                        <th className="p-2 border">İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center p-4 text-gray-500">
                                Kayıt bulunamadı.
                            </td>
                        </tr>
                    ) : (
                        assignments.map((assignment) => (
                            <tr key={assignment.id} className="text-center hover:bg-gray-50 transition">
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleDetailClick(assignment)}
                                        disabled={loadingId === assignment.id}
                                        className="font-bold"
                                    >
                                        {loadingId === assignment.id ? "..." : "+"}
                                    </button>
                                </td>
                                <td className="p-2 border">{assignment.personalFullName}</td>
                                <td className="p-2 border">{assignment.inventorySerialNumber}</td>
                                <td className="p-2 border">{assignment.assignDate}</td>
                                <td className="p-2 border">{assignment.returnDate || "-"}</td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => onEditClick(assignment)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                    >
                                        Güncelle
                                    </button>
                                    <button
                                        onClick={() => onDeleteClick(assignment)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Detay Dialog */}
            <InventoryAssignmentDetailDialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                data={detailData}
            />
        </div>
    );
};

export default InventoryAssignmentList;
