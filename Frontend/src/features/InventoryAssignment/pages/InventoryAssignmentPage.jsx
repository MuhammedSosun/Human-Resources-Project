// src/features/inventoryAssignment/pages/InventoryAssignmentPage.jsx

import React, { useEffect, useState } from "react";
import {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
} from "../services/inventoryAssignmentService";
import InventoryAssignmentList from "../InventoryAsignmentComponents/InventoryAssignmentList";
import InventoryAssignmentForm from "../InventoryAsignmentComponents/InventoryAssignmentForm";
import InventoryAssignmentDeleteConfirm from "../InventoryAsignmentComponents/InventoryAssignmentDeleteConfirm";
import { toast } from "react-toastify";

const InventoryAssignmentPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const data = await getAssignments();
            ("Zimmet verileri:", data);
            setAssignments(data);
        } catch (error) {
            console.error("HATA:", error);  // 🔥 Hata detayını göreceğiz
            toast.error("Zimmet verileri alınamadı.");
        }
    };


    const handleSave = async (formData) => {
        ("📤 Formdan gelen veri:", formData);
        try {
            if (selectedAssignment) {
                await updateAssignment(selectedAssignment.id, formData);
                toast.success("Zimmet güncellendi.");
            } else {
                await createAssignment(formData);
                toast.success("Zimmet başarıyla oluşturuldu.");
            }
            setDialogOpen(false);
            setSelectedAssignment(null);
            fetchAssignments();
        } catch (error) {
            toast.error("Zimmet kaydedilemedi.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAssignment(selectedAssignment.id);
            toast.success("Zimmet silindi.");
            setDeleteDialogOpen(false);
            setSelectedAssignment(null);
            fetchAssignments();
        } catch (error) {
            toast.error("Zimmet silinemedi.");
        }
    };

    const handleEditClick = (assignment) => {
        setSelectedAssignment(assignment);
        setDialogOpen(true);
    };

    const handleDeleteClick = (assignment) => {
        setSelectedAssignment(assignment);
        setDeleteDialogOpen(true);
    };

    const handleAddNew = () => {
        setSelectedAssignment(null);
        setDialogOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Zimmet İşlemleri</h2>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Yeni Zimmet Ekle
                </button>
            </div>

            <InventoryAssignmentList
                assignments={assignments}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />

            <InventoryAssignmentForm
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
                assignment={selectedAssignment}
            />

            <InventoryAssignmentDeleteConfirm
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onDelete={handleDelete}
                assignment={selectedAssignment}
            />
        </div>
    );
};

export default InventoryAssignmentPage;
