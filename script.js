// Beispiel-Charaktere (Sie können diese durch Ihre eigenen ersetzen)
const characters = [
    { name: "Scarlett Johansson", image: "https://img.cas.sk/cas/900px/2450381.jpg" },
    { name: "Emma Watson", image: "https://image.gala.de/22628744/t/PZ/v5/w960/r0.6667/-/emma-watson-2021-10-17.jpg" },
    { name: "Ice Spice", image: "https://hips.hearstapps.com/hmg-prod/images/ice-spice-2-1675688912.jpg?resize=640:*" },
    { name: "Billie Eilish", image: "https://assets.orf.at/mims/2020/31/68/crops/w=800,q=90/638886_body_219668_ticker_eilish_r.jpg?s=760aef4422e50630c73bfdec8899731ad830ca2e" },
    { name: "Ariana Grande", image: "https://imgix.ranker.com/user_node_img/3100/61989638/original/61989638-photo-u953143656?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Victoria Justice", image: "https://imgix.ranker.com/user_node_img/117/2334836/original/2334836-photo-u-1880935027?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Alexandra Daddario", image: "https://imgix.ranker.com/user_node_img/1548/30955921/original/alexandra-daddario-photo-u109?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Madison Beer", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Madison_Beer_2019_by_Glenn_Francis_%28cropped%29.jpg" },
    { name: "Megan Fox", image: "https://imgix.ranker.com/user_node_img/78/1558135/original/1558135-photo-u-30226905?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Jennifer Lawrence", image: "https://imgix.ranker.com/user_node_img/65/1281504/original/1281504-photo-u-1423690460?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Sabrina Carpenter", image: "https://imgix.ranker.com/user_node_img/3708/74153833/original/74153833-photo-u5151557?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Elizabeth Olsen", image: "https://imgix.ranker.com/user_node_img/1590/31793173/original/elizabeth-olsen-people-in-tv-photo-u16?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Selena Gomez", image: "https://imgix.ranker.com/user_node_img/100/1999886/original/1999886-photo-u1531222785?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Zendaya", image: "https://de.web.img3.acsta.net/pictures/19/12/26/23/19/0993801.jpg" },
    { name: "Addison Rae", image: "https://imgix.ranker.com/user_node_img/4317/86329703/original/86329703-photo-u2?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
];

let currentIndex = 0;

// DOM-Elemente
const currentImage = document.getElementById('current-image');
const characterName = document.getElementById('character-name');
const smashBtn = document.getElementById('smash-btn');
const passBtn = document.getElementById('pass-btn');

// Funktion zum Anzeigen des aktuellen Charakters
function displayCharacter() {
    if (currentIndex < characters.length) {
        const character = characters[currentIndex];
        currentImage.src = character.image;
        characterName.textContent = character.name;
    } else {
        // Spiel beendet
        const gameContainer = document.querySelector('.game-container');
        gameContainer.innerHTML = `
            <h2>Spiel beendet!</h2>
            <button onclick="resetGame()" class="btn reload"><i class="fas fa-redo-alt"></i></button>
        `;
    }
}

// Event Listener für Buttons
smashBtn.addEventListener('click', () => {
    currentIndex++;
    displayCharacter();
});

passBtn.addEventListener('click', () => {
    currentIndex++;
    displayCharacter();
});

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    currentIndex = 0;
    displayCharacter();
}

// Spiel initialisieren
displayCharacter();
