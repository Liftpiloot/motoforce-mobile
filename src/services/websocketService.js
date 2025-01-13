// src/services/websocketService.js
import { ref } from 'vue';
import * as signalR from "@microsoft/signalr";

const notifications = ref([]);

export function useWebSocket(userId) {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:8080/notificationHub?userId=${userId}`, { withCredentials: false })
        .withAutomaticReconnect()
        .build();

    connection.on("FriendRequest", notification => {
        notifications.value.push(notification);
    });

    connection.start()
        .then(() => {
            console.log('Connection started');
        })
        .catch(err => {
            console.error('Error while starting connection: ' + err);
        });


    return {
        notifications,
    };
}