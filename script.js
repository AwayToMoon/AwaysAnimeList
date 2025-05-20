const categories = {
    "Geographie": [
        { question: "Was ist das größte Land der Welt nach Fläche?", answer: "Russland", points: 100 },
        { question: "Wie heißt das längste Gebirge Südamerikas?", answer: "Anden", points: 200 },
        { question: "Welcher Fluss ist länger, der Nil oder der Amazonas?", answer: "Amazonas", points: 400 },
        { question: "In welchem Land befindet sich der Mount Everest?", answer: "Nepal", points: 500 }
    ],
    "Geschichte": [
        { question: "Wer war der erste römische Kaiser?", answer: "Augustus", points: 100 },
        { question: "Wann fiel die Berliner Mauer?", answer: "1989", points: 200 },
        { question: "Wer schrieb die Unabhängigkeitserklärung der Vereinigten Staaten?", answer: "Thomas Jefferson", points: 400 },
        { question: "Welches Ereignis markiert oft den Beginn des Mittelalters in Europa?", answer: "Fall des Weströmischen Reiches", points: 500 }
    ],
    "Wissenschaft": [
        { question: "Was ist das chemische Symbol für Wasser?", answer: "H2O", points: 100 },
        { question: "Wie viele Planeten gibt es in unserem Sonnensystem?", answer: "8", points: 200 },
        { question: "Was ist die Photosynthese?", answer: "Prozess, bei dem Pflanzen Lichtenergie nutzen, um Glukose herzustellen", points: 400 },
        { question: "Welches Element hat das Symbol O?", answer: "Sauerstoff", points: 500 }
    ],
    "Film & Fernsehen": [
        { question: "In welchem Film jagt ein Hai eine Kleinstadt?", answer: "Der weiße Hai", points: 100 },
        { question: "Welche Serie spielt in Westeros?", answer: "Game of Thrones", points: 200 },
        { question: "Wer spielte die Hauptrolle in 'Forrest Gump'?", answer: "Tom Hanks", points: 400 },
        { question: "Welcher Regisseur ist bekannt für Filme wie 'Pulp Fiction' und 'Inglourious Basterds'?", answer: "Quentin Tarantino", points: 500 }
    ],
    "Musik": [
        { question: "Wer ist bekannt für das Lied 'Bohemian Rhapsody'?", answer: "Queen", points: 100 },
        { question: "Welches Instrument spielt Kenny G?", answer: "Saxophon", points: 200 },
        { question: "Wer gilt als der King of Pop?", answer: "Michael Jackson", points: 400 },
        { question: "Welche Band sang den Hit 'Hotel California'?", answer: "Eagles", points: 500 }
    ],
    "Sport": [
        { question: "Wie viele Spieler sind in einer Fußballmannschaft auf dem Spielfeld?", answer: "11", points: 100 },
        { question: "Wo fanden die Olympischen Spiele 2016 statt?", answer: "Rio de Janeiro", points: 200 },
        { question: "Wer gewann die Fußball-Weltmeisterschaft 2014?", answer: "Deutschland", points: 400 },
        { question: "Welcher Sportler wird 'His Airness' genannt?", answer: "Michael Jordan", points: 500 }
    ],
    "Kunst": [
        { question: "Wer malte die Mona Lisa?", answer: "Leonardo da Vinci", points: 100 },
        { question: "Welche Farbe erhält man, wenn man Rot und Blau mischt?", answer: "Lila", points: 200 },
        { question: "In welcher Stadt steht die Freiheitsstatue?", answer: "New York", points: 400 },
        { question: "Welcher Künstler ist bekannt für seine surrealistischen Werke wie 'Die Beständigkeit der Erinnerung'?", answer: "Salvador Dalí", points: 500 }
    ],
    "Prominente": [
        { question: "Welche Schauspielerin ist bekannt für ihre Rolle als Hermione Granger in den Harry Potter Filmen?", answer: "Emma Watson", points: 100 },
        { question: "Welcher Tech-Milliardär gründete Tesla und SpaceX?", answer: "Elon Musk", points: 200 },
        { question: "Welche Sängerin ist bekannt für Hits wie 'Rolling in the Deep'?", answer: "Adele", points: 400 },
        { question: "Welcher Schauspieler spielte die Hauptrolle in der Serie 'Breaking Bad'?", answer: "Bryan Cranston", points: 500 }
    ]
};

const gameBoard = document.getElementById('game-board');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const countdownTimerElement = document.getElementById('countdown-timer');

let currentQuestion = null;
let score = 0;
let currentQuestionButton = null;
let countdownInterval = null;

let answeredQuestionsCount = 0; // Zähler für beantwortete Fragen
let totalQuestions = 0; // Gesamtzahl der Fragen

// Funktion zum Zählen der Gesamtzahl der Fragen beim Start
function countTotalQuestions() {
    for (const category in categories) {
        totalQuestions += categories[category].length;
    }
    console.log("Gesamtzahl der Fragen:", totalQuestions); // Optional: Zum Debuggen
}

function createGameBoard() {
    for (const category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        
        // Create a header for the category name
        const categoryTitle = document.createElement('h3');
        categoryTitle.innerText = category;
        categoryDiv.appendChild(categoryTitle);

        categories[category].forEach((item, index) => {
            const questionButton = document.createElement('button');
            questionButton.innerText = item.points;
            questionButton.onclick = () => selectQuestion(item);
            categoryDiv.appendChild(questionButton);
        });
        // Append the category div to the game board
        gameBoard.appendChild(categoryDiv);
    }
}

