import { useEffect, useState } from "react";
import {
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification,
  getAllNotificationsForAdmin,
  getUnreadNotifications
} from "../service/NotificationService";
import { CheckIcon, BellIcon, TrashIcon } from "@heroicons/react/24/solid";

import NotificationList from "../notificationsComponent/NotificationList";
import { useAuth } from "@/context/useAuth";
import {
  Spinner,
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Switch,
  Alert
} from "@material-tailwind/react";
import NotificationSocket from "../service/WebSocketService";
import { toast } from "react-toastify";

export default function NotificationPage() {
  const { user, isInitialized } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyUnRead, setOnlyUnRead] = useState(false);
  const [error, setError] = useState(null);
  const handleNewNotification = (newNotif) => {
    setNotifications(prev => [newNotif, ...prev]);
  };

  const pageRequest = {
    pageNumber: 0,
    pageSize: 10,
    columnName: "createTime",
    asc: false,
  };

  useEffect(() => {
    if (!isInitialized || !user?.id) {
      console.warn("Kullanıcı ID'si yok. Bildirimler yüklenemez.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        let data;

        if (onlyUnRead) {
          data = await getUnreadNotifications(user.id);
        } else if (user.role === "ADMIN") {
          data = await getAllNotificationsForAdmin(pageRequest);
        } else {
          data = await getNotificationsByUser(user.id, pageRequest);
        }

        const content = data?.content || data;
        setNotifications(Array.isArray(content) ? content : []);
      } catch (e) {
        console.error("Bildirim API HATASI:", e);
        setError("Bildirimler yüklenirken bir hata oluştu.");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isInitialized, onlyUnRead]);


  const handleMarkAsRead = async (notifId) => {
    try {
      await markNotificationAsRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Bildirim okundu olarak işaretlenirken hata:", error);
      setError("Bildirim güncellenirken bir hata oluştu.");
    }
  };

  const deleteNotify = async (notifId) => {
    try {
      await deleteNotification(notifId);
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
      toast.success("Bildirim Başarıyla Silindi");
    } catch (error) {
      console.error("Bildirim silinirken hata:", error);
      setError("Bildirim silinirken bir hata oluştu.");
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    try {
      await Promise.all(
        unreadNotifications.map(n => markNotificationAsRead(n.id))
      );
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Tüm bildirimler okundu olarak işaretlenirken hata:", error);
      setError("Bildirimler güncellenirken bir hata oluştu.");
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Spinner className="h-8 w-8 text-blue-500 mx-auto mb-4" />
          <Typography variant="small" color="gray">
            Yükleniyor...
          </Typography>
        </div>
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="mx-auto my-12 max-w-screen-md p-4">
        <Alert color="amber" className="mb-6">
          Bildirimleri görüntülemek için giriş yapmanız gerekiyor.
        </Alert>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="mx-auto my-12 max-w-screen-lg p-4">
      <NotificationSocket user={user} token={localStorage.getItem("accessToken")}
        isInitialized={isInitialized}
        onNewNotification={handleNewNotification} />

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BellIcon className="h-8 w-8 text-blue-500" />
          <Typography variant="h3" className="text-gray-800">
            Sistem Bildirimleri
          </Typography>
          {unreadCount > 0 && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        <Typography variant="small" color="gray" className="ml-11">
          Tüm sistem bildirimlerinizi buradan takip edebilirsiniz
        </Typography>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert color="red" className="mb-6" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Main Card */}
      <Card className="shadow-xl">
        <CardHeader floated={false} shadow={false} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Typography variant="h5" className="text-gray-800 font-semibold">
              Bildirim Listesi
            </Typography>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Filter Toggle */}
              <div className="flex items-center gap-3">
                <Switch
                  checked={onlyUnRead}
                  onChange={(e) => setOnlyUnRead(e.target.checked)}
                  color="blue"
                  label={
                    <Typography variant="small" color="gray" className="font-medium">
                      Sadece okunmamışlar
                    </Typography>
                  }
                />
              </div>

              {/* Mark All as Read Button */}
              {unreadCount > 0 && (
                <Button
                  size="sm"
                  variant="outlined"
                  color="green"
                  className="flex items-center gap-2"
                  onClick={markAllAsRead}
                  disabled={loading}
                >
                  <CheckIcon className="h-4 w-4" />
                  Tümünü Okundu İşaretle
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <Spinner className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <Typography variant="small" color="gray">
                  Bildirimler yükleniyor...
                </Typography>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <Typography variant="h6" color="gray" className="mb-2">
                {onlyUnRead ? "Okunmamış bildirim yok" : "Henüz bildirim yok"}
              </Typography>
              <Typography variant="small" color="gray">
                {onlyUnRead
                  ? "Tüm bildirimlerinizi okumuşsunuz!"
                  : "Yeni bildirimler geldiğinde burada görünecek."
                }
              </Typography>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="small" color="gray">
                  Toplam {notifications.length} bildirim
                  {onlyUnRead && " (sadece okunmamışlar)"}
                </Typography>
              </div>

              <NotificationList
                notifications={notifications}
                onClose={deleteNotify}
                onMarkAsRead={handleMarkAsRead}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}