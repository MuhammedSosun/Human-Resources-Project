// PersonalFilter.jsx
import React from "react";
import { useFormik } from "formik";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Units } from "@/features/personal/enums/enums";

function PersonalFilter({ onFilter, onAddClick }) {
    const formik = useFormik({
        initialValues: {
            registrationNo: "",
            firstName: "",
            lastName: "",
            unit: "",
        },
        onSubmit: (values) => {
            onFilter(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
            <Input
                name="registrationNo"
                label="Sicil No"
                value={formik.values.registrationNo}
                onChange={formik.handleChange}
            />
            <Input
                name="firstName"
                label="Ad"
                value={formik.values.firstName}
                onChange={formik.handleChange}
            />
            <Input
                name="lastName"
                label="Soyad"
                value={formik.values.lastName}
                onChange={formik.handleChange}
            />
            <Select
                label="Birim"
                value={formik.values.unit}
                onChange={(val) => formik.setFieldValue("unit", val)}
            >
                {Units.map((unit) => (
                    <Option key={unit.value} value={unit.value}>
                        {unit.label}
                    </Option>
                ))}
            </Select>
            <div className="col-span-1 md:col-span-4 flex justify-end mt-2 gap-4">
                <Button
                    type="submit"
                    color="blue"
                    className="shadow-sm font-semibold">
                    Filtrele
                </Button>

                <Button
                    color="green"
                    onClick={onAddClick}
                    className="flex items-center gap-2 shadow-md font-bold"
                >
                    <PlusIcon className="h-5 w-5" />
                    Personel Ekle
                </Button>
            </div>
        </form>
    );
}

export default PersonalFilter;
