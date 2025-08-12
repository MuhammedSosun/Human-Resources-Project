import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import PrivateRoute from "@/routes/PrivateRoute";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const flattenRoutes = (routes) => {
    return routes.flatMap(({ layout, pages }) => {
      if (layout !== "dashboard") return [];

      return pages.flatMap((page) => {
        if (page.pages) {
          return page.pages.map((subPage) => ({
            path: `/dashboard${subPage.path}`,
            element: subPage.element,
            roles: subPage.roles || [],
          }));
        }
        return {
          path: `/dashboard${page.path}`,
          element: page.element,
          roles: page.roles || [],
        };
      });
    });
  };

  const dashboardRoutes = flattenRoutes(routes);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark"
            ? "/images/JforceIkon.png"
            : "/images/JforceIkon.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Routes>
          {dashboardRoutes.map(({ path, element, roles }, index) => (
            <Route
              key={index}
              path={path.replace("/dashboard", "")}
              element={
                <PrivateRoute allowedRoles={roles}>
                  {element}
                </PrivateRoute>
              }
            />
          ))}
        </Routes>


        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
