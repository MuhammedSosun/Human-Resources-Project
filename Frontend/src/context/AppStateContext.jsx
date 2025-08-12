import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();
AppStateContext.displayName = "AppStateContext";

export const AppStateProvider = ({ children }) => {
    const [personalFilter, setPersonalFilter] = useState({
        firstName: "",
        lastName: "",
        tckn: "",
        unit: "",
    });

    const [inventoryFilter, setInventoryFilter] = useState({
        serialNumber: "",
        status: "",
        typeId: null,
    });

    const [isInventoryModalOpen, setInventoryModalOpen] = useState(false);
    const [isPersonalUpdateOpen, setPersonalUpdateOpen] = useState(false);

    return (
        <AppStateContext.Provider
            value={{
                personalFilter,
                setPersonalFilter,
                inventoryFilter,
                setInventoryFilter,
                isInventoryModalOpen,
                setInventoryModalOpen,
                isPersonalUpdateOpen,
                setPersonalUpdateOpen,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => useContext(AppStateContext);
