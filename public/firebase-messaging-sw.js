// importScripts is used to load the Firebase SDK for the service worker
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY_PLACEHOLDER,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN_PLACEHOLDER,
  projectId: VITE_FIREBASE_PROJECT_ID_PLACEHOLDER,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET_PLACEHOLDER,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER,
  appId: VITE_FIREBASE_APP_ID_PLACEHOLDER,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID_PLACEHOLDER
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
