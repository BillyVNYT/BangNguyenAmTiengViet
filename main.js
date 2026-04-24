const vowels = ["a","ă","â","e","ê","o","ô","ơ","u","ư","i","y"];

const consonants = [
"b","c","ch","d","đ","g","gh","gi","h","k","kh","l","m","n",
"nh","ng","ngh","p","ph","qu","r","s","t","th","tr","v","x"
];

const diphthongs = [
"ai","ay","ây","ao","au","âu",
"eo","êu","oe","uê",
"oa","oi","ôi","ơi","oai","oay",
"ia","iê","iêu","ua","uô","uôi",
"ưa","ươ","ươi","ui","uy"
];
function createCards(list, containerId) {
    const container = document.getElementById(containerId);

    list.forEach(text => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = text.toUpperCase();

        card.onclick = () => speak(text);

        container.appendChild(card);
    });
}
createCards(vowels, "vowels");
createCards(consonants, "consonants");
createCards(diphthongs, "diphthongs");

function speak(letter) {
    const path = "src/" + letter.toUpperCase() + ".m4a";

    console.log("Đang load:", path);

    const audio = new Audio(path);

    audio.onerror = () => {
        console.log("❌ Không tìm thấy:", path);
    };

    audio.onloadedmetadata = () => {
        audio.currentTime = 0.65;
        audio.play();
    };
}
