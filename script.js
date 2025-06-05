const questions = [
    {
        character: "Demon Slayer",
        imageUrl: "https://img.anime2you.de/2023/11/Demon-Slayer-2-768x432.jpg"
    },
    {
        character: "Jujutsu Kaisen",
        imageUrl: "https://img.anime2you.de/2023/11/Jujutsu-Kaisen-7-768x432.jpg"
    },
    {
        character: "Hunter x Hunter",
        imageUrl: "https://img.anime2you.de/2023/11/Hunter-x-Hunter-2011-768x432.jpg"
    },
    {
        character: "Fullmetal Alchemist",
        imageUrl: "https://img.anime2you.de/2023/11/Fullmetal-Alchemist-Brotherhood-1-768x432.jpg"
    },
    {
        character: "One Piece",
        imageUrl: "https://img.anime2you.de/2023/11/One-Piece-1-768x432.jpg"
    },
    {
        character: "Naruto Shippuden",
        imageUrl: "https://img.anime2you.de/2023/11/Naruto-Shippuden-2-768x432.jpg"
    },
    {
        character: "One Punch Man",
        imageUrl: "https://img.anime2you.de/2023/11/One-Punch-Man-768x432.jpg"
    },
    {
        character: "Attack on Titan",
        imageUrl: "https://img.anime2you.de/2023/11/Attack-on-Titan-5-768x432.jpg"
    },
    {
        character: "Black Clover",
        imageUrl: "https://img.anime2you.de/2023/11/Black-Clover-1-768x432.jpg"
    },
    {
        character: "Naruto",
        imageUrl: "https://img.anime2you.de/2023/11/Naruto-1-768x432.jpg"
    },
    {
        character: "My Hero Academia",
        imageUrl: "https://img.anime2you.de/2023/11/My-Hero-Academia-768x432.jpg"
    },
    {
        character: "Vinland Saga",
        imageUrl: "https://img.anime2you.de/2023/11/Vinland-Saga-768x432.jpg"
    },
    {
        character: "Death Note",
        imageUrl: "https://img.anime2you.de/2023/11/Death-Note-768x432.jpg"
    },
    {
        character: "Tokyo Ghoul",
        imageUrl: "https://img.anime2you.de/2023/11/Tokyo-Ghoul-768x432.jpg"
    },
    {
        character: "Dr. STONE",
        imageUrl: "https://img.anime2you.de/2023/11/Dr.-STONE-768x432.jpg"
    },
    {
        character: "The Promised Neverland",
        imageUrl: "https://img.anime2you.de/2023/11/The-Promised-Neverland-768x432.jpg"
    },
    {
        character: "Erased",
        imageUrl: "https://img.anime2you.de/2023/11/Erased-768x432.jpg"
    },
    {
        character: "That Time I Got Reincarnated as a Slime",
        imageUrl: "https://img.anime2you.de/2023/11/That-Time-I-Got-Reincarnated-as-a-Slime-768x432.jpg"
    },
    {
        character: "Code Geass",
        imageUrl: "https://img.anime2you.de/2023/11/Code-Geass-Lelouch-of-the-Rebellion-768x432.jpg"
    },
    {
        character: "The Rising of the Shield Hero",
        imageUrl: "https://img.anime2you.de/2023/11/The-Rising-of-the-Shield-Hero-768x432.jpg"
    },
    {
        character: "The Seven Deadly Sins",
        imageUrl: "https://img.anime2you.de/2023/11/The-Seven-Deadly-Sins-768x432.jpg"
    },
    {
        character: "Dragon Ball",
        imageUrl: "https://img.anime2you.de/2023/11/Dragon-Ball-Z-1-768x432.jpg"
    },
    {
        character: "Mob Psycho 100",
        imageUrl: "https://img.anime2you.de/2023/11/Mob-Psycho-100-768x432.jpg"
    },
    {
        character: "Food Wars",
        imageUrl: "https://img.anime2you.de/2023/11/Food-Wars-768x432.jpeg"
    },
    {
        character: "Violet Evergarden",
        imageUrl: "https://img.anime2you.de/2023/11/Violet-Evergarden-768x432.jpg"
    },
    {
        character: "Bleach",
        imageUrl: "https://img.anime2you.de/2023/11/Bleach-1-768x432.jpg"
    },
    {
        character: "ReZERO",
        imageUrl: "https://img.anime2you.de/2023/11/Re-ZERO-768x432.jpg"
    },
    {
        character: "Haikyu",
        imageUrl: "https://img.anime2you.de/2023/11/Haikyu-768x432.jpg"
    },
    {
        character: "The Disastrous Life of Saiki K.",
        imageUrl: "https://img.anime2you.de/2023/11/The-Disastrous-Life-of-Saiki-K-768x432.jpg"
    },
    {
        character: "Fairy Tail",
        imageUrl: "https://img.anime2you.de/2023/11/Fairy-Tail-768x432.jpg"
    },
    {
        character: "Assassination Classroom",
        imageUrl: "https://img.anime2you.de/2023/11/Assassination-Classroom-768x432.jpg"
    },
    {
        character: "JoJos Bizarre Adventure",
        imageUrl: "https://img.anime2you.de/2023/11/JoJos-Bizarre-Adventure-768x432.jpg"
    },
    {
        character: "Elfen Lied",
        imageUrl: "https://anime-palast.de/wp-content/uploads/2024/10/elfen-lied.jpg"
    },
    {
        character: "Spy x Family",
        imageUrl: "https://img.anime2you.de/2023/11/Spy-x-Family-3-768x432.jpg"
    },
    {
        character: "Parasyte",
        imageUrl: "https://img.anime2you.de/2023/11/Parasyte-768x432.jpg"
    },
    {
        character: "Noragami",
        imageUrl: "https://img.anime2you.de/2023/11/Noragami-768x432.jpg"
    },
    {
        character: "Overlord",
        imageUrl: "https://img.anime2you.de/2023/11/Overlord-768x432.jpg"
    },
    {
        character: "Pokemon",
        imageUrl: "https://cdn.sortiraparis.com/images/80/98390/869370-pokemon-le-dernier-episode-du-dessin-anime-diffuse-25-ans-apres-ses-debuts.jpg"
    },
    {
        character: "Classroom of the Elite",
        imageUrl: "https://img.anime2you.de/2023/11/Classroom-of-the-Elite-768x432.jpg"
    },
    {
        character: "Tokyo Revengers",
        imageUrl: "https://img.anime2you.de/2023/11/Tokyo-Revengers-1-768x432.jpg"
    },
    {
        character: "Fire Force",
        imageUrl: "https://img.anime2you.de/2023/11/Fire-Force-768x432.jpg"
    },
    {
        character: "Mushoku Tensei",
        imageUrl: "https://img.anime2you.de/2023/11/Mushoku-Tensei-768x432.jpg"
    },
    {
        character: "Maid-Sama",
        imageUrl: "https://img.anime2you.de/2023/11/Maid-Sama-768x432.jpg"
    },
    {
        character: "Shigatsu wa Kimi no Uso",
        imageUrl: "https://img.anime2you.de/2023/11/Shigatsu-wa-Kimi-no-Uso-768x432.jpg"
    },
    {
        character: "Cowboy Bebop",
        imageUrl: "https://img.anime2you.de/2023/11/Cowboy-Bebop-768x432.jpg"
    },
    {
        character: "Seraph of the End",
        imageUrl: "https://img.anime2you.de/2023/11/Seraph-of-the-End-1-768x432.jpg"
    },
    {
        character: "Fullmetal Alchemist",
        imageUrl: "https://img.anime2you.de/2023/11/Fullmetal-Alchemist-768x432.jpg"
    },
    {
        character: "Akame ga KILL",
        imageUrl: "https://img.anime2you.de/2023/11/Akame-ga-KILL-1.jpg"
    },
    {
        character: "Sword Art Online",
        imageUrl: "https://m.media-amazon.com/images/S/pv-target-images/e76f7e26728da794585f191f15852bbf60197ac7a5a6724485b605861a5cd7ea._SX1080_FMjpg_.jpg"
    },
    {
        character: "Steins Gate",
        imageUrl: "https://img.anime2you.de/2023/11/SteinsGate.jpg"
    }
];

