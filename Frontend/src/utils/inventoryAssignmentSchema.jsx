// src/features/inventoryAssignment/validation/inventoryAssignmentSchema.js

import * as Yup from "yup";

export const inventoryAssignmentSchema = Yup.object().shape({
    personalId: Yup.number().required("Personel seçimi zorunludur"),
    inventoryId: Yup.number().required("Envanter seçimi zorunludur"),
    assignDate: Yup.date().required("Zimmet tarihi zorunludur"),
    returnedDate: Yup.date()
        .nullable()
        .min(Yup.ref("assignDate"), "İade tarihi zimmet tarihinden önce olamaz"),
});
