
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { AuthProvider } from "./context/AuthContext";
import { AppStateProvider } from "./context/AppStateContext";
import NotificationSocket from "./features/notification/service/WebSocketService";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppStateProvider>
            <MaterialTailwindControllerProvider>
              <NotificationSocket />
              <App />
            </MaterialTailwindControllerProvider>
          </AppStateProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
