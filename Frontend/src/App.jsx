import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "@/routes/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/useAuth";
import Unauthorized from "./pages/auth/Unauthorized";
import NotificationSocket from "./features/notification/service/WebSocketService";

function App() {
  const { token, user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div className="p-8 text-center text-gray-600">Yükleniyor...</div>;
  }

  return (

    <>
      <NotificationSocket user={user} token={token} isInitialized={isInitialized} />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        <Route path="/auth/*" element={<Auth />} />

        <Route path="/unauthorized" element={<Unauthorized />} />


        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "IK", "ENVANTER", "PERSONAL"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Hatalı rota → dashboard'a yönlendir */}
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
