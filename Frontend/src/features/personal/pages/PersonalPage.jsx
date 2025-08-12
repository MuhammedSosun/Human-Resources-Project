// PersonelPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button, Dialog } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import PersonalFilter from "../PersonelComponents/PersonalFilter";
import PersonalList from "../PersonelComponents/PersonalList";
import PersonalDetailDialog from "../PersonelComponents/PersonalDetailDialog";
import PersonalDeleteConfirm from "../PersonelComponents/PersonalDeleteConfirm";
import { searchPersonals, deletePersonal } from '../services/personalService';
import PersonelUpdateForm from "../PersonelComponents/PersonelUpdateForm";
import PersonalForm from "../PersonelComponents/PersonalForm";
import { useAppState } from "@/context/AppStateContext";

export function PersonelPage() {
    const { personalFilter, setPersonalFilter } = useAppState();
    const [personelList, setPersonelList] = useState([]);
    const [personelListBackup, setPersonelListBackup] = useState([]);
    const [selectedPersonel, setSelectedPersonel] = useState(null);
    const [editPersonel, setEditPersonel] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const isFetch = useRef(false);
    console.log(isFetch)
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            tckn: "",
            unit: ""
        },
        onSubmit: (values) => {
            handleFilter(values);
        },
    });
    useEffect(() => {
        if (!isFetch?.current) {
            const filtersToUse = personalFilter || {};
            formik.setValues(filtersToUse);
            searchPersonals(filtersToUse).then((res) => {
                setPersonelList(res);
                setPersonelListBackup(res);
            });
            isFetch.current = true;
        }
    }, [isFetch]);

    const handleFilter = async (filters) => {
        setPersonalFilter(filters);
        const data = await searchPersonals(filters);
        setPersonelList(data);
        setPersonelListBackup(data);
    };
    const handleDetailOpen = (personel) => {
        setSelectedPersonel(personel);
        setOpenDetail(true);
    };

    const handleEditClick = (personel) => {
        setEditPersonel(personel);
        setOpenEdit(true);
    };

    const handleEditSave = async () => {
        try {
            const updatedList = await searchPersonals(); // Güncel listeyi tekrar çek
            setPersonelList(updatedList);
            toast.success("Personel güncellendi");
        } catch (err) {
            toast.error("Liste güncellenemedi");
        } finally {
            setOpenEdit(false);
            setEditPersonel(null);
        }
    };

    const handleDeleteClick = (personel) => {
        setSelectedPersonel(personel);
        setOpenConfirm(true);
    };
    const handleEditCancel = () => {
        setOpenEdit(false);
        setEditPersonel(null);
    };
    const handleConfirmDelete = async () => {
        try {
            const success = await deletePersonal(selectedPersonel.id);
            if (success) {
                setPersonelList((prev) =>
                    prev.filter((p) => p.id !== selectedPersonel.id)
                );
                toast.success("Personel başarıyla silindi.");
            }
        } catch (error) {
            console.error("Silme hatası oluştu:");

            if (error.response) {
                ("→ Status:", error.response.status);
                ("→ Data:", error.response.data);
            } else if (error.request) {
                console.warn("→ Request yapıldı ama response yok:", error.request);
            } else {
                console.error("→ Beklenmeyen hata:", error.message);
            }

            ("→ error object:", error);
        } finally {
            setOpenConfirm(false);
            setSelectedPersonel(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenConfirm(false);
        setSelectedPersonel(null);
    };

    return (
        <section className="p-6">
            <Card className="mb-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-4 shadow-lg">
                <Typography variant="h5" className="font-bold">
                    Personel Tablosu
                </Typography>
            </Card>

            <Card className="p-6 mb-6 shadow-md">
                <PersonalFilter formik={formik} onFilter={handleFilter} onAddClick={() => setOpenAdd(true)} />
            </Card>

            <Card className="overflow-x-auto shadow-md">
                <PersonalList
                    personelList={personelList}
                    onDetailClick={handleDetailOpen}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            </Card>

            <PersonalDeleteConfirm
                open={openConfirm}
                personel={selectedPersonel}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />

            <PersonalDetailDialog
                open={openDetail}
                personel={selectedPersonel}
                onClose={() => setOpenDetail(false)}
            />

            <Dialog open={openEdit} handler={() => setOpenEdit(false)} size="lg">
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <PersonelUpdateForm
                        personel={editPersonel}
                        onSave={handleEditSave}
                        onCancel={handleEditCancel}
                    />
                </div>
            </Dialog>

            <Dialog open={openAdd} handler={() => setOpenAdd(false)} size="lg">
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <Typography variant="h5" className="mb-4">Yeni Personel Ekle</Typography>

                    <PersonalForm
                        onSuccess={() => {
                            setOpenAdd(false);
                            toast.success("Personel başarıyla eklendi");
                            searchPersonals().then(setPersonelList);
                        }}
                    />
                </div>
            </Dialog>

        </section >
    );
}

export default PersonelPage;