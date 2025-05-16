// Spotify Player Konfiguration
const songs = [
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        spotifyId: "7qiZfU4dY1lWllzX7mPBI3"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        spotifyId: "0VjIjW4GlUZAMYd2vXMi3b"
    },
    {
        title: "Dance Monkey",
        artist: "Tones and I",
        spotifyId: "2XU0oxnq2qxCpomAAuJY8K"
    },
    {
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        spotifyId: "7qEHsqek33rTcFNT9PFqLf"
    },
    {
        title: "Don't Start Now",
        artist: "Dua Lipa",
        spotifyId: "3PfIrDoz19wz7qK7tYeu62"
    },
    {
        title: "Lose Control",
        artist: "Teddy Swims",
        spotifyId: "6usohdchdzW9oML7VC4Uhk"
    },
    {
        title: "Beautiful Things",
        artist: "Benson Boone",
        spotifyId: "6tNQ70jh4OwmPGpYy6R2o9"
    },
    {
        title: "Espresso",
        artist: "Sabrina Carpenter",
        spotifyId: "2qSkIjg1o9h3YT9RAgYN75"
    },
    {
        title: "NEVER GONNA GIVE YOU UP",
        artist: "Rick Astley",
        spotifyId: "4uLU6hMCjMI75M1A2tKUQC"
    },
    {
        title: "BIRDS OF A FEATHER",
        artist: "Billie Eilish",
        spotifyId: "6dOtVTDdiauQNBQEDOtlAB"
    },
    {
        title: "Die With A Smile",
        artist: "Lady Gaga, Bruno Mars",
        spotifyId: "2plbrEY59IikOBgBGLjaoe"
    },
    {
        title: "APT.",
        artist: "ROSÉ, Bruno Mars",
        spotifyId: "5vNRhkKd0yEAg8suGBpjeY"
    },
    {
        title: "Anxiety",
        artist: "Doechii",
        spotifyId: "1musbempyJAw5gfSKZHXP9"
    },
    {
        title: "Messy (From F1® The Movie)",
        artist: "ROSÉ, F1 The Album",
        spotifyId: "6Wobsw9uZ0D0xkfOjxXSq9"
    },
    {
        title: "back to friends",
        artist: "sombr",
        spotifyId: "0FTmksd2dxiE5e3rWyJXs6"
    },
    {
        title: "Sorry I'm Here For Someone Else",
        artist: "Benson Boone",
        spotifyId: "3x3K1RP3Zfi2qeMR8kyrNO"
    },
    {
        title: "More to Lose",
        artist: "Miley Cyrus",
        spotifyId: "2xAHKs8W4lcOLweTCAPUbF"
    },
    {
        title: "Love Me Not",
        artist: "Ravyn Lenae",
        spotifyId: "1UNEuG9DYOWiikf00ayr52"
    },
    {
        title: "No One Noticed",
        artist: "The Marías",
        spotifyId: "3siwsiaEoU4Kuuc9WKMUy5"
    },
    {
        title: "luther (with sza)",
        artist: "Kendrick Lamar, SZA",
        spotifyId: "45J4avUb9Ni0bnETYaYFVJ"
    },
    {
        title: "EVIL J0RDAN",
        artist: "Playboi Carti",
        spotifyId: "6iycYUk3oB0NPMdaDUrN1w"
    },
    {
        title: "Up From the Bottom",
        artist: "Linkin Park",
        spotifyId: "5IL3VPDy5siXiptYHF2aLS"
    },
    {
        title: "Gnarly",
        artist: "KATSEYE",
        spotifyId: "1j15Ar0qGDzIR0v3CQv3JL"
    },
    {
        title: "Show Me Love",
        artist: "WizTheMc, bees & honey",
        spotifyId: "5ITV0zqzjOYfFWpW0xBmRa"
    },
    {
        title: "You'll Be in My Heart",
        artist: "NIKI",
        spotifyId: "1UPB5rYJ0bzn6mNSoAHrZC"
    },
    {
        title: "Flower Boy",
        artist: "Tyler the creator",
        spotifyId: "2nkto6YNI4rUYTLqEwWJ3o"
    },
    {
        title: "DtMF",
        artist: "Bad Bunny",
        spotifyId: "3sK8wGT43QFpWrvNQsrQya"
    },
    {
        title: "Iris",
        artist: "The Goo Goo Dolls",
        spotifyId: "6Qyc6fS4DsZjB2mRW9DsQs"
    },
    {
        title: "La Plena - W Sound 05",
        artist: "W Sound, Beéle, Ovy On The Drums",
        spotifyId: "6iOndD4OFo7GkaDypWQIou"
    },
    {
        title: "like JENNIE",
        artist: "JENNIE",
        spotifyId: "0fK7ie6XwGxQTIkpFoWkd1"
    },
    {
        title: "party 4 u",
        artist: "Charli xcx",
        spotifyId: "2RdEC8Ff83WkX7kDVCHseE"
    },
    {
        title: "Beautiful People",
        artist: "David Guetta, Sia",
        spotifyId: "4TwEdnSiTPDR1vg1QZ5K8W"
    },
    {
        title: "PASSO BEM SOLTO",
        artist: "ATLXS",
        spotifyId: "69xSmrFHBZvhk85cWnm1qY"
    },
    {
        title: "Sailor Song",
        artist: "Gigi Perez",
        spotifyId: "2262bWmqomIaJXwCRHr13j"
    },
    {
        title: "SOSA",
        artist: "Sosa, LGoony",
        spotifyId: "2mdsmcQiVTsX6NiPt52Elm"
    },
    {
        title: "Strange Trails",
        artist: "Lord Huron",
        spotifyId: "0Rfqw98N7kZ4qVPGWvt8Gn"
    },
    {
        title: "Timeless (feat. Playboi Carti)",
        artist: "The Weeknd, Playboi Carti",
        spotifyId: "0FIDCNYYjNvPVimz5icugS"
    },
    {
        title: "Not Like Us",
        artist: "Kendrick Lamar",
        spotifyId: "6AI3ezQ4o3HUoP6Dhudph3"
    },
    {
        title: "Flowers",
        artist: "Miley Cyrus",
        spotifyId: "7DSAEUvxU8FajXtRloy8M0"
    },
    {
        title: "undressed",
        artist: "sombr",
        spotifyId: "4AajxCEwGEsmHmT4H1TwjY"
    },
    {
        title: "Good Luck, Babe!",
        artist: "Chappell Roan",
        spotifyId: "0WbMK4wrZ1wFSty9F7FCgu"
    },
    {
        title: "SCHWEDEN",
        artist: "Souly",
        spotifyId: "5Q6lfNlBTZBGqKxExplfAA"
    },
    {
        title: "Daylight",
        artist: "David Kushner",
        spotifyId: "4Gg1tYCl7rWR4laKbdtPA4"
    },
    {
        title: "A Bar Song (Tipsy)",
        artist: "Shaboozey",
        spotifyId: "2FQrifJ1N335Ljm3TjTVVf"
    },
    {
        title: "I Had Some Help (Feat. Morgan Wallen)",
        artist: "Post Malone, Morgan Wallen",
        spotifyId: "7221xIgOnuakPdLqT0F3nP"
    },
    {
        title: "I'm Not Here To Make Friends",
        artist: "Sam Smith, Calvin Harris, Normani, Dua Lipa",
        spotifyId: "3i0FkJYlU4MFfYkjFHXXAM"
    },
    {
        title: "Ordinary",
        artist: "Alex Warren",
        spotifyId: "1eCGY9WJpYgtaFh1Lk2KNo"
    },
    {
        title: "Mangu",
        artist: "Fourtwnty, Charita Utami",
        spotifyId: "6XVW3zoK1nmskW7drvHy9h"
    },
    {
        title: "Perfekte Welle",
        artist: "Juli",
        spotifyId: "2LV5joNDrsyuXEh4FBARVK"
    },
    {
        title: "Durch den Monsun",
        artist: "Tokio Hotel",
        spotifyId: "5KHISlgFtWO1rYX5DaL4PM"
    },
    
    
    
];

