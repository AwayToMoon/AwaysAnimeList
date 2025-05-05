import { addToLeaderboard, getLeaderboard } from './leaderboard.js';

class GameQuiz {
    constructor() {
        this.correct = 0;
        this.wrong = 0;
        this.hcfCoins = 0;
        this.currentGame = null;
        this.currentBlur = 20;
        this.hintsUsed = 0;
        this.playerName = '';
        this.leaderboard = getLeaderboard();
        this.playedGames = new Set();
        this.playerId = this.generatePlayerId();
        
        // DOM Elemente
        this.nextButton = document.getElementById('nextButton');
        this.correctElement = document.getElementById('correct');
        this.wrongElement = document.getElementById('wrong');
        this.coinsElement = document.getElementById('coins');
        this.hintButton = document.getElementById('hintButton');
        this.endButton = document.getElementById('endButton');
        this.options = document.querySelectorAll('.option');
        this.nameInput = document.getElementById('nameInput');
        this.startButton = document.getElementById('startButton');
        this.leaderboardContainer = document.getElementById('leaderboard');
        
        // Event Listener
        this.nextButton.addEventListener('click', () => this.nextGame());
        this.hintButton.addEventListener('click', () => this.useHint());
        this.endButton.addEventListener('click', () => this.endGame());
        this.startButton.addEventListener('click', () => this.startGame());
        this.options.forEach(option => {
            option.addEventListener('click', () => this.checkAnswer(option));
        });
        
        // Leaderboard anzeigen
        this.updateLeaderboard();
        
        // Prüfen ob Spieler bereits existiert
        this.checkExistingPlayer();
    }

    generatePlayerId() {
        const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        localStorage.setItem('playerId', id);
        return id;
    }

    checkExistingPlayer() {
        const existingPlayer = this.leaderboard.find(entry => entry.playerId === this.playerId);
        if (existingPlayer) {
            this.nameInput.value = existingPlayer.name;
            this.nameInput.disabled = true;
            this.startButton.textContent = 'Weiterspielen';
        }
    }

