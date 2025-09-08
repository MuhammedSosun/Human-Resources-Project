import api from '../../../service/axiosInterceptor';

const BASE_URL = `/rest/api/personal`
export const addPersonal = async (data) => {
    const response = await api.post(`${BASE_URL}/save`, data);
    return response.data.payload;
};
export const updatePersonal = async (id, data) => {
    const response = await api.put(`${BASE_URL}/update/${id}`, data);
    return response.data;
}

export const searchPersonals = async (params = {}) => {
    const toNullIfEmpty = (val) => (val?.trim?.() === "" ? null : val);

    const response = await api.get(`${BASE_URL}/search`, {
        params: {
            firstName: toNullIfEmpty(params.firstName),
            lastName: toNullIfEmpty(params.lastName),
            tckn: toNullIfEmpty(params.tckn),
            unit: toNullIfEmpty(params.unit),
        },
    });

    return response.data.payload;
};

export const deletePersonal = async (id) => {
    try {
        const response = await api.delete(`${BASE_URL}/delete/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error("API silme hatası:", error.message);
        throw error;
    }
};

export const uploadPhoto = async (uploadRequest) => {
    const response = await api.post(`${BASE_URL}/upload/image`, uploadRequest);
    return response.data;
};
export const getActivePersonalCount = async () => {
    const response = await api.get(`${BASE_URL}/count/active`);
    return response.data;
};
export const getActivePersonals = async () => {
    const response = await api.get("/rest/api/personal/list-active");
    return response.data.payload;
};
export const getMyProfile = async () => {
    const response = await api.get("/rest/api/personal/me");
    return response.data.payload;
};
export const searchByRegistrationAndName = async (filters) => {
    let query = [];

    if (filters.registrationNo) {
        query.push(`registrationNo=${encodeURIComponent(filters.registrationNo)}`);
    }
    if (filters.firstName) {
        query.push(`firstName=${encodeURIComponent(filters.firstName)}`);
    }
    if (filters.lastName) {
        query.push(`lastName=${encodeURIComponent(filters.lastName)}`);
    }
    if (filters.unit) {
        query.push(`unit=${encodeURIComponent(filters.unit)}`);
    }

    const queryString = query.length > 0 ? `?${query.join("&")}` : "";

    const response = await api.get(`${BASE_URL}/filterByInfo${queryString}`);
    return response.data.payload;
};

