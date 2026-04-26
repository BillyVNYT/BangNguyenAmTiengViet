// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
import { getDatabase, ref, runTransaction } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8q3GpJqrfCMIF5ioyTb7XRKTXWql24Sg",
    authDomain: "learnvietnamese-e3ded.firebaseapp.com",
    databaseURL: "https://learnvietnamese-e3ded-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learnvietnamese-e3ded",
    storageBucket: "learnvietnamese-e3ded.firebasestorage.app",
    messagingSenderId: "874941315347",
    appId: "1:874941315347:web:3e7f2f3b6ffcf49ebd02e6",
    measurementId: "G-5TEYC3S7JX"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const today = new Date().toISOString().slice(0, 10);

const viewsRef = ref(db, "views");
const dailyRef = ref(db, "daily/" + today);
runTransaction(viewsRef, (currentViews) => {
    return (currentViews || 0) + 1;
});
runTransaction(dailyRef, (currentDaily) => {
    return (currentDaily || 0) + 1;
});
if (sessionStorage.getItem("admin") !== "true") {
    window.location.href = "admin-login.html";
}