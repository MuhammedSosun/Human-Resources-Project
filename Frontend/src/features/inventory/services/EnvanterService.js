import api from "@/service/axiosInterceptor";

const BASE_URL = "/rest/api/inventory";

export const getInventories = async () => {
    const response = await api.get(`${BASE_URL}/list`, {
        params: {
            pageNumber: 0,
            pageSize: 10,
            asc: true,
            columnName: "id"
        },
    });
    return response.data.payload.content;
};


export const getInventoryById = async (id) => {
    const response = await api.get(`${BASE_URL}/find/${id}`);
    return response.data.payload;
};

export const addInventory = async (data) => {
    const response = await api.post(`${BASE_URL}/save`, data);
    return response.data.payload;
};

export const updateInventory = async (id, data) => {
    const response = await api.put(`${BASE_URL}/update/${id}`, data);
    return response.data.payload;
};

export const deleteInventory = async (id) => {
    const response = await api.delete(`${BASE_URL}/delete/${id}`);
    return response.status === 200;
};

// export const filterByType = async (typeId) => {
//     const response = await api.get(`${BASE_URL}/filter`, {
//         params: { typeId },
//     });
//     return response.data.payload;
// };

// export const filterByStatus = async (status) => {
//     const response = await api.get(`${BASE_URL}/filter/by/status`, {
//         params: { status },
//     });
//     return response.data.payload;
// };
export const filterWithMultipleFields = async ({ typeId, serialNumber, status }) => {
    const response = await api.get("/rest/api/inventory/filter/advanced", {
        params: {
            typeId: typeId || null,
            serialNumber: serialNumber || null,
            status: status || null,
        },
    });
    return response.data.payload;
};
export const getTotalInventory = async () => {
    const response = await api.get("/rest/api/inventory/total");
    return response.data;
}

