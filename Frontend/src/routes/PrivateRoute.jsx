import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
const PrivateRoute = ({ children, allowedRoles }) => {
    const { token, user, isInitialized } = useAuth();

    if (!isInitialized) {
        return <p className="p-4">Yükleniyor...</p>;
    }

    if (!token) {
        return <Navigate to="/auth/sign-in" replace />;
    }
    if (!user) {
        return <p className="p-4">Kullanıcı bilgileri yükleniyor...</p>;
    }
    const userRole = user?.role;

    const hasAccess = allowedRoles.includes(userRole);
    console.log("kullanıcı rolu", userRole)

    if (!hasAccess) {
        return <Navigate to="/unauthorized" replace />;
    }



    return children;
};

export default PrivateRoute;
