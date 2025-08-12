import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  IconButton,
  Switch,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openConfigurator ? "translate-x-0" : "translate-x-96"}`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Tema Ayarları
          </Typography>
          <Typography className="font-normal text-blue-gray-600 text-sm">
            Panel görünümünü kişiselleştirebilirsiniz.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="py-4 px-6">
        <div className="mb-10">
          <Typography variant="h6" color="blue-gray">
            Menü Renkleri
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${sidenavColors[color]} ${sidenavColor === color ? "border-black" : "border-transparent"}`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <Typography variant="h6" color="blue-gray">
            Menü Türü
          </Typography>
          <Typography variant="small" color="gray">
            3 farklı menü tipi arasından seçim yapabilirsiniz.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark")}
            >
              Koyu
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent")}
            >
              Şeffaf
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
            >
              Beyaz
            </Button>
          </div>
        </div>

        <div className="mb-10">
          <hr className="my-2" />
          <div className="flex items-center justify-between py-4">
            <Typography variant="h6" color="blue-gray">
              Sabit Navbar
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;