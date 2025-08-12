import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";

import { inventorySchema } from "../../../utils/inventorySchema";
import { addInventory } from "../services/EnvanterService";
import { getInventoryTypes } from "../services/inventoryTypeService";

function InventoryCreateForm({ onSave, onCancel }) {
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const InventoryStatus = {
        IN_PERSONAL: "Personelde",
        IN_WAREHOUSE: "Depoda",
        IN_OFFICE: "Ofiste"
    };

    const formik = useFormik({
        initialValues: {
            typeId: "",
            brand: "",
            model: "",
            serialNumber: "",
            status: "",
            entryDate: "",
        },
        validationSchema: inventorySchema,
        onSubmit: async (values) => {
            try {
                await addInventory(values);
                toast.success("Envanter başarıyla eklendi.");
                onSave();
            } catch (error) {
                toast.error("Envanter eklenemedi.");
            }
        },
    });

    const loadTypes = async () => {
        try {
            const types = await getInventoryTypes();
            setInventoryTypes(types);
        } catch {
            toast.error("Envanter türleri yüklenemedi.");
        }
    };

    useEffect(() => {
        loadTypes();
    }, []);

    return (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Select
                label="Envanter Tipi"
                value={formik.values.typeId}
                onChange={(val) => formik.setFieldValue("typeId", val)}
                error={!!formik.errors.typeId && formik.touched.typeId}
            >
                {inventoryTypes.map((type) => (
                    <Option key={type.id} value={type.id.toString()}>
                        {type.name}
                    </Option>
                ))}
            </Select>

            <Input
                name="brand"
                label="Marka"
                value={formik.values.brand}
                onChange={formik.handleChange}
                error={!!formik.errors.brand && formik.touched.brand}
            />

            <Input
                name="model"
                label="Model"
                value={formik.values.model}
                onChange={formik.handleChange}
                error={!!formik.errors.model && formik.touched.model}
            />

            <Input
                name="serialNumber"
                label="Seri No"
                value={formik.values.serialNumber}
                onChange={formik.handleChange}
                error={!!formik.errors.serialNumber && formik.touched.serialNumber}
            />

            <Select
                label="Durum"
                value={formik.values.status}
                onChange={(val) => formik.setFieldValue("status", val)}
                error={!!formik.errors.status && formik.touched.status}
            >
                {Object.entries(InventoryStatus).map(([key, val]) => (
                    <Option key={key} value={key}>
                        {val}
                    </Option>
                ))}
            </Select>

            <Input
                type="date"
                name="entryDate"
                label="Giriş Tarihi"
                value={formik.values.entryDate}
                onChange={formik.handleChange}
                error={!!formik.errors.entryDate && formik.touched.entryDate}
            />

            <div className="col-span-2 flex justify-end gap-4 mt-4">
                <Button type="button" color="gray" onClick={onCancel}>
                    İptal
                </Button>
                <Button type="submit" color="green">
                    Kaydet
                </Button>
            </div>
        </form>
    );
}

export default InventoryCreateForm;
