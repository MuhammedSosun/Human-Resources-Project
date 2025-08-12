import React, { useEffect, useState } from "react";
import { Card, Typography, Dialog } from "@material-tailwind/react";
import { toast } from "react-toastify";

import InventoryList from "../inventoryComponents/InventoryList";
import InventoryUpdateForm from "../inventoryComponents/InventoryUpdateForm";
import InventoryDeleteConfirm from "../inventoryComponents/InventoryDeleteConfirm";
import InventoryFilter from "../inventoryComponents/InventoryFilter";
import InventoryDetailDialog from "../inventoryComponents/InventoryDetailDialog";


import { getInventories, deleteInventory, filterWithMultipleFields } from "../services/EnvanterService";
import { getInventoryTypes } from "../services/inventoryTypeService";

export function EnvanterPage() {
    const [inventoryList, setInventoryList] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [editInventory, setEditInventory] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const [selectDetail, setSelectDetail] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [filters, setFilters] = useState({
        typeName: "",
        serialNumber: "",
        status: "",
    });

    useEffect(() => {
        fetchInventories();
        fetchInventoryTypes();
    }, []);
    const handleDetailClick = (inventory) => {
        setSelectDetail(inventory);
        setOpenDetail(true);
    }
    const fetchInventories = async () => {
        try {
            const data = await getInventories();
            setInventoryList(data);
        } catch (err) {
            toast.error("Envanterler yüklenemedi.");
        }
    };

    const fetchInventoryTypes = async () => {
        try {
            const data = await getInventoryTypes();
            setInventoryTypes(data);
        } catch (err) {
            toast.error("Envanter türleri yüklenemedi.");
        }
    };

    const handleDialogClose = () => {
        setOpenEdit(false);
        setEditInventory(null);
    };

    const handleEditClick = (inventory) => {
        setEditInventory(inventory);
        setOpenEdit(true);
    };

    const handleDeleteClick = (inventory) => {
        setSelectedInventory(inventory);
        setOpenConfirm(true);
    };

    const handleEditSave = async () => {
        await fetchInventories();
        toast.success("Envanter güncellendi.");
        setOpenEdit(false);
        setEditInventory(null);
    };

    const handleEditCancel = () => {
        setOpenEdit(false);
        setEditInventory(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteInventory(selectedInventory.id);
            toast.success("Envanter silindi.");
            setInventoryList((prev) =>
                prev.filter((inv) => inv.id !== selectedInventory.id)
            );
        } catch (err) {
            toast.error("Silme işlemi başarısız.");
        } finally {
            setOpenConfirm(false);
            setSelectedInventory(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenConfirm(false);
        setSelectedInventory(null);
    };

    const handleFilter = async () => {
        const selectedType = inventoryTypes.find(
            (t) => t.name === filters.typeName
        );
        const typeId = selectedType?.id || null;

        const payload = {
            typeId,
            serialNumber: filters.serialNumber || null,
            status: filters.status || null,
        };

        ("📦 Gönderilen filtre:", payload);

        try {
            const result = await filterWithMultipleFields(payload);
            setInventoryList(result);
        } catch (error) {
            console.error("❌ Filter hatası:", error.response || error);
            toast.error("Filtreleme sırasında hata oluştu.");
        }
    };


    return (
        <section className="p-6">
            <Card className="mb-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-4 shadow-lg">
                <Typography variant="h5" className="font-bold">
                    Envanter Tablosu
                </Typography>
            </Card>

            <InventoryFilter
                filters={filters}
                setFilters={setFilters}
                inventoryTypes={inventoryTypes}
                onFilter={handleFilter}
            />

            <Card className="overflow-x-auto shadow-md">
                <InventoryList
                    inventoryList={inventoryList}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    onDetailClick={handleDetailClick}
                />
            </Card>
            <InventoryDetailDialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                inventory={selectDetail}
            />

            <Dialog open={openEdit} handler={() => setOpenEdit(false)} size="lg">
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <InventoryUpdateForm
                        onClose={handleDialogClose}
                        inventory={editInventory}
                        onSave={handleEditSave}
                        inventoryTypes={inventoryTypes}
                    />
                </div>
            </Dialog>

            <InventoryDeleteConfirm
                open={openConfirm}
                inventory={selectedInventory}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}

export default EnvanterPage;
