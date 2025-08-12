import NotificationItem from "./NotificationItem";

export default function NotificationList({ notifications, onClose }) {
    if (notifications.length === 0) {
        return <p>Hiç bildiriminiz yok.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {notifications.map((notif) => (
                <NotificationItem
                    key={notif.id}
                    notification={notif}
                    onClose={onClose}
                />
            ))}
        </div>
    );
}