// Spielvariablen
let currentSong = 0;
let score = 0;
let isChangingSong = false;
let correctAnswers = 0; // Anzahl der richtigen Antworten
let wrongAnswers = 0; // Anzahl der falschen Antworten

// DOM Elemente
const quizElement = document.getElementById('quiz');
const resultElement = document.getElementById('result');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.querySelector('.current-score span');
const currentSongDisplay = document.getElementById('current-song');
const totalSongsDisplay = document.getElementById('total-songs');
const playerContainer = document.getElementById('player');

// Hilfsfunktion zum Mischen eines Arrays
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Quiz starten
function startQuiz() {
    currentSong = 0;
    score = 0;
    updateScore();
    
    // Antwortoptionen generieren
    for (let song of songs) {
        const otherSongs = songs.filter(s => s.title !== song.title);
        const randomSongs = otherSongs.sort(() => Math.random() - 0.5).slice(0, 3);
        song.options = [song.title, ...randomSongs.map(s => s.title)].sort(() => Math.random() - 0.5);
    }
    
    totalSongsDisplay.textContent = songs.length;
    showQuestion();
}

function showQuestion() {
    const song = songs[currentSong];
    currentSongDisplay.textContent = currentSong + 1;
    
    questionElement.textContent = `Wie heißt dieser Song?`;
    
    // Generiere Antwortoptionen für den aktuellen Song
    const otherSongs = songs.filter(s => s.title !== song.title);
    const randomSongs = shuffle([...otherSongs]).slice(0, 3);
    const options = shuffle([song.title, ...randomSongs.map(s => s.title)]);
    
    answersElement.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        answersElement.appendChild(button);
    });

    // Spotify Player anzeigen
    isChangingSong = true;
    try {
        playerContainer.innerHTML = `
            <iframe
                src="https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0&hide_cover=true&hide_artwork=true&hide_artist=true&hide_title=true"
                width="100%"
                height="80"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style="background: transparent;"
            ></iframe>
        `;
        console.log('Spotify Player geladen für:', song.title);
    } catch (error) {
        console.error('Fehler beim Laden des Spotify Players:', error);
        playerContainer.innerHTML = `
            <div class="error-message">
                <p>Der Player konnte nicht geladen werden. Bitte versuche es erneut.</p>
                <button onclick="showQuestion()">Erneut versuchen</button>
            </div>
        `;
    }

    playerContainer.innerHTML += '<div class="player-overlay"></div>';

    // Timer für automatischen Wechsel
    setTimeout(() => {
        isChangingSong = false;
        // Nach 30 Sekunden automatisch zur nächsten Frage
        setTimeout(() => {
            if (!nextButton.disabled) {
                nextQuestion();
            }
        }, 30000);
    }, 2000);
    
    nextButton.disabled = true;
}

