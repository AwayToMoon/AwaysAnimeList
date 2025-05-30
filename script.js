const words = [
    {
        category: "Anime-Serien",
        items: [
            {
                word: "FULLMETALALCHEMIST",
                hint: "Brüder auf der Suche",
                difficulty: 3
            },
            {
                word: "ATTACKONTITAN",
                hint: "Kampf gegen Riesen",
                difficulty: 3
            },
            {
                word: "DEATHNOTE",
                hint: "Todesnotizbuch",
                difficulty: 2
            },
            {
                word: "COWBOYBEBOP",
                hint: "Weltraum-Cowboys",
                difficulty: 2
            },
            {
                word: "STEINSGATE",
                hint: "Zeitreise",
                difficulty: 3
            },
            {
                word: "GHOSTINTHEshell",
                hint: "Cyberpunk",
                difficulty: 3
            },
            {
                word: "MONSTER",
                hint: "Jagd nach einem Mörder",
                difficulty: 3
            },
            {
                word: "CODEGEASS",
                hint: "Macht über Geist",
                difficulty: 2
            },
            {
                word: "EVANGELION",
                hint: "Riesenroboter",
                difficulty: 3
            },
            {
                word: "HUNTERXHUNTER",
                hint: "Jagd nach Abenteuern",
                difficulty: 3
            },
            {
                word: "DEMONSLAYER",
                hint: "Kampf gegen Dämonen",
                difficulty: 2
            },
            {
                word: "JUJUTSUKAISEN",
                hint: "Fluch-Techniken",
                difficulty: 3
            },
            {
                word: "MYHEROACADEMIA",
                hint: "Superhelden-Akademie",
                difficulty: 3
            },
            {
                word: "VINLANDSAGA",
                hint: "Wikinger-Abenteuer",
                difficulty: 2
            },
            {
                word: "MADOKAMAGICA",
                hint: "Magische Mädchen",
                difficulty: 2
            },
            {
                word: "PARASYTE",
                hint: "Alien-Parasiten",
                difficulty: 2
            },
            {
                word: "ERASED",
                hint: "Zeitreise-Krimi",
                difficulty: 2
            },
            {
                word: "SPYFAMILY",
                hint: "Geheimagenten-Familie",
                difficulty: 2
            },
            {
                word: "CHAINSAWMAN",
                hint: "Dämonenjäger mit Säge",
                difficulty: 2
            },
            {
                word: "NARUTO",
                hint: "Ninja mit Fuchsdämon",
                difficulty: 1
            },
            {
                word: "ONEPIECE",
                hint: "Schatzsuche auf See",
                difficulty: 2
            },
            {
                word: "BLEACH",
                hint: "Seelenretter",
                difficulty: 2
            },
            {
                word: "DRAGONBALL",
                hint: "Kampf um die Drachenkugeln",
                difficulty: 1
            },
            {
                word: "JOJO",
                hint: "Bizarrer Kampf",
                difficulty: 1
            },
            {
                word: "FAIRYTAIL",
                hint: "Magische Gilde",
                difficulty: 2
            },
            {
                word: "BLACKCLOVER",
                hint: "Magier ohne Magie",
                difficulty: 2
            },
            {
                word: "TOKYOGHOUL",
                hint: "Menschenfresser in Tokio",
                difficulty: 3
            },
            {
                word: "SWORDARTONLINE",
                hint: "Virtuelle Realität",
                difficulty: 3
            },
            {
                word: "SOULEATER",
                hint: "Waffe und Meister",
                difficulty: 2
            },
            {
                word: "FULLMETALALCHEMIST",
                hint: "Brüder auf der Suche",
                difficulty: 3
            },
            {
                word: "SAMURAICHAMPLOO",
                hint: "Samurai auf Reisen",
                difficulty: 2
            },
            {
                word: "TRIGUN",
                hint: "Wandernder Schütze",
                difficulty: 2
            },
            {
                word: "GURRENLAGANN",
                hint: "Bohrer und Roboter",
                difficulty: 2
            },
            {
                word: "KILLLAKILL",
                hint: "Kampf mit Kleidung",
                difficulty: 2
            },
            {
                word: "FLCL",
                hint: "Verrückte Gitarre",
                difficulty: 3
            },
            {
                word: "SPACEDANDY",
                hint: "Weltraum-Jäger",
                difficulty: 2
            },
            {
                word: "BACCANO",
                hint: "Unsterbliche Gangster",
                difficulty: 3
            },
            {
                word: "DURARARA",
                hint: "Verwirrte Stadt",
                difficulty: 2
            },
            {
                word: "NORAGAMI",
                hint: "Gott ohne Schrein",
                difficulty: 2
            },
            {
                word: "BLUEEXORCIST",
                hint: "Dämonenjäger",
                difficulty: 2
            },
            {
                word: "DORORO",
                hint: "Samurai ohne Gliedmaßen",
                difficulty: 2
            },
            {
                word: "DRIFTERS",
                hint: "Historische Krieger",
                difficulty: 2
            },
            {
                word: "HELLSING",
                hint: "Vampirjäger",
                difficulty: 2
            },
            {
                word: "BLACKLAGOON",
                hint: "Mercenaries",
                difficulty: 2
            },
            {
                word: "GANGSTA",
                hint: "Handlanger",
                difficulty: 2
            },
            {
                word: "AFROSAMURAI",
                hint: "Afro-Samurai",
                difficulty: 2
            },
            {
                word: "SAMURAIDEEPERKYO",
                hint: "Samurai mit Dämon",
                difficulty: 2
            },
            {
                word: "BERSERK",
                hint: "Dunkler Schwertkämpfer",
                difficulty: 3
            },
            {
                word: "VINLANDSAGA",
                hint: "Wikinger-Abenteuer",
                difficulty: 2
            },
            {
                word: "KONOSUBA",
                hint: "Isekai Comedy",
                difficulty: 2
            },
            {
                word: "REZERO",
                hint: "Isekai mit Tod",
                difficulty: 2
            },
            {
                word: "OVERLORD",
                hint: "MMORPG Isekai",
                difficulty: 2
            },
            {
                word: "SLIME",
                hint: "Isekai mit Schleim",
                difficulty: 2
            },
            {
                word: "SHIELDHERO",
                hint: "Isekai mit Schild",
                difficulty: 2
            },
            {
                word: "MOBPSYCHO",
                hint: "Psychische Kräfte",
                difficulty: 2
            },
            {
                word: "ONEPUNCHMAN",
                hint: "Ein Schlag",
                difficulty: 2
            },
            {
                word: "PSYCHOPASS",
                hint: "Dystopische Zukunft",
                difficulty: 3
            },
            {
                word: "FATEZERO",
                hint: "Heiliger Gral",
                difficulty: 3
            },
            {
                word: "FMA",
                hint: "Brüder auf der Suche",
                difficulty: 2
            }
        ]
    },
];

