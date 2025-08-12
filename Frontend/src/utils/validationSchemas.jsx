import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
    username: Yup.string()
        .required("Kullanıcı adı zorunludur"),
    password: Yup.string()
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .required("Şifre zorunludur"),
    role: Yup.string().required("Role Seçimi zorunludur!")
});
export const signUpSchema = Yup.object().shape({
    username: Yup.string().required("Kullanıcı adı zorunludur"),
    password: Yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunludur"),
    role: Yup.string().required("Rol seçimi zorunludur"),
});
