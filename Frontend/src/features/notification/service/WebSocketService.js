import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

export default function NotificationSocket({ user, token, isInitialized }) {
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (!isInitialized) return;

        const username = user?.username || user?.sub || user?.id;
        if (!username || !token || token.length < 10) {
            console.warn("❗ Kullanıcı ya da token eksik → bağlantı kurulmadı");
            return;
        }

        if (stompClientRef.current?.connected) {
            console.log("🔁 STOMP zaten bağlı, tekrar bağlanmıyor");
            return;
        }

        console.log("🚀 STOMP bağlantısı başlatılıyor:", username);

        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            debug: (str) => {
                console.log("📡 STOMP DEBUG:", str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ WebSocket bağlantısı kuruldu:", username);

                client.subscribe("/user/queue/notifications", (message) => {
                    try {
                        const body = JSON.parse(message.body);
                        console.log("📩 Bildirim alındı:", body);

                        toast.info(`${body.title}: ${body.message}`);


                        window.dispatchEvent(new CustomEvent("new-notification", { detail: body }));

                    } catch (error) {
                        console.error("⚠️ JSON parse hatası:", error);
                    }
                });

            },
            onStompError: (frame) => {
                console.error("🚨 STOMP Hatası:", frame);
            },
            onWebSocketClose: (event) => {
                console.warn("🔌 WebSocket bağlantısı kapandı:", event);
            }
        });

        client.activate();
        stompClientRef.current = client;

        return () => {
            if (stompClientRef.current) {
                console.log("⛔ WebSocket bağlantısı kapatılıyor");
                stompClientRef.current.deactivate();
            }
        };
    }, [isInitialized, user, token]);

    return null;
}

// const socket = new SockJS(`http://localhost:8080/ws`);
// const client = new Client({
//     webSocketFactory: () => socket,
//     connectHeaders: {
//         Authorization: `Bearer ${token}`
//     },


//     onConnect: () => {
//         console.log("2. satır")

//         client.subscribe("/user/queue/notifications", (msg) => {
//             console.log("📩", JSON.parse(msg.body));
//         });
//     },
//     onStompError: (frame) => {
//         console.error("STOMP Error:", frame);
//     },
// });