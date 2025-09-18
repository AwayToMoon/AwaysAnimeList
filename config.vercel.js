// Firebase-Konfiguration für Vercel
// API-Key wird über Vercel Environment Variables gesetzt
const firebaseConfig = {
    apiKey: "PLACEHOLDER_API_KEY",
    authDomain: "awaysanimelist.firebaseapp.com",
    projectId: "awaysanimelist",
    storageBucket: "awaysanimelist.firebasestorage.app",
    messagingSenderId: "306455007306",
    appId: "1:306455007306:web:f6fbe465c0b039127016b3"
  };

// Exportiere die Konfiguration
window.firebaseConfig = firebaseConfig;