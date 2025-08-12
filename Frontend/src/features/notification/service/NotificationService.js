import axiosInstance from "@/service/axiosInterceptor";

const BASE_URL = "/rest/api/notification";

export const getNotificationsByUser = async (userId, request) => {
    return await axiosInstance
        .post(`${BASE_URL}/user/${userId}`, request)
        .then((res) => {
            return res.data.payload;
        });
};

export const getAllNotificationsForAdmin = async (request) => {
    return await axiosInstance
        .post(`${BASE_URL}/admin/all`, request)
        .then((res) => res.data.payload);
};

export const getUnreadNotifications = async (userId) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/user/${userId}/unread`);
        return response.data?.payload || [];
    } catch (error) {
        console.error("❌ getUnreadNotifications hatası:", error);
        throw error; // üst katmanda handle edilecek
    }
};


export const markNotificationAsRead = async (notificationId) => {
    return await axiosInstance
        .put(`${BASE_URL}/${notificationId}/mark-read`)
        .then((res) => res.data.payload);
};

export const deleteNotification = async (id) => {
    return await axiosInstance
        .delete(`${BASE_URL}/delete/${id}`)
        .then((res) => res.data);
};
