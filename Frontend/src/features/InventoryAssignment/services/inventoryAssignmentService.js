
import api from '../../../service/axiosInterceptor';

const BASE_URL = "/rest/api/inventory-assignment";

export const getAssignments = async () => {
    const response = await api.get(`${BASE_URL}/list-all`, {
        params: {
            pageNumber: 0,
            pageSize: 20,
            columnName: "assignDate",
            ascending: false,
        },
    });

    ("🔥 GELEN VERİ:", response.data);

    const content = response.data?.payload?.content ?? [];

    const mappedList = content.map((item) => ({
        id: item.id,
        personalId: item.personal?.id ?? null,
        personalFullName: `${item.personal?.firstName ?? ""} ${item.personal?.lastName ?? ""}`,
        inventoryId: item.inventory?.id ?? null,
        inventorySerialNumber: item.inventory?.serialNumber ?? "",
        assignDate: item.assignDate,
        returnedDate: item.returnDate,
    }));

    return mappedList;
};



export const getAssignmentsByPersonal = async (personalId) => {
    const response = await api.get(`${BASE_URL}/all-assignments/${personalId}`);
    return response.data.data;
};

export const createAssignment = async (data) => {
    const response = await api.post(`${BASE_URL}/save`, data);
    return response.data.data;
};

export const updateAssignment = async (id, data) => {
    const response = await api.put(`${BASE_URL}/update/${id}`, data);
    return response.data.data;
};

export const deleteAssignment = async (id) => {
    const response = await api.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
};

export const getUnassignedInventories = async () => {
    const response = await api.get("/rest/api/inventory/unassigned-inventories");
    return response.data.payload;
};
export const getTotalAssignment = async () => {
    const response = await api.get(`${BASE_URL}/total-assignment`)
    return response.data
}

export const getAllAssignmentsByPersonalId = async (personalId) => {
    try {
        const response = await api.get(`${BASE_URL}/all-assignments/${personalId}`);
        return response.data.payload;
    } catch (error) {
        console.error("Zimmet detayları alınamadı:", error);
        throw error;
    }
};

export const getMyAssignments = async () => {
    const response = await api.get("/rest/api/inventory-assignment/my-assignments");
    return response.data.payload;
};