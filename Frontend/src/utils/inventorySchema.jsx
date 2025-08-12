import * as Yup from "yup";

export const inventorySchema = Yup.object().shape({
    typeId: Yup.number()
        .typeError("Envanter tipi seçilmelidir")
        .required("Envanter tipi zorunludur"),
    brand: Yup.string()
        .min(2, "Marka en az 2 karakter olmalıdır")
        .required("Marka zorunludur"),
    model: Yup.string()
        .min(2, "Model en az 2 karakter olmalıdır")
        .required("Model zorunludur"),
    serialNumber: Yup.string()
        .min(5, "Seri numarası en az 5 karakter olmalıdır")
        .required("Seri numarası zorunludur"),
    status: Yup.string()
        .oneOf(["IN_PERSONAL", "IN_OFFICE", "IN_WAREHOUSE"], "Geçersiz durum")
        .required("Durum seçimi zorunludur"),
    entryDate: Yup.date()
        .typeError("Geçerli bir tarih giriniz")
        .required("Giriş tarihi zorunludur"),
});
