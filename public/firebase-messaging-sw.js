// importScripts is used to load the Firebase SDK for the service worker
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5q5nE4swyB5a-reuSJwZoQ8EU83YO2OA",
  authDomain: "meddash-346ed.firebaseapp.com",
  projectId: "meddash-346ed",
  storageBucket: "meddash-346ed.firebasestorage.app",
  messagingSenderId: "577746419229",
  appId: "1:577746419229:web:d684c4af2ba002861250f4",
  measurementId: "G-FP0Q18E6L1"
};

// Initialize the Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
