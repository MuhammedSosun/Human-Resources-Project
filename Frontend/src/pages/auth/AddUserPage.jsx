import React, { useState } from "react";
import {
  Input,
  Typography,
  Select,
  Option,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import { Button as MTButton } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid"

import { useFormik } from "formik";
import { signUpSchema } from "@/utils/validationSchemas";
import { toast } from "react-toastify";
import api from "../../service/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

export function AddUserPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload = {
          username: values.username.trim(),
          password: values.password,
          role: values.role.toUpperCase(),
        };

        await api.post("/register", payload);
        toast.success("Kullanıcı başarıyla oluşturuldu!");
        formik.resetForm();
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 1000);
      } catch (error) {
        const message = error?.response?.data?.message || "Kullanıcı eklenemedi.";
        toast.error(message);
        console.error("Hata:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Typography variant="h2" className="text-center font-bold text-gray-800 mb-10">
          👥 Kullanıcı Yönetimi
        </Typography>

        <Card className="shadow-xl">
          <CardHeader floated={false} shadow={false} className="text-center bg-gray-800 p-6">
            <Typography variant="h5" className="text-white">
              Yeni Kullanıcı Oluştur
            </Typography>
          </CardHeader>

          <CardBody>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <Typography variant="small" className="mb-1 font-medium text-gray-700">
                  Kullanıcı Adı
                </Typography>
                <Input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!formik.touched.username && !!formik.errors.username}
                  placeholder="johndoe"
                />
                {formik.touched.username && formik.errors.username && (
                  <Typography className="text-red-500 text-xs mt-1">
                    {formik.errors.username}
                  </Typography>
                )}
              </div>

              {/* Password */}
              <div>
                <Typography variant="small" className="mb-1 font-medium text-gray-700">
                  Şifre
                </Typography>
                <Input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!formik.touched.password && !!formik.errors.password}
                  placeholder="********"
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </Typography>
                )}
              </div>

              {/* Role */}
              <div>
                <Typography variant="small" className="mb-1 font-medium text-gray-700">
                  Rol
                </Typography>
                <Select
                  label="Rol Seçin"
                  value={formik.values.role}
                  onChange={(val) => formik.setFieldValue("role", val)}
                >
                  <Option value="PERSONAL">PERSONEL</Option>
                  <Option value="ADMIN">YÖNETİCİ</Option>
                  <Option value="IK">İNSAN KAYNAKLARI</Option>
                  <Option value="ENVANTER">ENVANTER YÖNETİMİ</Option>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <Typography className="text-red-500 text-xs mt-1">
                    {formik.errors.role}
                  </Typography>
                )}
              </div>

              {/* Submit */}
              <MTButton type="submit" fullWidth disabled={isLoading}>
                <div className="flex items-center justify-center gap-2">
                  <UserCircleIcon className="h-5 w-5" />
                  {isLoading ? "Ekleniyor..." : "Kullanıcı Ekle"}
                </div>
              </MTButton>

              <Button
                variant="contained"
                disableElevation
                fullWidth
                onClick={() => navigate("/dashboard/home")}
                startIcon={<HomeIcon />}
                style={{ marginTop: "16px", backgroundColor: "#1976d2", color: "#fff" }}
              >
                Ana Sayfaya Git
              </Button>
            </form>
          </CardBody>
        </Card>
        <div className="mt-16 text-center">
          <img
            src="/images/JforceIkon.png"
            alt="JForce Logo"
            className="mx-auto h-16 mb-4"
          />
          <Typography variant="h6" className="text-gray-700">
            Yeni çalışan arkadaşımıza iş hayatında başarılar dileriz. 💼
          </Typography>
          <Typography variant="small" className="text-gray-500 mt-1">
            — JForce İnsan Kaynakları Ekibi
          </Typography>
        </div>
      </div>

    </div>
  );
}

export default AddUserPage;