let currentWordIndex = 0;
let score = 0;
let points = 0;
let currentCategory = 0;
let guessedLetters = new Set();
let remainingLetters = 0;
let gameStarted = false;
let timeLeft = 60; // 60 Sekunden Zeitlimit
let timerInterval;
let allWords = []; // Array für alle Wörter

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const wordDisplay = document.getElementById('word-display');
const hintText = document.getElementById('hint-text');
const lettersCount = document.getElementById('letters-count');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const restartButton = document.getElementById('restart-btn');
const keys = document.querySelectorAll('.key');
const pointsElement = document.getElementById('points');
const pointsInfo = document.getElementById('points-info');
const finalPointsElement = document.getElementById('final-points');
const tutorial = document.getElementById('tutorial');
const tutorialClose = document.getElementById('tutorial-close');
const timerElement = document.getElementById('timer');

// Deaktiviere alle Tasten am Anfang
keys.forEach(key => {
    key.disabled = true;
    key.classList.add('disabled');
});

// Tutorial-Event-Listener
tutorialClose.addEventListener('click', () => {
    tutorial.style.display = 'none';
    startButton.disabled = false;
});

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentWordIndex++;
    setNextWord();
});
restartButton.addEventListener('click', startQuiz);

keys.forEach(key => {
    key.addEventListener('click', () => {
        if (gameStarted) {
            const letter = key.textContent;
            checkLetter(letter);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (gameStarted) {
        const letter = e.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
            const key = Array.from(keys).find(k => k.textContent === letter);
            if (key && !key.classList.contains('used')) {
                checkLetter(letter);
            }
        }
    }
});

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 10) {
        timerElement.classList.add('warning');
    }
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showScore();
    }
}

function addTime(seconds) {
    timeLeft += seconds;
    // Entferne die Zeitbegrenzung von 60 Sekunden
    updateTimer();
    
    // Zeige Zeit-Bonus/Malus Animation
    const timePopup = document.createElement('div');
    timePopup.className = 'time-popup';
    timePopup.textContent = seconds > 0 ? `+${seconds}s` : `${seconds}s`;
    timePopup.style.color = seconds > 0 ? '#54c754' : '#ff5555';
    document.body.appendChild(timePopup);
    
    // Position in der Mitte des Bildschirms
    timePopup.style.left = '50%';
    timePopup.style.top = '50%';
    timePopup.style.transform = 'translate(-50%, -50%)';
    
    // Entferne nach Animation
    setTimeout(() => {
        timePopup.remove();
    }, 1000);
}

