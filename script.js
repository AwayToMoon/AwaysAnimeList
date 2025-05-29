const words = [
    {
        category: "Mobs",
        items: [
            {
                word: "CREEPER",
                hint: "Grüner Explosions-Mob",
                difficulty: 1
            },
            {
                word: "ZOMBIE",
                hint: "Untoter Mob",
                difficulty: 1
            },
            {
                word: "SKELETON",
                hint: "Schießt mit Pfeilen",
                difficulty: 2
            },
            {
                word: "ENDERMAN",
                hint: "Teleportiert sich",
                difficulty: 3
            },
            {
                word: "SPIDER",
                hint: "Klettert an Wänden",
                difficulty: 2
            },
            {
                word: "SLIME",
                hint: "Grüner springender Mob",
                difficulty: 1
            },
            {
                word: "BLAZE",
                hint: "Feuer-Mob im Nether",
                difficulty: 3
            },
            {
                word: "GHAST",
                hint: "Fliegender Nether-Mob",
                difficulty: 3
            },
            {
                word: "WITCH",
                hint: "Wirft Tränke",
                difficulty: 2
            },
            {
                word: "PHANTOM",
                hint: "Fliegender Nacht-Mob",
                difficulty: 2
            },
            {
                word: "RAVAGER",
                hint: "Großer Kampf-Mob",
                difficulty: 3
            },
            {
                word: "WARDEN",
                hint: "Blinder Höhlen-Mob",
                difficulty: 3
            },
            {
                word: "PIGLIN",
                hint: "Nether-Bewohner",
                difficulty: 2
            },
            {
                word: "HOGLIN",
                hint: "Nether-Schwein",
                difficulty: 2
            },
            {
                word: "STRIDER",
                hint: "Lava-Läufer",
                difficulty: 2
            }
        ]
    },
    {
        category: "Blöcke",
        items: [
            {
                word: "DIAMOND",
                hint: "Wertvoller blauer Block",
                difficulty: 2
            },
            {
                word: "ORE",
                hint: "Kommt in Höhlen vor",
                difficulty: 1
            },
            {
                word: "OBSIDIAN",
                hint: "Schwarzer harter Block",
                difficulty: 2
            },
            {
                word: "REDSTONE",
                hint: "Roter Energieblock",
                difficulty: 3
            },
            {
                word: "GLOWSTONE",
                hint: "Leuchtender Block",
                difficulty: 2
            },
            {
                word: "NETHERRACK",
                hint: "Nether-Block",
                difficulty: 2
            },
            {
                word: "ENDSTONE",
                hint: "End-Dimension Block",
                difficulty: 3
            },
            {
                word: "PRISMARINE",
                hint: "Meerestempel Block",
                difficulty: 3
            },
            {
                word: "BEACON",
                hint: "Leuchtender Effekt-Block",
                difficulty: 3
            },
            {
                word: "COMMAND",
                hint: "Befehls-Block",
                difficulty: 3
            },
            {
                word: "AMETHYST",
                hint: "Violetter Kristall",
                difficulty: 2
            },
            {
                word: "DEEPSLATE",
                hint: "Tiefe Steine",
                difficulty: 2
            },
            {
                word: "SCULK",
                hint: "Dunkler Höhlen-Block",
                difficulty: 3
            },
            {
                word: "COPPER",
                hint: "Rostender Metall-Block",
                difficulty: 2
            },
            {
                word: "MUD",
                hint: "Nasser Erdboden",
                difficulty: 1
            }
        ]
    },
    {
        category: "Werkzeuge",
        items: [
            {
                word: "PICKAXE",
                hint: "Zum Abbauen von Steinen",
                difficulty: 1
            },
            {
                word: "SWORD",
                hint: "Zum Kämpfen",
                difficulty: 1
            },
            {
                word: "AXE",
                hint: "Zum Fällen von Bäumen",
                difficulty: 1
            },
            {
                word: "SHOVEL",
                hint: "Zum Graben",
                difficulty: 1
            },
            {
                word: "HOE",
                hint: "Zum Bearbeiten von Erde",
                difficulty: 2
            },
            {
                word: "FISHINGROD",
                hint: "Zum Angeln",
                difficulty: 2
            },
            {
                word: "BOW",
                hint: "Zum Schießen",
                difficulty: 2
            },
            {
                word: "CROSSBOW",
                hint: "Stärkere Schusswaffe",
                difficulty: 3
            },
            {
                word: "TRIDENT",
                hint: "Dreizack-Waffe",
                difficulty: 3
            },
            {
                word: "SHEARS",
                hint: "Zum Scheren",
                difficulty: 1
            },
            {
                word: "SHIELD",
                hint: "Zum Blockieren",
                difficulty: 2
            },
            {
                word: "ELYTRA",
                hint: "Flug-Item",
                difficulty: 3
            },
            {
                word: "SPYGLASS",
                hint: "Zum Weitsehen",
                difficulty: 2
            },
            {
                word: "BRUSH",
                hint: "Zum Ausgraben",
                difficulty: 2
            },
            {
                word: "RECOVERYCOMPASS",
                hint: "Zeigt Todesort",
                difficulty: 3
            }
        ]
    },
    {
        category: "Biome",
        items: [
            {
                word: "DESERT",
                hint: "Heiße Sandlandschaft",
                difficulty: 1
            },
            {
                word: "FOREST",
                hint: "Viele Bäume",
                difficulty: 1
            },
            {
                word: "JUNGLE",
                hint: "Dichter Regenwald",
                difficulty: 2
            },
            {
                word: "TAIGA",
                hint: "Schneewald",
                difficulty: 2
            },
            {
                word: "MUSHROOM",
                hint: "Pilzlandschaft",
                difficulty: 3
            },
            {
                word: "SAVANNA",
                hint: "Afrikanische Steppe",
                difficulty: 2
            },
            {
                word: "BADLANDS",
                hint: "Farbige Canyons",
                difficulty: 2
            },
            {
                word: "DARKFOREST",
                hint: "Dunkler Wald",
                difficulty: 2
            },
            {
                word: "SWAMP",
                hint: "Sumpflandschaft",
                difficulty: 2
            },
            {
                word: "OCEAN",
                hint: "Großes Gewässer",
                difficulty: 1
            },
            {
                word: "DEEPDARK",
                hint: "Dunkle Höhlen",
                difficulty: 3
            },
            {
                word: "DRIPSTONE",
                hint: "Tropfsteinhöhlen",
                difficulty: 2
            },
            {
                word: "LUSHCAVES",
                hint: "Üppige Höhlen",
                difficulty: 2
            },
            {
                word: "MEADOW",
                hint: "Blumenwiese",
                difficulty: 1
            },
            {
                word: "GROVE",
                hint: "Schneebedeckter Wald",
                difficulty: 2
            }
        ]
    },
    {
        category: "Items",
        items: [
            {
                word: "APPLE",
                hint: "Rotes Obst",
                difficulty: 1
            },
            {
                word: "BREAD",
                hint: "Gebackenes Getreide",
                difficulty: 1
            },
            {
                word: "GOLDENAPPLE",
                hint: "Besonderer Apfel",
                difficulty: 2
            },
            {
                word: "ENCHANTEDBOOK",
                hint: "Buch mit Zaubern",
                difficulty: 3
            },
            {
                word: "ENDERPEARL",
                hint: "Teleportations-Item",
                difficulty: 3
            },
            {
                word: "EYEOFENDER",
                hint: "Führt zum Portal",
                difficulty: 3
            },
            {
                word: "NETHERSTAR",
                hint: "Droppe vom Wither",
                difficulty: 3
            },
            {
                word: "DRAGONEGG",
                hint: "Eier des Drachen",
                difficulty: 3
            },
            {
                word: "TRIDENT",
                hint: "Dreizack-Waffe",
                difficulty: 3
            },
            {
                word: "ELYTRA",
                hint: "Flug-Item",
                difficulty: 3
            },
            {
                word: "AMETHYSTSHARD",
                hint: "Violetter Kristall",
                difficulty: 2
            },
            {
                word: "ECHOSHARD",
                hint: "Höhlen-Kristall",
                difficulty: 2
            },
            {
                word: "SCULKCATALYST",
                hint: "Dunkler Katalysator",
                difficulty: 3
            },
            {
                word: "RECOVERYCOMPASS",
                hint: "Zeigt Todesort",
                difficulty: 3
            },
            {
                word: "GOATHORN",
                hint: "Ziegenhorn",
                difficulty: 2
            }
        ]
    },
    {
        category: "Dimensionen",
        items: [
            {
                word: "OVERWORLD",
                hint: "Hauptwelt",
                difficulty: 1
            },
            {
                word: "NETHER",
                hint: "Unterwelt",
                difficulty: 2
            },
            {
                word: "END",
                hint: "Drachen-Dimension",
                difficulty: 3
            },
            {
                word: "VOID",
                hint: "Leerer Raum",
                difficulty: 2
            },
            {
                word: "DEEPSLATE",
                hint: "Tiefe Steine",
                difficulty: 2
            }
        ]
    },
    {
        category: "Effekte",
        items: [
            {
                word: "SPEED",
                hint: "Schneller laufen",
                difficulty: 1
            },
            {
                word: "JUMP",
                hint: "Höher springen",
                difficulty: 1
            },
            {
                word: "STRENGTH",
                hint: "Stärker schlagen",
                difficulty: 2
            },
            {
                word: "REGENERATION",
                hint: "Gesundheit regenerieren",
                difficulty: 2
            },
            {
                word: "NIGHTVISION",
                hint: "Im Dunkeln sehen",
                difficulty: 2
            },
            {
                word: "INVISIBILITY",
                hint: "Unsichtbar werden",
                difficulty: 3
            },
            {
                word: "LEVITATION",
                hint: "Schweben",
                difficulty: 3
            },
            {
                word: "SLOWFALLING",
                hint: "Langsam fallen",
                difficulty: 2
            },
            {
                word: "CONDUIT",
                hint: "Unterwasser-Atmen",
                difficulty: 3
            },
            {
                word: "DOLPHINSGRACE",
                hint: "Schneller schwimmen",
                difficulty: 2
            }
        ]
    },
    {
        category: "Strukturen",
        items: [
            {
                word: "VILLAGE",
                hint: "Dorf der Bewohner",
                difficulty: 1
            },
            {
                word: "TEMPLE",
                hint: "Alte Struktur",
                difficulty: 2
            },
            {
                word: "MANSION",
                hint: "Großes Waldhaus",
                difficulty: 3
            },
            {
                word: "STRONGHOLD",
                hint: "Versteckte Festung",
                difficulty: 3
            },
            {
                word: "BASTION",
                hint: "Nether-Festung",
                difficulty: 3
            },
            {
                word: "ANCIENTCITY",
                hint: "Alte Stadt",
                difficulty: 3
            },
            {
                word: "TRAILRUINS",
                hint: "Verlassene Pfade",
                difficulty: 2
            },
            {
                word: "RUINEDPORTAL",
                hint: "Zerstörtes Portal",
                difficulty: 2
            },
            {
                word: "SHIPWRECK",
                hint: "Schiffswrack",
                difficulty: 2
            },
            {
                word: "PILLAGEROUTPOST",
                hint: "Plünderer-Posten",
                difficulty: 2
            }
        ]
    },
    {
        category: "Rüstungen",
        items: [
            {
                word: "HELMET",
                hint: "Kopfschutz",
                difficulty: 1
            },
            {
                word: "CHESTPLATE",
                hint: "Brustschutz",
                difficulty: 1
            },
            {
                word: "LEGGINGS",
                hint: "Beinschutz",
                difficulty: 1
            },
            {
                word: "BOOTS",
                hint: "Fußschutz",
                difficulty: 1
            },
            {
                word: "TURTLEHELMET",
                hint: "Schildkrötenhelm",
                difficulty: 2
            },
            {
                word: "ELYTRA",
                hint: "Flug-Rüstung",
                difficulty: 3
            },
            {
                word: "NETHERITE",
                hint: "Stärkstes Material",
                difficulty: 3
            },
            {
                word: "DIAMOND",
                hint: "Wertvolles Material",
                difficulty: 2
            },
            {
                word: "GOLDEN",
                hint: "Schwaches Material",
                difficulty: 1
            },
            {
                word: "CHAINMAIL",
                hint: "Mittelstarkes Material",
                difficulty: 2
            }
        ]
    },
    {
        category: "Zauber",
        items: [
            {
                word: "SHARPNESS",
                hint: "Mehr Schaden",
                difficulty: 2
            },
            {
                word: "PROTECTION",
                hint: "Mehr Schutz",
                difficulty: 2
            },
            {
                word: "EFFICIENCY",
                hint: "Schneller abbauen",
                difficulty: 2
            },
            {
                word: "FORTUNE",
                hint: "Mehr Ressourcen",
                difficulty: 3
            },
            {
                word: "MENDING",
                hint: "Repariert Items",
                difficulty: 3
            },
            {
                word: "UNBREAKING",
                hint: "Längere Haltbarkeit",
                difficulty: 2
            },
            {
                word: "LOOTING",
                hint: "Mehr Beute",
                difficulty: 2
            },
            {
                word: "FROSTWALKER",
                hint: "Läuft auf Wasser",
                difficulty: 3
            },
            {
                word: "DEPTHSTRIDER",
                hint: "Schneller im Wasser",
                difficulty: 2
            },
            {
                word: "THORNS",
                hint: "Reflektiert Schaden",
                difficulty: 3
            }
        ]
    }
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
        addTime(1);
        
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
