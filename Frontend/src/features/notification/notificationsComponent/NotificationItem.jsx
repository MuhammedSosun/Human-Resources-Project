import { Alert } from "@material-tailwind/react";
import {
    InformationCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/solid"; import { useState } from "react";
import { markNotificationAsRead } from "../service/NotificationService";
import { toast } from "react-toastify";

export default function NotificationItem({ notification, onClose }) {
    const [read, setRead] = useState(notification.read);
    const handleMarkAsRead = async () => {
        if (!read) {
            try {
                await markNotificationAsRead(notification.id); 
                setRead(true); 
                toast.success("Bildirim okundu olarak işaretlendi");
            } catch (e) {
                toast.error("Bildirim okundu işaretlenemedi");
            }
        }
    };
    return (
        <div className="p-4 my-4 rounded-xl border border-gray-300 shadow-md bg-white cursor-pointer"
            onClick={handleMarkAsRead}>
            <Alert
                open={true}
                color={read ? "gray" : "green"}
                icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
                onClose={() => onClose(notification.id)}
            >
                <div className="text-sm">
                    <strong className="text-base text-gray-900">{notification.title}</strong> — {notification.message}
                    <br />
                    <small className="text-gray-600">
                        Gönderen: <b>{notification.user?.username || "Sistem"}</b>
                    </small>
                    <br />
                    <small className="text-gray-600">{new Date(notification.createTime).toLocaleString()}</small>
                </div>
            </Alert>
        </div>
    );
}
