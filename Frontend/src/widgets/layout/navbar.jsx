// src/widgets/layout/Navbar.jsx

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/useAuth"; // ✨ auth context'ten kullanıcı bilgisi çek

export function Navbar({ brandName, routes }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logout } = useAuth(); // ✨ kullanıcıya eriş
  ("🔐 user:", user);
  ("🔐 token:", localStorage.getItem("accessToken"));

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="blue-gray"
          className="capitalize"
        >
          <Link to={path} className="flex items-center gap-1 p-1 font-normal">
            {name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  const authButton = user ? (
    <div className="flex items-center gap-2">
      <span className="text-sm text-blue-gray-700 font-medium">
        Merhaba, {user.username}
      </span>
      <Button size="sm" variant="outlined" color="red" onClick={logout}>
        Çıkış Yap
      </Button>
    </div>
  ) : (
    <Link to="/auth/sign-in">
      <Button variant="gradient" size="sm" fullWidth>
        Giriş Yap
      </Button>
    </Link>
  );


  return (
    <MTNavbar className="p-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-3">
          <img src="/images/JforceIkon.png" alt="logo" className="h-10 w-auto object-contain" />
          <Typography
            variant="h6"
            className="cursor-pointer font-bold text-blue-gray-900"
          >
            {brandName}
          </Typography>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {navList}
          {authButton} {/* ✨ auth butonu burada */}
        </div>
        <IconButton
          variant="text"
          size="sm"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {authButton} {/* mobil için tekrar */}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "İnsan Kaynakları",
  routes: [],
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
