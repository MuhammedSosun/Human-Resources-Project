// src/features/inventoryAssignment/components/InventoryAssignmentForm.jsx

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dialog } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { getUnassignedInventories } from "../services/inventoryAssignmentService";
import { getActivePersonals } from "@/features/personal/services/personalService";
import { inventoryAssignmentSchema } from "../../../utils/inventoryAssignmentSchema";

const InventoryAssignmentForm = ({ open, onClose, onSave, assignment }) => {
    const [personals, setPersonals] = useState([]);
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const fetchData = async () => {
        try {
            const [personalList, inventoryList] = await Promise.all([
                getActivePersonals(), // ✔️ Artık gerçek array döner
                getUnassignedInventories(),
            ]);
            setPersonals(personalList);
            setInventories(inventoryList);
        } catch (error) {
            toast.error("Personel veya envanter bilgileri alınamadı.");
        }
    };

    const initialValues = {
        personalId: assignment?.personalId || "",
        inventoryId: assignment?.inventoryId || "",
        assignDate: assignment?.assignDate || "",
        returnedDate: assignment?.returnedDate || "",
    };

    const handleSubmit = (values, { setSubmitting }) => {
        onSave(values);
        setSubmitting(false);
    };

    return (
        <Dialog open={open} handler={onClose} size="md" className="p-6">
            <h3 className="text-lg font-bold mb-4">
                {assignment ? "Zimmeti Güncelle" : "Yeni Zimmet Oluştur"}
            </h3>

            <Formik
                initialValues={initialValues}
                validationSchema={inventoryAssignmentSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="personalId" className="block font-medium">
                                Personel
                            </label>
                            <Field as="select" name="personalId" className="w-full border p-2 rounded">
                                <option value="">Seçiniz</option>
                                {Array.isArray(personals) && personals.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.firstName} {p.lastName}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="personalId" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label htmlFor="inventoryId" className="block font-medium">
                                Envanter
                            </label>
                            <Field as="select" name="inventoryId" className="w-full border p-2 rounded">
                                <option value="">Seçiniz</option>
                                {Array.isArray(inventories) &&
                                    inventories.map((inv) => (
                                        <option key={inv.id} value={inv.id}>
                                            {inv.serialNumber} - {inv.brand} {inv.model}
                                        </option>
                                    ))}
                            </Field>
                            <ErrorMessage name="inventoryId" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label htmlFor="assignDate" className="block font-medium">
                                Zimmet Tarihi
                            </label>
                            <Field type="date" name="assignDate" className="w-full border p-2 rounded" />
                            <ErrorMessage name="assignDate" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label htmlFor="returnedDate" className="block font-medium">
                                İade Tarihi (opsiyonel)
                            </label>
                            <Field type="date" name="returnedDate" className="w-full border p-2 rounded" />
                            <ErrorMessage name="returnedDate" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Kaydet
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default InventoryAssignmentForm;
