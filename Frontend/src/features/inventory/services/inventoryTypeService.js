import api from "@/service/axiosInterceptor";




export const getInventoryTypes = async (pageNumber = 0, pageSize = 100) => {
    const response = await api.get("/rest/api/inventoryType/list", {
        params: {
            pageNumber,
            pageSize,
        },
    });

    return response.data.payload.content;
};

// ➕ Yeni Envanter Tipi Ekleme
export const saveInventoryType = async (data) => {
    const response = await api.post("/rest/api/inventoryType/save", data);
    return response.data.payload;
};