// Antwort prüfen
function checkAnswer(selectedAnswer) {
    const song = songs[currentSong];
    const buttons = answersElement.getElementsByTagName('button');
    
    let correctAnswerGiven = false; // Flag, um zu prüfen, ob die richtige Antwort gegeben wurde

    // Zuerst alle Buttons deaktivieren
    for (let button of buttons) {
        button.disabled = true;
    }

    // Prüfen, ob die ausgewählte Antwort korrekt ist
    if (selectedAnswer === song.title) {
        correctAnswers++; // Erhöhe die Anzahl der richtigen Antworten
        correctAnswerGiven = true;
        // Finde den Button, der ausgewählt wurde (die richtige Antwort) und füge die Klasse hinzu
        for (let button of buttons) {
            if (button.textContent === selectedAnswer) {
                handleCorrectAnswer(button);
                break; // Wir haben den ausgewählten Button gefunden
            }
        }
    } else {
        wrongAnswers++; // Erhöhe die Anzahl der falschen Antworten
        // Finde den Button, der ausgewählt wurde (die falsche Antwort) und füge die falsche Klasse hinzu
        for (let button of buttons) {
            if (button.textContent === selectedAnswer) {
                handleWrongAnswer(button);
            }
            // Finde auch den Button mit der richtigen Antwort und füge die richtige Klasse hinzu
            if (button.textContent === song.title) {
                 button.classList.add('correct'); // Füge nur die 'correct'-Klasse hinzu, ohne den Zähler zu erhöhen
            }
        }
    }

    // Aktualisiere die Anzeige für Richtig/Falsch
    updateScore();
    nextButton.disabled = false; // Aktiviere den nächsten Button
}

// Funktion für richtige Antworten (wird jetzt nur für die tatsächlich richtige Taste aufgerufen, wenn sie ausgewählt wurde)
function handleCorrectAnswer(button) {
    button.classList.add('correct');
    // correctAnswers++; // Zähler wird jetzt direkt in checkAnswer erhöht
}

// Funktion für falsche Antworten (wird jetzt nur für die tatsächlich falsche Taste aufgerufen)
function handleWrongAnswer(button) {
    button.classList.add('wrong');
    // wrongAnswers++; // Zähler wird jetzt direkt in checkAnswer erhöht
}

// Score aktualisieren
function updateScore() {
    scoreDisplay.textContent = `Richtig: ${correctAnswers} Falsch: ${wrongAnswers}`;
}

// Nächste Frage
function nextQuestion() {
    currentSong++;
    if (currentSong < songs.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Ergebnis anzeigen
function showResult() {
    quizElement.style.display = 'none';
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <h2>Quiz beendet!</h2>
        <p class="final-score">Dein Ergebnis:<br>Richtig: ${correctAnswers}<br>Falsch: ${wrongAnswers}</p>
        <button onclick="location.reload()">Neu starten</button>
    `;
}

// Event Listener
nextButton.addEventListener('click', nextQuestion);

// Initialisierung
window.addEventListener('load', () => {
    startQuiz();
});