function startTimer() {
    timeLeft = 60;
    updateTimer();
    timerElement.classList.remove('warning');
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Funktion zum Erstellen des Wortpools
function createWordPool() {
    allWords = [];
    words.forEach(category => {
        category.items.forEach(item => {
            allWords.push({
                word: item.word,
                hint: item.hint,
                difficulty: item.difficulty,
                category: category.category
            });
        });
    });
    // Mische die Wörter zufällig
    allWords.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    gameStarted = true;
    startButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    currentWordIndex = 0;
    score = 0;
    points = 0;
    
    // Erstelle den Wortpool
    createWordPool();
    
    updateStats();
    
    // Aktiviere alle Tasten
    keys.forEach(key => {
        key.disabled = false;
        key.classList.remove('disabled');
    });
    
    // Initialisiere Timer
    timeLeft = 60;
    updateTimer();
    timerElement.classList.remove('warning');
    
    setNextWord();
}

function setNextWord() {
    resetState();
    const currentWord = allWords[currentWordIndex];
    hintText.textContent = currentWord.hint;
    remainingLetters = currentWord.word.length;
    lettersCount.textContent = remainingLetters;
    updateWordDisplay();
    // Starte Timer für neues Wort
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

function updateWordDisplay() {
    const currentWord = allWords[currentWordIndex].word;
    const display = currentWord
        .split('')
        .map(letter => guessedLetters.has(letter) ? letter : '_')
        .join(' ');
    wordDisplay.textContent = display;
}

function updateStats() {
    pointsElement.textContent = points;
}

function showPointsPopup(points, x, y) {
    pointsInfo.textContent = points > 0 ? `+${points}` : `${points}`;
    pointsInfo.style.left = `${x}px`;
    pointsInfo.style.top = `${y}px`;
    pointsInfo.classList.add('show');
    pointsInfo.style.color = points > 0 ? 'var(--correct-color)' : 'var(--wrong-color)';
    setTimeout(() => {
        pointsInfo.classList.remove('show');
    }, 1000);
}

function calculatePoints(letter, isCorrect) {
    let pointsGained = 0;
    
    if (isCorrect) {
        const currentWord = allWords[currentWordIndex];
        // Basis-Punkte basierend auf Schwierigkeitsgrad
        pointsGained = 10 * currentWord.difficulty;
        
        // Bonus für seltene Buchstaben
        const rareLetters = ['Q', 'X', 'Y', 'Z'];
        if (rareLetters.includes(letter)) {
            pointsGained *= 2;
        }
        
        // Bonus für schnelles Raten (erste 3 Versuche)
        if (guessedLetters.size < 3) {
            pointsGained *= 1.5;
        }
    } else {
        // Minuspunkte für falsche Buchstaben
        const currentWord = allWords[currentWordIndex];
        // Basis-Minuspunkte basierend auf Schwierigkeitsgrad
        pointsGained = -5 * currentWord.difficulty;
        
        // Zusätzliche Minuspunkte für seltene Buchstaben
        const rareLetters = ['Q', 'X', 'Y', 'Z'];
        if (rareLetters.includes(letter)) {
            pointsGained *= 1.5;
        }
    }
    
    points += Math.round(pointsGained);
    updateStats();
    return Math.round(pointsGained);
}

function checkLetter(letter) {
    const currentWord = allWords[currentWordIndex].word;
    const key = Array.from(keys).find(k => k.textContent === letter);
    
    if (guessedLetters.has(letter)) return;
    
    guessedLetters.add(letter);
    key.classList.add('used');
    
    if (currentWord.includes(letter)) {
        key.classList.add('correct');
        remainingLetters -= (currentWord.match(new RegExp(letter, 'g')) || []).length;
        lettersCount.textContent = remainingLetters;
        
        const pointsGained = calculatePoints(letter, true);
        showPointsPopup(pointsGained, key.offsetLeft, key.offsetTop);
        
        // Zeit-Bonus für richtigen Buchstaben
        addTime(3);
        
        if (remainingLetters === 0) {
            // Bonus für vollständiges Wort
            const wordBonus = Math.round(points * 0.2);
            points += wordBonus;
            updateStats();
            
            score++;
            // Stoppe Timer wenn Wort fertig
            clearInterval(timerInterval);
            if (currentWordIndex < allWords.length - 1) {
                nextButton.classList.remove('hide');
            } else {
                showScore();
            }
        }
    } else {
        key.classList.add('wrong');
        calculatePoints(letter, false);
        // Zeit-Malus für falschen Buchstaben
        addTime(-2);
    }
    
    updateWordDisplay();
}

function resetState() {
    guessedLetters.clear();
    keys.forEach(key => {
        key.classList.remove('used', 'correct', 'wrong');
        if (!gameStarted) {
            key.disabled = true;
            key.classList.add('disabled');
        }
    });
    nextButton.classList.add('hide');
}

function showScore() {
    stopTimer();
    wordDisplay.parentElement.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.textContent = score;
    totalElement.textContent = allWords.length;
    finalPointsElement.textContent = points;
    
    // Berechne und zeige die Erfolgsrate
    const successRate = Math.round((score / allWords.length) * 100);
    document.getElementById('success-rate').textContent = successRate;
}