let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let canAnswer = true;

const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('checkAnswer');
const nextButton = document.getElementById('nextQuestion');
const correctCountElement = document.getElementById('correctCount');
const wrongCountElement = document.getElementById('wrongCount');
const characterImage = document.getElementById('characterImage');
const feedbackElement = document.getElementById('feedback');

function loadQuestion() {
    const question = questions[currentQuestion];
    
    // Lade das Bild
    characterImage.src = question.imageUrl;
    characterImage.alt = `Charakter aus ${question.character}`;
    
    // Reset UI
    answerInput.value = '';
    answerInput.disabled = false;
    checkButton.disabled = false;
    nextButton.disabled = true;
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    
    canAnswer = true;
}

function checkAnswer() {
    if (!canAnswer) return;
    
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].character.toLowerCase();
    
    canAnswer = false;
    answerInput.disabled = true;
    checkButton.disabled = true;
    
    if (userAnswer === correctAnswer) {
        correctCount++;
        correctCountElement.textContent = correctCount;
        feedbackElement.textContent = 'Richtig! 🎉';
        feedbackElement.className = 'feedback correct';
    } else {
        wrongCount++;
        wrongCountElement.textContent = wrongCount;
        feedbackElement.textContent = `Falsch! Die richtige Antwort war: ${questions[currentQuestion].character}`;
        feedbackElement.className = 'feedback wrong';
    }
    
    nextButton.disabled = false;
}

// Event Listener
checkButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

nextButton.addEventListener('click', () => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    loadQuestion();
});

// Start the game
loadQuestion();
