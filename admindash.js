import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";

const app = initializeApp({
    apiKey: "AIzaSyC8q3GpJqrfCMIF5ioyTb7XRKTXWql24Sg",
    authDomain: "learnvietnamese-e3ded.firebaseapp.com",
    databaseURL: "https://learnvietnamese-e3ded-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learnvietnamese-e3ded",
    storageBucket: "learnvietnamese-e3ded.firebasestorage.app",
    messagingSenderId: "874941315347",
    appId: "1:874941315347:web:3e7f2f3b6ffcf49ebd02e6",
    measurementId: "G-5TEYC3S7JX"
});

const db = getDatabase(app);

onValue(ref(db, "views"), snap => {
    document.getElementById("views").innerText = snap.val() || 0;
});

const today = new Date().toISOString().slice(0,10);
onValue(ref(db, "daily/" + today), snap => {
    document.getElementById("today").innerText = snap.val() || 0;
});
onValue(ref(db, "daily"), snapshot => {

    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    let maxViews = 0;
    let maxDate = "-";

    if (!snapshot.exists()) return;

    snapshot.forEach(child => {
        const date = child.key;
        const views = child.val();

        // tạo row
        const row = `
            <tr>
                <td>${date}</td>
                <td>${views}</td>
            </tr>
        `;
        table.innerHTML += row;

        // tìm max
        if (views > maxViews) {
            maxViews = views;
            maxDate = date;
        }
    });

    document.getElementById("maxDay").innerText = maxDate;
});