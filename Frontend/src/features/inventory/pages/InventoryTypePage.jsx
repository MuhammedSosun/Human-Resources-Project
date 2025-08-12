import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    getInventoryTypes,
    saveInventoryType,
} from "@/features/inventory/services/inventoryTypeService";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
    name: yup.string().required("Envanter tipi adı zorunludur."),
});

export default function InventoryTypePage() {
    const [types, setTypes] = useState([]);

    const fetchTypes = async () => {
        try {
            const data = await getInventoryTypes();
            setTypes(data);
        } catch (error) {
            toast.error("Envanter tipleri alınamadı.");
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await saveInventoryType(values);
                toast.success("Envanter tipi başarıyla eklendi.");
                resetForm();
                fetchTypes();
            } catch (error) {
                toast.error("Kayıt sırasında bir hata oluştu.");
            }
        },
    });

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Envanter Tipleri</h2>

            {/* Form */}
            <form
                onSubmit={formik.handleSubmit}
                className="flex items-start gap-4 mb-6"
            >
                <div className="flex flex-col w-64">
                    <input
                        type="text"
                        name="name"
                        placeholder="Yeni envanter tipi girin..."
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <span className="text-red-500 text-sm mt-1">
                            {formik.errors.name}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Ekle
                </button>
            </form>

            {/* Tablo */}
            <div>
                <table className="min-w-full text-left text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-b font-semibold">ID</th>
                            <th className="px-4 py-2 border-b font-semibold">İsim</th>
                            <th className="px-4 py-2 border-b font-semibold">Oluşturulma Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-4 py-3 text-gray-500 text-center">
                                    Kayıtlı envanter tipi bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            types.map((type) => (
                                <tr key={type.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{type.id}</td>
                                    <td className="px-4 py-2 border-b">{type.name}</td>
                                    <td className="px-4 py-2 border-b">
                                        {new Date(type.createTime).toLocaleString("tr-TR")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