    startGame() {
        const name = this.nameInput.value.trim();
        if (name.length < 2) {
            alert('Bitte gib einen Namen ein (mindestens 2 Zeichen)');
            return;
        }
        
        this.playerName = name;
        document.getElementById('nameScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        this.loadNewGame();
    }

    updateLeaderboard() {
        const leaderboardHTML = this.leaderboard
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((entry, index) => `
                <div class="leaderboard-entry ${index < 3 ? 'top-' + (index + 1) : ''}">
                    <span class="rank">#${index + 1}</span>
                    <span class="name">${entry.name}</span>
                    <span class="score">${entry.score} Punkte</span>
                    <span class="details">(${entry.correct} richtig, ${entry.wrong} falsch)</span>
                </div>
            `)
            .join('');
        
        this.leaderboardContainer.innerHTML = leaderboardHTML;
    }

    saveToLeaderboard() {
        const score = this.correct * 10 - this.wrong * 5;
        const entry = {
            playerId: this.playerId,
            name: this.playerName,
            score: score,
            correct: this.correct,
            wrong: this.wrong,
            date: new Date().toLocaleDateString()
        };
        
        addToLeaderboard(entry);
        this.leaderboard = getLeaderboard();
        this.updateLeaderboard();
    }

    // Spiele-Quiz mit verschiedenen Kategorien
    games = [
        // Action-Adventure
        {
            title: "The Legend of Zelda: Breath of the Wild",
            category: "Action-Adventure",
            image: "https://assets.nintendo.eu/image/upload/f_auto,c_limit,w_992,q_auto:low/MNS/NOE/70010000000023/SQ_NSwitch_TheLegendOfZeldaBreathOfTheWild_E",
            options: ["The Legend of Zelda: Breath of the Wild", "The Legend of Zelda: Skyward Sword", "The Legend of Zelda: Twilight Princess", "The Legend of Zelda: Wind Waker"]
        },
        {
            title: "God of War Ragnarök",
            category: "Action-Adventure",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1738256985",
            options: ["God of War Ragnarök", "God of War (2018)", "God of War III", "God of War: Ghost of Sparta"]
        },
        {
            title: "Red Dead Redemption 2",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA08519_00/12/i_3da1cf7c41dc7652f9b639e1680d96436773658668c7dc3930c441291095713b/i/icon0.png",
            options: ["Red Dead Redemption 2", "Red Dead Redemption", "GTA V", "GTA IV"]
        },
        {
            title: "The Last of Us Part II",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2618/w48z6bzefZPrRcJHc7L8SO66.png",
            options: ["The Last of Us Part II", "The Last of Us", "Days Gone", "Resident Evil 4"]
        },
        {
            title: "Elden Ring",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/vulcan/img/rnd/202111/0506/hcFeWRVGHYK72uOw6Mn6f4Ms.jpg",
            options: ["Elden Ring", "Dark Souls III", "Bloodborne", "Sekiro: Shadows Die Twice"]
        },
        {
            title: "Horizon Zero Dawn",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202409/2716/16b33fa9a5c7285ba86a035b4a1c5f8eb430b407eae35ffd.png",
            options: ["Horizon Zero Dawn", "Horizon Forbidden West", "Assassin's Creed Valhalla", "Ghost of Tsushima"]
        },
        {
            title: "Ghost of Tsushima",
            category: "Action-Adventure",
            image: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-keyart-01-en-15jun21?$facebook$",
            options: ["Ghost of Tsushima", "Sekiro: Shadows Die Twice", "Nioh", "Tenchu"]
        },
        {
            title: "Spider-Man",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png",
            options: ["Spider-Man", "Spider-Man: Miles Morales", "Batman: Arkham Knight", "Infamous Second Son"]
        },
        {
            title: "Assassin's Creed Valhalla",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202007/0208/Ud7Ikvjoyev61bx3n1PTC9u8.png",
            options: ["Assassin's Creed Valhalla", "Assassin's Creed Odyssey", "Assassin's Creed Origins", "The Witcher 3"]
        },
        {
            title: "Death Stranding",
            category: "Action-Adventure",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202106/2214/UXDlNJfdtZJ080ONmH8q3CUX.png",
            options: ["Death Stranding", "Metal Gear Solid V", "Horizon Zero Dawn", "Days Gone"]
        },

        // RPG
        {
            title: "The Witcher 3: Wild Hunt",
            category: "RPG",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
            options: ["The Witcher 3: Wild Hunt", "The Witcher 2", "Dragon Age: Inquisition", "Mass Effect Legendary Edition"]
        },
        {
            title: "Final Fantasy XVI",
            category: "RPG",
            image: "https://fyre.cdn.sewest.net/ff-xvi/637cf9194dc880a0db62c591/hero_bg-tT8XHFrO5.jpg?quality=85&width=3840",
            options: ["Final Fantasy XVI", "Final Fantasy XV", "Final Fantasy VII Remake", "Final Fantasy XIV"]
        },
        {
            title: "Persona 5 Royal",
            category: "RPG",
            image: "https://image.api.playstation.com/vulcan/img/cfn/11307YAAIxp7MZ2CspnYs9t7Eh7peTJys3KSrDMBplPuTdG0xmlQGSIXvf6-4Z6PhtxTIFymdkdSCH_hRDdI9T7dh-wh_zfu.png",
            options: ["Persona 5 Royal", "Persona 4 Golden", "Shin Megami Tensei V", "Tales of Arise"]
        },
        {
            title: "Dragon Quest XI",
            category: "RPG",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202007/1607/66kZtAtqVJ8PgopTNhzukiCU.png",
            options: ["Dragon Quest XI", "Dragon Quest VIII", "Dragon Quest IX", "Dragon Quest X"]
        },
        {
            title: "Baldur's Gate 3",
            category: "RPG",
            image: "https://store-images.s-microsoft.com/image/apps.4974.13550459053619040.81610713-4c64-470c-b543-bcffffaa6ea3.efb7c846-2f32-4a2d-b2d4-cd8109721332?q=90&w=480&h=270",
            options: ["Baldur's Gate 3", "Divinity: Original Sin 2", "Pillars of Eternity", "Pathfinder: Wrath of the Righteous"]
        },

        // Shooter
        {
            title: "Call of Duty: Modern Warfare III",
            category: "Shooter",
            image: "https://store-images.s-microsoft.com/image/apps.55183.14623575291286193.52ecceb7-ac9f-47e8-a29f-30ab63f33131.048bddb8-7ab3-4ba2-85b8-6acb95ee03b5",
            options: ["Call of Duty: Modern Warfare III", "Call of Duty: Modern Warfare II", "Call of Duty: Warzone", "Battlefield 2042"]
        },
        {
            title: "Halo Infinite",
            category: "Shooter",
            image: "https://upload.wikimedia.org/wikipedia/en/1/14/Halo_Infinite.png",
            options: ["Halo Infinite", "Halo 5: Guardians", "Halo 4", "Halo: Reach"]
        },
        {
            title: "Destiny 2",
            category: "Shooter",
            image: "https://cdn1.epicgames.com/offer/428115def4ca4deea9d69c99c5a5a99e/EN_Bungie_D2_S26_OfferPortrait_S2_1200x1600_1200x1600-e028bac34f94e8d86a27bdc12a381c5e",
            options: ["Destiny 2", "Destiny", "Borderlands 3", "Outriders"]
        },
        {
            title: "Apex Legends",
            category: "Shooter",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/6f306d0c6bd5fb524a280cf2560f84854cadb829/capsule_616x353.jpg?t=1741980558",
            options: ["Apex Legends", "Titanfall 2", "Overwatch 2", "Valorant"]
        },
        {
            title: "Counter-Strike 2",
            category: "Shooter",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/CS2_Cover_Art.jpg/250px-CS2_Cover_Art.jpg",
            options: ["Counter-Strike 2", "Counter-Strike: Global Offensive", "Valorant", "Rainbow Six Siege"]
        },

        // Fighting Games
        {
            title: "Street Fighter 6",
            category: "Fighting",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202211/1408/ENialNds5tXo7Mb9ahX2yESt.png",
            options: ["Street Fighter 6", "Street Fighter V", "Mortal Kombat 1", "Tekken 8"]
        },
        {
            title: "Mortal Kombat 1",
            category: "Fighting",
            image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1971870/capsule_616x353.jpg?t=1729006754",
            options: ["Mortal Kombat 1", "Mortal Kombat 11", "Injustice 2", "Guilty Gear Strive"]
        },
        {
            title: "Tekken 8",
            category: "Fighting",
            image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1778820/capsule_616x353.jpg?t=1743744777",
            options: ["Tekken 8", "Tekken 7", "Soulcalibur VI", "Virtua Fighter 5"]
        },
        {
            title: "Guilty Gear Strive",
            category: "Fighting",
            image: "https://upload.wikimedia.org/wikipedia/en/7/7d/Guilty_Gear_Strive.jpg",
            options: ["Guilty Gear Strive", "Guilty Gear Xrd", "BlazBlue", "Granblue Fantasy Versus"]
        },
        {
            title: "Super Smash Bros. Ultimate",
            category: "Fighting",
            image: "https://assets.nintendo.eu/image/upload/v1616776822/MNS/Content%20Pages%20Assets/Category-List%20Pages/Franchises/Super%20Smash%20Bros/16.9_SuperSmashBrosUltimatejpg.jpg",
            options: ["Super Smash Bros. Ultimate", "Super Smash Bros. for Wii U", "Super Smash Bros. Brawl", "Super Smash Bros. Melee"]
        },

        // Racing Games
        {
            title: "Gran Turismo 7",
            category: "Racing",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202202/2806/QDzid2jNv4e44kgumGXDCscF.png",
            options: ["Gran Turismo 7", "Gran Turismo Sport", "Forza Motorsport", "Project CARS 3"]
        },
        {
            title: "Forza Horizon 5",
            category: "Racing",
            image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1551360/capsule_616x353.jpg?t=1741106928",
            options: ["Forza Horizon 5", "Forza Horizon 4", "The Crew Motorfest", "Need for Speed Unbound"]
        },
        {
            title: "Mario Kart 8 Deluxe",
            category: "Racing",
            image: "https://assets.nintendo.eu/image/upload/f_auto,c_limit,w_992,q_auto:low/MNS/NOE/70010000000126/SQ_NSwitch_MarioKart8Deluxe",
            options: ["Mario Kart 8 Deluxe", "Mario Kart 8", "Mario Kart 7", "Mario Kart Wii"]
        },
        {
            title: "F1 23",
            category: "Racing",
            image: "https://media.contentapi.ea.com/content/dam/ea/f1/f1-23/common/featured-image/f123-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg",
            options: ["F1 23", "F1 22", "F1 2021", "F1 2020"]
        },
        {
            title: "WRC Generations",
            category: "Racing",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202205/1214/jrPHWEkxs0V0P19tJjgu2Li8.png",
            options: ["WRC Generations", "WRC 10", "Dirt Rally 2.0", "Rally Simulator"]
        },

        // Sports Games
        {
            title: "FIFA 24",
            category: "Sports",
            image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2195250/f11315d7491f706b09b059d12424f711e9778b82/capsule_616x353.jpg?t=1743020121",
            options: ["FIFA 24", "FIFA 23", "eFootball 2024", "Football Manager 2024"]
        },
        {
            title: "NBA 2K24",
            category: "Sports",
            image: "https://images.g2a.com/360x600/1x1x1/nba-2k24-pc-steam-key-global-i10000340079003/ab48850851ea4383a0be3895",
            options: ["NBA 2K24", "NBA 2K23", "NBA Live 19", "NBA 2K22"]
        },
        {
            title: "Madden NFL 24",
            category: "Sports",
            image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2140330/capsule_616x353.jpg?t=1730826602",
            options: ["Madden NFL 24", "Madden NFL 23", "NFL 2K5", "NFL Street"]
        },
        {
            title: "MLB The Show 24",
            category: "Sports",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3k4TNvvQWCi2LAq5kCHELrF0ZFk1GR8eP3Q&s",
            options: ["MLB The Show 24", "MLB The Show 23", "MLB The Show 22", "MLB The Show 21"]
        },
        {
            title: "WWE 2K24",
            category: "Sports",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2315690/capsule_616x353.jpg?t=1731609533",
            options: ["WWE 2K24", "WWE 2K23", "WWE 2K22", "WWE 2K20"]
        },

        // Strategy Games
        {
            title: "Civilization VI",
            category: "Strategy",
            image: "https://image.api.playstation.com/vulcan/img/cfn/11307KFcs3gBlcheONy-ZOYZ5kplFnq5jXinUSI8HkCc8P2gdI1_32JrKJ-vxns32LjXBcQteG2EOwuzWS_KXqE5VCYFmS4Z.png",
            options: ["Civilization VI", "Civilization V", "Age of Empires IV", "Total War: Warhammer III"]
        },
        {
            title: "Total War: Warhammer III",
            category: "Strategy",
            image: "https://store-images.s-microsoft.com/image/apps.27037.14262631053024293.1d44abbd-ea52-4439-a8e6-4e0afe1a1e5c.f0be82e7-4516-4f84-937d-7afc1862e7c0?q=90&w=480&h=270",
            options: ["Total War: Warhammer III", "Total War: Warhammer II", "Total War: Three Kingdoms", "Total War: Rome II"]
        },
        {
            title: "Age of Empires IV",
            category: "Strategy",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Offizielle_Concept_Art_von_Age_of_Empires_IV.png",
            options: ["Age of Empires IV", "Age of Empires III", "Age of Empires II", "Age of Empires"]
        },
        {
            title: "Crusader Kings III",
            category: "Strategy",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202108/1607/czGau6hOvx9iQYOOkACdxqDl.png",
            options: ["Crusader Kings III", "Crusader Kings II", "Europa Universalis IV", "Hearts of Iron IV"]
        },
        {
            title: "Stellaris",
            category: "Strategy",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/281990/header.jpg?t=1744297340",
            options: ["Stellaris", "Endless Space 2", "Sins of a Solar Empire", "Galactic Civilizations IV"]
        },

        // Platformer
        {
            title: "Super Mario Bros. Wonder",
            category: "Platformer",
            image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg",
            options: ["Super Mario Bros. Wonder", "Super Mario Odyssey", "Super Mario 3D World", "Super Mario Galaxy"]
        },
        {
            title: "Sonic Frontiers",
            category: "Platformer",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1237320/capsule_616x353.jpg?t=1741795892",
            options: ["Sonic Frontiers", "Sonic Forces", "Sonic Mania", "Sonic Generations"]
        },
        {
            title: "Crash Bandicoot 4",
            category: "Platformer",
            image: "https://image.api.playstation.com/vulcan/img/rnd/202111/1918/psoOkDbYuMdr1RsJo6TpU6bg.png",
            options: ["Crash Bandicoot 4", "Crash Bandicoot N. Sane Trilogy", "Spyro Reignited Trilogy", "Ratchet & Clank"]
        },
        {
            title: "Ratchet & Clank: Rift Apart",
            category: "Platformer",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/DwVjpbKOsFOyPdNzmSTSWuxG.png",
            options: ["Ratchet & Clank: Rift Apart", "Ratchet & Clank (2016)", "Ratchet & Clank: A Crack in Time", "Ratchet & Clank: Tools of Destruction"]
        },
        {
            title: "Hollow Knight",
            category: "Platformer",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdcVzU6WJ98bkU8prM5LOusS3QSk0cjYUvQ&s",
            options: ["Hollow Knight", "Ori and the Will of the Wisps", "Celeste", "Cuphead"]
        },

        // Horror Games
        {
            title: "Resident Evil 4 Remake",
            category: "Horror",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202210/0706/EVWyZD63pahuh95eKloFaJuC.png",
            options: ["Resident Evil 4 Remake", "Resident Evil 4", "Resident Evil 2 Remake", "Resident Evil 3 Remake"]
        },
        {
            title: "Dead Space Remake",
            category: "Horror",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1693980/capsule_616x353.jpg?t=1702492799",
            options: ["Dead Space Remake", "Dead Space", "Dead Space 2", "Dead Space 3"]
        },
        {
            title: "Alan Wake 2",
            category: "Horror",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202305/2420/c3daf3037feb797d9e71b81618e3b5ff3ff1f9609db5a4a2.png",
            options: ["Alan Wake 2", "Alan Wake", "Control", "Quantum Break"]
        },
        {
            title: "The Callisto Protocol",
            category: "Horror",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0222/pqZVlL42HwbUMdSAyNQoRnzg.png",
            options: ["The Callisto Protocol", "Dead Space", "Alien: Isolation", "The Evil Within"]
        },
        {
            title: "Layers of Fear",
            category: "Horror",
            image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1946700/capsule_616x353.jpg?t=1732889537",
            options: ["Layers of Fear", "Layers of Fear 2", "Amnesia: The Dark Descent", "Outlast"]
        }
    ];

    loadNewGame() {
        // Prüfen ob alle Spiele bereits gespielt wurden
        if (this.playedGames.size >= this.games.length) {
            this.endGame();
            return;
        }
        
        // Zufälliges Spiel auswählen, das noch nicht gespielt wurde
        let availableGames = this.games.filter(game => !this.playedGames.has(game.title));
        this.currentGame = availableGames[Math.floor(Math.random() * availableGames.length)];
        
        // Spiel zur Liste der gespielten Spiele hinzufügen
        this.playedGames.add(this.currentGame.title);
        
        // Bild-Container aktualisieren
        const imageContainer = document.querySelector('.waveform');
        imageContainer.innerHTML = `
            <img class="game-preview" src="${this.currentGame.image}" alt="${this.currentGame.title}">
        `;
        
        // Bild initial stark verschwommen
        const image = imageContainer.querySelector('.game-preview');
        image.style.filter = `blur(${this.currentBlur}px)`;
        
        // Optionen mischen und anzeigen
        const shuffledOptions = this.shuffleArray([...this.currentGame.options]);
        this.options.forEach((option, index) => {
            option.textContent = shuffledOptions[index];
            option.dataset.correct = shuffledOptions[index] === this.currentGame.title;
            option.classList.remove('correct', 'wrong');
        });
        
        // UI zurücksetzen
        this.nextButton.disabled = true;
        this.currentBlur = 20;
        this.hintsUsed = 0;
        this.hintButton.disabled = false;
    }

    useHint() {
        if (this.hcfCoins > 0 && this.hintsUsed < 3) {
            this.hcfCoins--;
            this.coinsElement.textContent = this.hcfCoins;
            this.hintsUsed++;
            
            const image = document.querySelector('.game-preview');
            this.currentBlur = Math.max(0, this.currentBlur - 5);
            image.style.filter = `blur(${this.currentBlur}px)`;
            
            if (this.hintsUsed >= 3) {
                this.hintButton.disabled = true;
            }
        }
    }

    checkAnswer(selectedOption) {
        if (this.nextButton.disabled === false) return; // Antwort bereits gegeben
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        // Visuelles Feedback
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');
        
        if (isCorrect) {
            this.correct++;
            this.hcfCoins++;
            this.correctElement.textContent = this.correct;
            this.coinsElement.textContent = this.hcfCoins;
        } else {
            this.wrong++;
            this.wrongElement.textContent = this.wrong;
        }
        
        this.nextButton.disabled = false;
    }

    endGame() {
        this.saveToLeaderboard();
        
        // Spiel-Overlay anzeigen
        const gameOverScreen = document.getElementById('gameOverScreen');
        const finalScore = this.correct * 10 - this.wrong * 5;
        
        gameOverScreen.innerHTML = `
            <div class="game-over-content">
                <h2>Spiel beendet!</h2>
                <p>Dein Ergebnis:</p>
                <div class="final-stats">
                    <p>Richtig: ${this.correct}</p>
                    <p>Falsch: ${this.wrong}</p>
                    <p>HCF Coins: ${this.hcfCoins}</p>
                    <p>Gesamtpunktzahl: ${finalScore}</p>
                </div>
                <button onclick="location.reload()">Neu starten</button>
            </div>
        `;
        
        gameOverScreen.style.display = 'flex';
    }

    nextGame() {
        this.loadNewGame();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Spiel initialisieren
document.addEventListener('DOMContentLoaded', () => {
    new GameQuiz();
});
