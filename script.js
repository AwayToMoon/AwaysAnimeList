// Charaktere
const characters = [
    { name: "Margot Robbie", image: "https://imgix.ranker.com/user_node_img/1641/32800165/original/32800165-photo-u-1437653758?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Ana de Armas", image: "https://imgix.ranker.com/user_node_img/1551/31000870/original/ana-de-armas-photo-u26?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Scarlett Johansson", image: "https://imgix.ranker.com/user_node_img/100/1984943/original/scarlett-johansson-recording-artists-and-groups-photo-u166?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Jessica Alba", image: "https://imgix.ranker.com/user_node_img/65/1285612/original/1285612-photo-u-1041207549?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Alexandra Daddario", image: "https://imgix.ranker.com/user_node_img/1548/30955921/original/alexandra-daddario-photo-u109?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Gal Gadot", image: "https://imgix.ranker.com/user_node_img/53/1041357/original/1041357-photo-u2146145864?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Emma Watson", image: "https://image.gala.de/22628744/t/PZ/v5/w960/r0.6667/-/emma-watson-2021-10-17.jpg" },
    { name: "Sydney Sweeney", image: "https://imgix.ranker.com/user_node_img/1210/24194612/original/sydney-sweeney-u1895809208?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300" },
    { name: "Zendaya", image: "https://www.hollywoodreporter.com/wp-content/uploads/2023/08/GettyImages-1497018169-H-2023.jpg?w=1296&h=730&crop=1" },
    { name: "Elizabeth Olsen", image: "https://imgix.ranker.com/user_node_img/1590/31793173/original/elizabeth-olsen-people-in-tv-photo-u16?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Emilia Clarke", image: "https://media.vogue.de/photos/5beeefec5c5243377bf1cb8a/2:3/w_2560%2Cc_limit/Emilia-Clarke-Aufmacher.jpg" },
    { name: "Megan Fox", image: "https://imgix.ranker.com/user_node_img/78/1558135/original/1558135-photo-u-30226905?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Anne Hathaway", image: "https://imgix.ranker.com/user_node_img/24/468745/original/anne-hathaway-photo-u352?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Jennifer Lawrence", image: "https://imgix.ranker.com/user_node_img/65/1281504/original/1281504-photo-u-1423690460?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Emma Stone", image: "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_FMjpg_UX1000_.jpg" },
    { name: "Natalie Portman", image: "https://imgix.ranker.com/user_node_img/83/1648992/original/1648992-photo-u1088517660?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Selena Gomez", image: "https://i0.gmx.at/image/390/38731390,pd=2,f=size-l/selena-gomez.jpg" },
    { name: "Angelina Jolie", image: "https://image.gala.de/24334032/t/t4/v3/w960/r0.6667/-/25--wurde-ihr-sohn-zu-ihrem-mieter----1-1---spoton-article-1090595.jpg" },
    { name: "Blake Lively", image: "https://people.com/thmb/JWW3QV0Uzp2nbIyMOOLIuFreyKQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/blake-lively--time100-04242025-924466c63120434e80ab621e8856d1ec.jpg" },
    { name: "Lily Collins", image: "https://hips.hearstapps.com/hmg-prod/images/lily-collins-attends-the-devil-wears-prada-the-musical-news-photo-1733139409.jpg?crop=1xw:0.66699xh;center,top&resize=1200:*" },
    { name: "Nina Dobrev", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nina_Dobrev_at_PaleyFest2010.jpg/250px-Nina_Dobrev_at_PaleyFest2010.jpg" },
    { name: "Victoria Justice", image: "https://m.media-amazon.com/images/M/MV5BMzE3NjEzYmQtODNhZS00ZDU1LTg5NGMtMmVlNzRjNDFiMzQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Madison Beer", image: "https://imgix.ranker.com/user_node_img/4035/80686523/original/madison-beer-photo-u16?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Ariana Grande", image: "https://image.gala.de/23910930/t/5Z/v5/w960/r0.6667/-/ariana-grande.jpg" },
    { name: "Hailee Steinfeld", image: "https://i0.gmx.at/image/382/37987382,pd=1,f=size-l/hailee-steinfeld.jpg" },
    { name: "Barbara Palvin", image: "https://i.pinimg.com/736x/34/6a/fd/346afde34a1cf7413e729ce6b822183e.jpg" },
    { name: "Kendall Jenner", image: "https://i0.gmx.at/image/234/39021234,pd=1/kendall-jenner.jpg" },
    { name: "Bella Hadid", image: "https://content5.promiflash.de/article-images/square600/bella-hadid-laechelt-4.jpg" },
    { name: "Dua Lipa", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Glasto24_28_300624_%28259_of_545%29_%2853838014719%29_%28cropped%29.jpg/1200px-Glasto24_28_300624_%28259_of_545%29_%2853838014719%29_%28cropped%29.jpg" },
    { name: "Lily James", image: "https://de.web.img3.acsta.net/pictures/210/432/21043227_20130923203108321.jpg" },
    { name: "Millie Bobby Brown", image: "https://image.gala.de/24310008/t/3g/v2/w1440/r1/-/millie-bobbie-brown-teaser.jpg" },
    { name: "Olivia Rodrigo", image: "https://image.gala.de/22494124/t/K2/v5/w960/r1/-/olivia-rodrigo.jpg" },
    { name: "Camila Mendes", image: "https://media.themoviedb.org/t/p/w500/pZAWRHdJtJlDcWuQHlgIwX12s02.jpg" },
    { name: "Lili Reinhart", image: "https://static01.nyt.com/images/2020/10/01/fashion/01REINHART2/merlin_176246820_976c92de-ed01-4ae6-8369-d4596d4ee683-superJumbo.jpg" },
    { name: "Dove Cameron", image: "https://fr.web.img6.acsta.net/pictures/18/01/08/13/57/3752878.jpg" },
    { name: "Taylor Swift", image: "https://i0.gmx.at/image/468/38837468,pd=1,f=size-l/taylor-swift.jpg" },
    { name: "Rihanna", image: "https://www.rollingstone.de/wp-content/uploads/2021/02/17/15/rihanna-gettyimages-821622848-scaled.jpg" },
    { name: "Beyoncé", image: "https://imageio.forbes.com/specials-images/imageserve/6760517984921923e8effbcd/0x0.jpg?format=jpg&crop=1736,1737,x834,y79,safe&height=416&width=416&fit=bounds" },
    { name: "Lady Gaga", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Lady_Gaga_at_the_White_House_in_2023_%283%29.jpg/250px-Lady_Gaga_at_the_White_House_in_2023_%283%29.jpg" },
    { name: "Katy Perry", image: "https://cdn1-production-images-kly.akamaized.net/MVCpPIEZaeUtcgInvwCIoOI_D1w=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4222292/original/002123100_1668100611-Katy_Perry-6.jpg" },
    { name: "Jennifer Lopez", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Jennifer_Lopez_at_the_2025_Sundance_Film_Festival_%28cropped_3%29.jpg/1200px-Jennifer_Lopez_at_the_2025_Sundance_Film_Festival_%28cropped_3%29.jpg" },
    { name: "Shakira", image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2902.jpg" },
    { name: "Salma Hayek", image: "https://imgix.ranker.com/user_node_img/99/1964570/original/salma-hayek-recording-artists-and-groups-photo-u54?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Sofia Vergara", image: "https://image.gala.de/24102332/t/bC/v5/w960/r0.6667/-/vergara-teaser.jpg" },
    { name: "Eva Mendes", image: "https://image.gala.de/24215244/t/qN/v4/w960/r0.6667/-/eva-mendes-teaser.jpg" },
    { name: "Penélope Cruz", image: "https://de.web.img3.acsta.net/pictures/18/03/23/15/18/0881779.jpg" },
    { name: "Monica Bellucci", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Monica_Bellucci%2C_Women%27s_World_Awards_2009_b.jpg/960px-Monica_Bellucci%2C_Women%27s_World_Awards_2009_b.jpg" },
    { name: "Kate Beckinsale", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Kate_Beckinsale_2011_Comic-Con_%28truer_color%29.jpg/1200px-Kate_Beckinsale_2011_Comic-Con_%28truer_color%29.jpg" },
    { name: "Charlize Theron", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Charlize_Theron_2013.jpg/640px-Charlize_Theron_2013.jpg" },
    { name: "Mila Kunis", image: "https://i0.gmx.at/image/138/36652138,pd=1/mila-kunis.jpg" },
    { name: "Adriana Lima", image: "https://imgix.ranker.com/user_node_img/21/403630/original/adriana-lima-photo-u249?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Mia Khalifa 😏", image: "https://i.ebayimg.com/images/g/IG4AAOSwIytgPsiu/s-l400.jpg" },
];

let currentCharacterIndex = 0;

// DOM-Elemente
const currentImage = document.getElementById('current-image');
const characterName = document.getElementById('character-name');
const smashBtn = document.getElementById('smash-btn');
const marryBtn = document.getElementById('marry-btn');
const passBtn = document.getElementById('pass-btn');
const counter = document.getElementById('counter');

// Funktion zum Anzeigen des aktuellen Charakters
function displayCharacter() {
    if (currentCharacterIndex < characters.length) {
        const character = characters[currentCharacterIndex];
        currentImage.src = character.image;
        characterName.textContent = character.name;
        counter.textContent = `${currentCharacterIndex + 1}/${characters.length}`;
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
    // Emoji erstellen und hinzufügen
    const emoji = document.createElement('div');
    emoji.className = 'animation-emoji';
    emoji.textContent = '💦';
    currentImage.parentElement.appendChild(emoji);
    
    // Animationen starten
    currentImage.classList.add('smash-animation');
    emoji.classList.add('emoji-animation');
    
    setTimeout(() => {
        currentCharacterIndex++;
        displayCharacter();
        currentImage.classList.remove('smash-animation');
        emoji.remove();
    }, 700);
});

marryBtn.addEventListener('click', () => {
    // Emoji erstellen und hinzufügen
    const emoji = document.createElement('div');
    emoji.className = 'animation-emoji';
    emoji.textContent = '👰🏽‍♀️';
    currentImage.parentElement.appendChild(emoji);
    
    // Animationen starten
    currentImage.classList.add('marry-animation');
    emoji.classList.add('emoji-animation');
    
    setTimeout(() => {
        currentCharacterIndex++;
        displayCharacter();
        currentImage.classList.remove('marry-animation');
        emoji.remove();
    }, 700);
});

passBtn.addEventListener('click', () => {
    // Emoji erstellen und hinzufügen
    const emoji = document.createElement('div');
    emoji.className = 'animation-emoji';
    emoji.textContent = '☠️';
    currentImage.parentElement.appendChild(emoji);
    
    // Animationen starten
    currentImage.classList.add('kill-animation');
    emoji.classList.add('emoji-animation');
    
    setTimeout(() => {
        currentCharacterIndex++;
        displayCharacter();
        currentImage.classList.remove('kill-animation');
        emoji.remove();
    }, 700);
});

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    currentCharacterIndex = 0;
    displayCharacter();
}

// Spiel initialisieren
displayCharacter();
