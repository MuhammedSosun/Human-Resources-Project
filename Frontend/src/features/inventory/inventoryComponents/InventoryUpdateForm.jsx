import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Input,
    Select,
    Option,
    Typography,
} from "@material-tailwind/react";
import {
    Tag, Cpu, ShieldCheck, CalendarDays, Layers, Box
} from "lucide-react";
import { updateInventory } from "../services/EnvanterService";

const validationSchema = Yup.object().shape({
    typeId: Yup.number().required("Envanter tipi zorunludur"),
    brand: Yup.string().required("Marka zorunludur"),
    model: Yup.string().required("Model zorunludur"),
    serialNumber: Yup.string().required("Seri numarası zorunludur"),
    status: Yup.string().required("Durum zorunludur"),
    entryDate: Yup.date().required("Giriş tarihi zorunludur"),
});

function InventoryUpdateForm({ open, onClose, inventory, onSave, inventoryTypes }) {
    const formik = useFormik({
        initialValues: {
            typeId: inventory?.typeId || "",
            brand: inventory?.brand || "",
            model: inventory?.model || "",
            serialNumber: inventory?.serialNumber || "",
            status: inventory?.status || "",
            entryDate: inventory?.entryDate || "",
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await updateInventory(inventory.id, values);
                onSave?.();
                onClose?.();
            } catch (error) {
                console.error("Güncelleme hatası:", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {/* Envanter Tipi */}
            <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <Layers className="w-4 h-4 text-blue-600" /> Envanter Tipi
                </label>
                <Select
                    label="Envanter Tipi Seç"
                    value={formik.values.typeId?.toString()}
                    onChange={(val) => formik.setFieldValue("typeId", val)}
                >
                    {inventoryTypes.map((type) => (
                        <Option key={type.id} value={type.id.toString()}>
                            {type.name}
                        </Option>
                    ))}
                </Select>
                {formik.touched.typeId && formik.errors.typeId && (
                    <Typography variant="small" color="red" className="mt-1 italic">
                        {formik.errors.typeId}
                    </Typography>
                )}
            </div>

            {/* Marka */}
            <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <Tag className="w-4 h-4 text-purple-600" /> Marka
                </label>
                <Input
                    label="Marka"
                    name="brand"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.brand && formik.errors.brand && (
                    <Typography variant="small" color="red" className="mt-1 italic">
                        {formik.errors.brand}
                    </Typography>
                )}
            </div>

            {/* Model */}
            <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <Cpu className="w-4 h-4 text-indigo-600" /> Model
                </label>
                <Input
                    label="Model"
                    name="model"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.model && formik.errors.model && (
                    <Typography variant="small" color="red" className="mt-1 italic">
                        {formik.errors.model}
                    </Typography>
                )}
            </div>

            {/* Seri No */}
            <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-orange-600" /> Seri Numarası
                </label>
                <Input
                    label="Seri Numarası"
                    name="serialNumber"
                    value={formik.values.serialNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.serialNumber && formik.errors.serialNumber && (
                    <Typography variant="small" color="red" className="mt-1 italic">
                        {formik.errors.serialNumber}
                    </Typography>
                )}
            </div>

            {/* Durum */}
            <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <Box className="w-4 h-4 text-teal-600" /> Durum
                </label>
                <Select
                    label="Durum"
                    value={formik.values.status}
                    onChange={(val) => formik.setFieldValue("status", val)}
                >
                    <Option value="IN_PERSONAL">Personelde</Option>
                    <Option value="IN_WAREHOUSE">Depoda</Option>
                    <Option value="IN_OFFICE">Ofiste</Option>
                </Select>
                {formik.touched.status && formik.errors.status && (
                    <Typography variant="small" color="red" className="mt-1 italic">
                        {formik.errors.status}
                    </Typography>
                )}
            </div>

            {/* Giriş Tarihi */}
            <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <CalendarDays className="w-4 h-4 text-green-600" /> Giriş Tarihi
                </label>
                <Input
                    type="date"
                    name="entryDate"
                    value={formik.values.entryDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.entryDate && formik.errors.entryDate && (
                    <Typography variant="small" color="red" className="mt-1 italic">
                        {formik.errors.entryDate}
                    </Typography>
                )}
            </div>

            {/* Butonlar */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                <Button
                    type="button"
                    variant="outlined"
                    color="red"
                    className="hover:scale-105 transition-transform"
                    onClick={onClose}
                >
                    İptal
                </Button>
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                    Güncelle
                </Button>
            </div>
        </form>
    );
}

export default InventoryUpdateForm;
