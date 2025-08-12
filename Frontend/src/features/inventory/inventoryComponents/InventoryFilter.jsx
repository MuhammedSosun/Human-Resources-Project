
import React from "react";
import { Button } from "@material-tailwind/react";

const InventoryFilter = ({ filters, setFilters, inventoryTypes, onFilter }) => {
    return (
        <div className="mb-6 p-4 shadow-md border border-gray-200 rounded bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Envanter Tipi
                    </label>
                    <select
                        className="border rounded p-2 w-full"
                        value={filters.typeName}
                        onChange={(e) =>
                            setFilters({ ...filters, typeName: e.target.value })
                        }
                    >
                        <option value="">Tümü</option>
                        {inventoryTypes.map((type) => (
                            <option key={type.id} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Seri Numarası
                    </label>
                    <input
                        type="text"
                        className="border rounded p-2 w-full"
                        value={filters.serialNumber}
                        onChange={(e) =>
                            setFilters({ ...filters, serialNumber: e.target.value })
                        }
                        placeholder="örn: ABC123"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Durum
                    </label>
                    <select
                        className="border rounded p-2 w-full"
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                        }
                    >
                        <option value="">Tümü</option>
                        <option value="IN_PERSONAL">IN_PERSONAL</option>
                        <option value="IN_OFFICE">IN_OFFICE</option>
                        <option value="IN_WAREHOUSE">IN_WAREHOUSE</option>
                    </select>
                </div>
            </div>

            <div>
                <Button onClick={onFilter} color="blue">
                    Filtrele
                </Button>
            </div>
        </div>
    );
};

export default InventoryFilter;
