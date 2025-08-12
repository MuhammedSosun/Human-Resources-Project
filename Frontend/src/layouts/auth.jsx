import { Routes, Route } from "react-router-dom";
import routes from "@/routes";
import { useAuth } from "@/context/useAuth";

export function Auth() {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return <div className="p-8 text-center text-gray-600">Yükleniyor...</div>;
  }

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route path={path} element={element} key={path} />
            ))
        )}
      </Routes>
    </div>
  );
}
