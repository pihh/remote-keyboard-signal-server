import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js';

// Firebase config (replace with your actual config)
const firebaseConfig = {
apiKey: "AIzaSyD3SOJ17rf7NSjI2nEJW9FTOh3SIClxJGA",
authDomain: "portfolio-8bb32.firebaseapp.com",
databaseURL: "https://portfolio-8bb32.firebaseio.com",
projectId: "portfolio-8bb32",
storageBucket: "portfolio-8bb32.appspot.com",
messagingSenderId: "757005383282",
appId: "1:757005383282:web:26509ffaa922c7acdf34eb",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
.register('http://localhost:3000/sw.js')
.then((registration) => {

    console.log("Service Worker registered!", registration);

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // Get token and send it to your backend
        getToken(messaging, {
          vapidKey: "BDRF2OTkigcpk6LBunDhV7yCeaZv50G_Cey3t5UUJvkVv0nFw_WTjJsRptcD3MRn3VEjJjaxiE_96n1YFHp5mXg", // replace with your public VAPID key
          serviceWorkerRegistration: registration,
        }).then((token) => {
          console.log("FCM Token:", token);
        }).catch((err) => {
          console.error("Error getting token:", err);
        });
      } else {
        console.error("Notification permission denied");
      }
    }).catch((err) => {
      console.error("Permission request failed:", err);
    });
  }).catch((err) => {
    console.error("Service Worker registration failed:", err);
  });
} else {
  console.error("Service workers are not supported in this browser.");
}

// Handle messages when the page is in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
});