import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Profile,
} from "@/pages/dashboard";

import { PersonelPage } from "@/features/personal/pages";
import { SignIn, AddUserPage } from "@/pages/auth";
import EnvanterPage from "@/features/inventory/pages/EnvanterPage";
import InventoryCreateForm from "@/features/inventory/inventoryComponents/InventoryCreateForm";
import InventoryTypePage from "@/features/inventory/pages/InventoryTypePage";
import InventoryAssignmentPage from "@/features/inventoryAssignment/pages/InventoryAssignmentPage";
import NotificationPage from "./features/notification/pages/NotificationPage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
        roles: ["ADMIN"],
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "personel",
        path: "/personel",
        element: <PersonelPage />,
        roles: ["ADMIN", "IK"],
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Envanter",
        path: "",
        pages: [
          {
            name: "Envanter Listesi",
            path: "/envanter",
            element: <EnvanterPage />,
            roles: ["ADMIN", "ENVANTER"],
          },
          {
            name: "Envanter Oluştur",
            path: "/envanter/create",
            element: <InventoryCreateForm />,
            roles: ["ADMIN", "ENVANTER"],
          },
          {
            name: "Envanter Tipleri",
            path: "/envanter/type",
            element: <InventoryTypePage />,
            roles: ["ADMIN", "ENVANTER"],
          },
        ],
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "zimmet",
        path: "/zimmet",
        element: <InventoryAssignmentPage />,
        roles: ["ADMIN", "IK", "ENVANTER"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        roles: ["PERSONAL"],
      }
      ,
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <NotificationPage />,
        roles: ["ADMIN", "IK", "ENVANTER", "PERSONAL"],
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "AddUserPage",
        path: "/AddUserPage",
        element: <AddUserPage />,
        roles: ["ADMIN", "IK"],
      },

      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        roles: [],
      },
    ],
  },
];

export default routes;
