import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInSchema } from '../../utils/validationSchemas'
import { login, saveTokens } from '../../service/authService';
import { useFormik } from "formik";
import { useAuth } from "@/context/useAuth";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export function SignIn() {
  const navigate = useNavigate();
  const { setUser, setToken, token, isInitialized } = useAuth();
  if (!isInitialized) {
    return <div className="p-8 text-center text-gray-600">Yükleniyor...</div>;
  }


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await login(values.username, values.password);
        const decoded = jwtDecode(res.accessToken);


        const role = decoded.role;
        const username = decoded.sub;

        setToken(res.accessToken);
        setUser(decoded)
        toast.success("Giriş başarılı!");
        switch (role) {
          case "ADMIN":
            navigate("/dashboard/home");
            break;
          case "IK":
            navigate("/dashboard/personel");
            break;
          case "ENVANTER":
            navigate("/dashboard/envanter");

            break;
          case "PERSONAL":
            navigate("/dashboard/profile");
            break;
          default:
            navigate("/dashboard/notifications");
            break;
        }
      } catch (error) {
        console.error("🔴 Login Hatası:", error);
        toast.error("Giriş başarısız!");
      }
    }


  });
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your username and password to Sign In.
          </Typography>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Username
              </Typography>
              <Input
                name="username"
                type="text"
                size="lg"
                placeholder="johndoe"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.username && !!formik.errors.username}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.touched.username && formik.errors.username && (
                <Typography className="text-red-500 text-xs mt-1">
                  {formik.errors.username}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="-mb- font-medium">
                Password
              </Typography>
              <Input
                name="password"
                type="password"
                size="lg"
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.password && !!formik.errors.password}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <Typography className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </Typography>
              )}
            </div>
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center font-medium">
                I agree the&nbsp;
                <a href="#" className="text-black underline hover:text-gray-900">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button type="submit" className="mt-6" fullWidth >
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;
