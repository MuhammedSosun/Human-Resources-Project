import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { useState } from "react";
import { useAuth } from "@/context/useAuth";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { blue, sidenavType, openSidenav } = controller;
  const [openSubmenus, setOpenSubmenus] = useState({});
  const { user, logout } = useAuth();

  const sidenavTypes = {
    blue: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderPages = (pages, parentName = "", layout = "dashboard") =>

    pages.map(({ icon, name, path, element, pages: subPages, roles }) => {

      // 🔐 Role kontrolü
      if (roles && roles.length > 0 && !roles.includes(user?.role)) return null;

      // 📍 Path prefix'i layout'a göre ayarlanıyor
      const fullPath = `${layout === "auth" ? "/auth" : "/dashboard"}${path}`;

      return (
        <li key={name} className="mx-3.5 my-1">
          {subPages ? (
            <>
              <Button
                onClick={() => toggleSubmenu(name)}
                variant="text"
                color={sidenavType === "blue" ? "white" : "blue-gray"}
                className="flex items-center justify-between gap-4 px-4 capitalize"
                fullWidth
              >
                <span className="flex items-center gap-4">
                  {icon}
                  <Typography color="inherit" className="font-medium capitalize">
                    {name}
                  </Typography>
                </span>
                {openSubmenus[name] ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </Button>
              <Collapse open={!!openSubmenus[name]}>
                <ul className="ml-6 mt-1">
                  {renderPages(subPages, name, layout)}
                </ul>
              </Collapse>
            </>
          ) : (
            <NavLink to={fullPath}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? blue
                      : sidenavType === "blue"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  {icon}
                  <Typography color="inherit" className="font-medium capitalize">
                    {name}
                  </Typography>
                </Button>
              )}
            </NavLink>
          )}
        </li>
      );
    });

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed top-0 left-0 z-50 h-screen w-72 overflow-y-auto transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative flex items-center gap-3 px-6 py-4">
        <Link to="/dashboard/home" className="flex items-center gap-3">
          <img
            src={brandImg}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
          <Typography
            variant="h6"
            color={sidenavType === "blue" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => {
          // 👇 Bu kullanıcıya özel görünür sayfaları bul
          const visiblePages = pages.filter((page) => {
            // Alt sayfalar varsa onların rollerine de bakarız
            if (page.pages) {
              return page.pages.some(
                (sub) =>
                  !sub.roles ||
                  (user && sub.roles.includes(user.role))
              );
            }

            // Ana sayfa için roller kontrolü
            if (!page.roles) return true; // rol tanımı yoksa herkese açık
            if (page.roles.length === 0) return true; // boş roller -> herkese açık

            return user && page.roles.includes(user.role);
          });

          if (visiblePages.length === 0) return null;

          return (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "blue" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {renderPages(visiblePages, "", layout)}
            </ul>
          );
        })}
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-inherit px-4 py-2">
        <Button
          onClick={logout}
          variant="outlined"
          color="red"
          fullWidth
          className="capitalize"
        >
          Çıkış Yap
        </Button>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/images/JforceIkon.png",
  brandName: "İnsan Kaynakları",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