function selectQuestion(item) {
    currentQuestion = item;
    questionElement.innerText = item.question;
    answerInput.value = ''; // Clear previous answer
    feedbackElement.innerText = ''; // Clear previous feedback
    countdownTimerElement.innerText = ''; // Clear previous timer text
    questionContainer.style.display = 'block';
    
    // Disable the game board while the question is open
    gameBoard.style.pointerEvents = 'none';
    gameBoard.style.opacity = '0.5'; // Visuell anzeigen, dass es inaktiv ist

    // Store the button element and disable it temporarily
    currentQuestionButton = event.target; // Capture the button that was clicked
    currentQuestionButton.disabled = true;
}

document.getElementById('submit-answer').onclick = () => {
    // Disable and hide the submit button immediately to prevent spamming
    const submitButton = document.getElementById('submit-answer');
    submitButton.disabled = true;
    submitButton.style.visibility = 'hidden'; // Use visibility instead of display
    submitButton.style.pointerEvents = 'none'; // Disable clicks

    const userAnswer = answerInput.value.trim();
    let feedbackText = "";
    let pointsChange = 0;

    // Clear previous feedback classes
    feedbackElement.classList.remove('correct-feedback', 'incorrect-feedback');

    // Check if the correct answer includes the user answer (case-insensitive)
    if (currentQuestion.answer.toLowerCase().includes(userAnswer.toLowerCase())) {
        feedbackText = "Richtig!";
        pointsChange = currentQuestion.points;
        score += pointsChange;
        feedbackElement.classList.add('correct-feedback'); // Add class for correct answer
    } else {
        feedbackText = "Falsch!";
        pointsChange = -currentQuestion.points;
        score += pointsChange; // This will subtract points
        feedbackElement.classList.add('incorrect-feedback'); // Add class for incorrect answer
    }
    
    // Display feedback including the correct answer
    feedbackElement.innerText = feedbackText + " Die richtige Antwort war: " + currentQuestion.answer + ".";
    scoreElement.innerText = "Punktestand: " + score;
    answerInput.value = ''; // Clear the input field

    // Start the countdown timer
    let secondsLeft = 5; // Match the setTimeout duration
    countdownTimerElement.innerText = `Fenster schließt in ${secondsLeft} Sekunden`;

    countdownInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
            countdownTimerElement.innerText = `Fenster schließt in ${secondsLeft} Sekunden`;
        } else {
            countdownTimerElement.innerText = 'Fenster wird geschlossen...';
            clearInterval(countdownInterval); // Stop the timer
        }
    }, 1000); // Update every second

    // Delay hiding the question container
    setTimeout(() => {
        questionContainer.style.display = 'none';
        // Re-enable the button after processing, but keep it styled as answered
        if (currentQuestionButton) {
            currentQuestionButton.disabled = true; // Keep disabled so it cannot be clicked again
            currentQuestionButton.classList.add('answered'); // Add class for styling
            currentQuestionButton = null; // Clear the stored button
            answeredQuestionsCount++; // Erhöhe den Zähler für beantwortete Fragen
            checkGameEnd(); // Überprüfe, ob das Spiel vorbei ist
        }
        // Clear feedback and timer text when closed
        feedbackElement.innerText = ''; // Explicitly clear feedback text
        feedbackElement.classList.remove('correct-feedback', 'incorrect-feedback'); // Remove feedback classes
        countdownTimerElement.innerText = ''; // Clear timer text when closed

        // Re-enable the game board
        gameBoard.style.pointerEvents = 'auto';
        gameBoard.style.opacity = '1';

        // Re-enable and show the submit button after the timeout
        submitButton.disabled = false;
        submitButton.style.visibility = 'visible'; // Set visibility back to visible
        submitButton.style.pointerEvents = 'auto'; // Re-enable clicks

    }, 5000); // Keep open for 5 seconds
};

// Funktion zur Überprüfung, ob das Spiel beendet ist
function checkGameEnd() {
    const endScreen = document.getElementById('end-screen');
    const finalScoreElement = document.getElementById('final-score');

    if (answeredQuestionsCount === totalQuestions) {
        // Spiel ist vorbei
        gameBoard.style.display = 'none'; // Spielbrett ausblenden
        scoreElement.style.display = 'none'; // Punktestand ausblenden
        questionContainer.style.display = 'none'; // Fragen-Container ausblenden (falls noch offen)

        finalScoreElement.innerText = "Dein Endpunktestand: " + score;
        endScreen.style.display = 'block'; // Endbildschirm anzeigen
    }
}

// Initialisiere die Gesamtzahl der Fragen beim Laden des Skripts
countTotalQuestions();
createGameBoard();

// Modal-Logik
const guideModal = document.getElementById('guide-modal');
const closeGuideModalButton = document.getElementById('close-guide-modal');

// Zeige das Modal beim Laden der Seite
window.addEventListener('load', () => {
    guideModal.classList.remove('hidden');
});

// Schließe das Modal, wenn der Button geklickt wird
closeGuideModalButton.addEventListener('click', () => {
    guideModal.classList.add('hidden');
});

// Neustart-Button Logik
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    window.location.reload(); // Lädt die Seite neu, um das Spiel zurückzusetzen
});

// Event Listener, um das Layout nach vollständigem Laden der Seite zu aktualisieren
window.addEventListener('load', () => {
    const gameBoard = document.getElementById('game-board');
    // Kleine Verzögerung einbauen, um sicherzustellen, dass das DOM bereit ist und Bilder geladen sind
    setTimeout(() => {
        gameBoard.style.display = 'none';
        // Erzwingt ein Reflow/Neuberechnung des Layouts
        gameBoard.offsetHeight; 
        gameBoard.style.display = 'grid'; // Oder der ursprüngliche Display-Wert
    }, 100); // 100ms Verzögerung
});
