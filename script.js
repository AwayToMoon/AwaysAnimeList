const games = [
    // Action-Adventure
    {
        name: "The Legend of Zelda: Breath of the Wild",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/wiiu_14/SI_WiiU_TheLegendOfZeldaBreathOfTheWild_image1600w.jpg",
        options: ["The Legend of Zelda: Breath of the Wild", "The Legend of Zelda: Skyward Sword", "The Legend of Zelda: Twilight Princess", "The Legend of Zelda: Wind Waker"]
    },
    {
        name: "God of War Ragnarök",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1738256985",
        options: ["God of War Ragnarök", "God of War (2018)", "God of War III", "God of War: Ghost of Sparta"]
    },
    {
        name: "Red Dead Redemption 2",
        image: "https://gepig.com/game_cover_460w/3905.jpg",
        options: ["Red Dead Redemption 2", "Red Dead Redemption", "GTA V", "GTA IV"]
    },
    {
        name: "The Last of Us Part II",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/0b68ebf352db559cb45a75bd32fed3381f34dc52c5480192.png",
        options: ["The Last of Us Part II", "The Last of Us", "Days Gone", "Resident Evil 4"]
    },
    {
        name: "Elden Ring",
        image: "https://image.api.playstation.com/vulcan/img/rnd/202111/0506/hcFeWRVGHYK72uOw6Mn6f4Ms.jpg",
        options: ["Elden Ring", "Dark Souls III", "Bloodborne", "Sekiro: Shadows Die Twice"]
    },
    {
        name: "Horizon Zero Dawn",
        image: "https://cdn1.epicgames.com/3328b08ac1c14540aa265a1a85c07839/offer/hzd_wide-2560x1440-bd312be05c49cf339097777c493cb899.jpg",
        options: ["Horizon Zero Dawn", "Horizon Forbidden West", "Assassin's Creed Valhalla", "Ghost of Tsushima"]
    },
    {
        name: "Ghost of Tsushima",
        image: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-keyart-01-en-15jun21?$facebook$",
        options: ["Ghost of Tsushima", "Sekiro: Shadows Die Twice", "Nioh", "Tenchu"]
    },
    {
        name: "Spider-Man",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/capsule_616x353.jpg?t=1725652915",
        options: ["Spider-Man", "Spider-Man: Miles Morales", "Batman: Arkham Knight", "Infamous Second Son"]
    },
    {
        name: "Assassin's Creed Valhalla",
        image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2208920/header.jpg?t=1697654233",
        options: ["Assassin's Creed Valhalla", "Assassin's Creed Odyssey", "Assassin's Creed Origins", "The Witcher 3"]
    },
    {
        name: "Death Stranding",
        image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2715/DSDJMtBukq8sscRQjmiF5asv.jpg",
        options: ["Death Stranding", "Metal Gear Solid V", "Horizon Zero Dawn", "Days Gone"]
    },

    // RPG
    {
        name: "The Witcher 3: Wild Hunt",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_TheWitcher3WildHunt_enGB.jpg",
        options: ["The Witcher 3: Wild Hunt", "The Witcher 2", "Dragon Age: Inquisition", "Mass Effect Legendary Edition"]
    },
    {
        name: "Final Fantasy XVI",
        image: "https://gh.cdn.sewest.net/assets/ident/news/e70501d2/ffxiv-art-duzum75n4.jpg?quality=65",
        options: ["Final Fantasy XVI", "Final Fantasy XV", "Final Fantasy VII Remake", "Final Fantasy XIV"]
    },
    {
        name: "Persona 5 Royal",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/capsule_616x353.jpg?t=1733297467",
        options: ["Persona 5 Royal", "Persona 4 Golden", "Shin Megami Tensei V", "Tales of Arise"]
    },
    {
        name: "Dragon Quest XI",
        image: "https://i.ytimg.com/vi/0FKwPtoc-Gw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA80LUfUGatBujkYDWHN_BxxsCfEg",
        options: ["Dragon Quest XI", "Dragon Quest VIII", "Dragon Quest IX", "Dragon Quest X"]
    },
    {
        name: "Baldur's Gate 3",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/6b6b46089067683cecf6acfc92b39fc4c72e3fac/header.jpg?t=1744744220",
        options: ["Baldur's Gate 3", "Divinity: Original Sin 2", "Pillars of Eternity", "Pathfinder: Wrath of the Righteous"]
    },

    // Shooter
    {
        name: "Call of Duty: Modern Warfare III",
        image: "https://gaming-cdn.com/images/products/15290/orig/call-of-duty-modern-warfare-iii-playstation-5-spel-playstation-store-europe-cover.jpg?v=1732818104",
        options: ["Call of Duty: Modern Warfare III", "Call of Duty: Modern Warfare II", "Call of Duty: Warzone", "Battlefield 2042"]
    },
    {
        name: "Halo Infinite",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1708091/capsule_616x353.jpg?t=1706638660",
        options: ["Halo Infinite", "Halo 5: Guardians", "Halo 4", "Halo: Reach"]
    },
    {
        name: "Destiny 2",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1085660/header_german.jpg?t=1738688481",
        options: ["Destiny 2", "Destiny", "Borderlands 3", "Outriders"]
    },
    {
        name: "Apex Legends",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/6f306d0c6bd5fb524a280cf2560f84854cadb829/capsule_616x353.jpg?t=1741980558",
        options: ["Apex Legends", "Titanfall 2", "Overwatch 2", "Valorant"]
    },
    {
        name: "Counter-Strike 2",
        image: "https://gaming-cdn.com/images/products/13664/orig/counter-strike-2-pc-spiel-steam-cover.jpg?v=1695885435",
        options: ["Counter-Strike 2", "Counter-Strike: Global Offensive", "Valorant", "Rainbow Six Siege"]
    },

    // Fighting Games
    {
        name: "Street Fighter 6",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1364780/extras/13_Custom-Images_ST.png?t=1739428401",
        options: ["Street Fighter 6", "Street Fighter V", "Mortal Kombat 1", "Tekken 8"]
    },
    {
        name: "Mortal Kombat 1",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1971870/capsule_616x353.jpg?t=1729006754",
        options: ["Mortal Kombat 1", "Mortal Kombat 11", "Injustice 2", "Guilty Gear Strive"]
    },
    {
        name: "Tekken 8",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1778820/capsule_616x353.jpg?t=1743744777",
        options: ["Tekken 8", "Tekken 7", "Soulcalibur VI", "Virtua Fighter 5"]
    },
    {
        name: "Guilty Gear Strive",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1384160/header.jpg?t=1745545944",
        options: ["Guilty Gear Strive", "Guilty Gear Xrd", "BlazBlue", "Granblue Fantasy Versus"]
    },
    {
        name: "Super Smash Bros. Ultimate",
        image: "https://assets.nintendo.eu/image/upload/v1616776822/MNS/Content%20Pages%20Assets/Category-List%20Pages/Franchises/Super%20Smash%20Bros/16.9_SuperSmashBrosUltimatejpg.jpg",
        options: ["Super Smash Bros. Ultimate", "Super Smash Bros. for Wii U", "Super Smash Bros. Brawl", "Super Smash Bros. Melee"]
    },

    // Racing Games
    {
        name: "Gran Turismo 7",
        image: "https://insertmoin.de/wp-content/uploads/2022/03/gran-turismo-7.png",
        options: ["Gran Turismo 7", "Gran Turismo Sport", "Forza Motorsport", "Project CARS 3"]
    },
    {
        name: "Forza Horizon 5",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1551360/capsule_616x353.jpg?t=1741106928",
        options: ["Forza Horizon 5", "Forza Horizon 4", "The Crew Motorfest", "Need for Speed Unbound"]
    },
    {
        name: "Mario Kart 8 Deluxe",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_MarioKart8Deluxe_image1600w.jpg",
        options: ["Mario Kart 8 Deluxe", "Mario Kart 8", "Mario Kart 7", "Mario Kart Wii"]
    },
    {
        name: "F1 23",
        image: "https://media.contentapi.ea.com/content/dam/ea/f1/f1-23/common/featured-image/f123-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg",
        options: ["F1 23", "F1 22", "F1 2021", "F1 2020"]
    },
    {
        name: "WRC Generations",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_WrcGenerationsTheFiaWrcOfficialGame_image1600w.jpg",
        options: ["WRC Generations", "WRC 10", "Dirt Rally 2.0", "Rally Simulator"]
    },

    // Sports Games
    {
        name: "FIFA 24",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2195250/f11315d7491f706b09b059d12424f711e9778b82/capsule_616x353.jpg?t=1743020121",
        options: ["FIFA 24", "FIFA 23", "eFootball 2024", "Football Manager 2024"]
    },
    {
        name: "NBA 2K24",
        image: "https://cdn.wccftech.com/wp-content/uploads/2023/09/WCCFnba2k242.jpg",
        options: ["NBA 2K24", "NBA 2K23", "NBA Live 19", "NBA 2K22"]
    },
    {
        name: "Madden NFL 24",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2140330/capsule_616x353.jpg?t=1730826602",
        options: ["Madden NFL 24", "Madden NFL 23", "NFL 2K5", "NFL Street"]
    },
    {
        name: "MLB The Show 24",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_MLBTheShow24_image1600w.jpg",
        options: ["MLB The Show 24", "MLB The Show 23", "MLB The Show 22", "MLB The Show 21"]
    },
    {
        name: "WWE 2K24",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2315690/capsule_616x353.jpg?t=1731609533",
        options: ["WWE 2K24", "WWE 2K23", "WWE 2K22", "WWE 2K20"]
    },

    // Strategy Games
    {
        name: "Civilization VI",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_SidMeiersCivilizationVI.jpg",
        options: ["Civilization VI", "Civilization V", "Age of Empires IV", "Total War: Warhammer III"]
    },
    {
        name: "Total War: Warhammer III",
        image: "https://store-images.s-microsoft.com/image/apps.27037.14262631053024293.1d44abbd-ea52-4439-a8e6-4e0afe1a1e5c.f0be82e7-4516-4f84-937d-7afc1862e7c0?q=90&w=480&h=270",
        options: ["Total War: Warhammer III", "Total War: Warhammer II", "Total War: Three Kingdoms", "Total War: Rome II"]
    },
    {
        name: "Age of Empires IV",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Offizielle_Concept_Art_von_Age_of_Empires_IV.png",
        options: ["Age of Empires IV", "Age of Empires III", "Age of Empires II", "Age of Empires"]
    },
    {
        name: "Crusader Kings III",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1158310/header.jpg?t=1745413201",
        options: ["Crusader Kings III", "Crusader Kings II", "Europa Universalis IV", "Hearts of Iron IV"]
    },
    {
        name: "Stellaris",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/281990/header.jpg?t=1744297340",
        options: ["Stellaris", "Endless Space 2", "Sins of a Solar Empire", "Galactic Civilizations IV"]
    },

    // Platformer
    {
        name: "Super Mario Bros. Wonder",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg",
        options: ["Super Mario Bros. Wonder", "Super Mario Odyssey", "Super Mario 3D World", "Super Mario Galaxy"]
    },
    {
        name: "Sonic Frontiers",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1237320/capsule_616x353.jpg?t=1741795892",
        options: ["Sonic Frontiers", "Sonic Forces", "Sonic Mania", "Sonic Generations"]
    },
    {
        name: "Crash Bandicoot 4",
        image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_CrashBandicoot4ItsAboutTime_image1600w.jpg",
        options: ["Crash Bandicoot 4", "Crash Bandicoot N. Sane Trilogy", "Spyro Reignited Trilogy", "Ratchet & Clank"]
    },
    {
        name: "Ratchet & Clank: Rift Apart",
        image: "https://backend.testingbuddies.de/uploads/Ratchet_and_Clank_Rift_Apart_6676c1b55b.png",
        options: ["Ratchet & Clank: Rift Apart", "Ratchet & Clank (2016)", "Ratchet & Clank: A Crack in Time", "Ratchet & Clank: Tools of Destruction"]
    },
    {
        name: "Hollow Knight",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdcVzU6WJ98bkU8prM5LOusS3QSk0cjYUvQ&s",
        options: ["Hollow Knight", "Ori and the Will of the Wisps", "Celeste", "Cuphead"]
    },

    // Horror Games
    {
        name: "Resident Evil 4 Remake",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/capsule_616x353.jpg?t=1736385712",
        options: ["Resident Evil 4 Remake", "Resident Evil 4", "Resident Evil 2 Remake", "Resident Evil 3 Remake"]
    },
    {
        name: "Dead Space Remake",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1693980/capsule_616x353.jpg?t=1702492799",
        options: ["Dead Space Remake", "Dead Space", "Dead Space 2", "Dead Space 3"]
    },
    {
        name: "Alan Wake 2",
        image: "https://cdn1.epicgames.com/offer/c4763f236d08423eb47b4c3008779c84/EGS_AlanWake2_RemedyEntertainment_S1_2560x1440-ec44404c0b41bc457cb94cd72cf85872",
        options: ["Alan Wake 2", "Alan Wake", "Control", "Quantum Break"]
    },
    {
        name: "The Callisto Protocol",
        image: "https://gagadget.com/media/uploads/the-callisto-protocol-1.jpg",
        options: ["The Callisto Protocol", "Dead Space", "Alien: Isolation", "The Evil Within"]
    },
    {
        name: "Layers of Fear",
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1946700/capsule_616x353.jpg?t=1732889537",
        options: ["Layers of Fear", "Layers of Fear 2", "Amnesia: The Dark Descent", "Outlast"]
    }
];

let currentQuestion = 0;
let score = 0;
let positiveXP = 0;
let negativeXP = 0;
let shuffledGames = [];
let usedGames = [];
let usedAnswers = [];

// Detaillierte Kategorisierung der Spiele
const gameCategories = {
    "The Legend of Zelda: Breath of the Wild": {
        series: "Zelda",
        genre: ["Action-Adventure", "Open World"],
        platform: ["Nintendo Switch"],
        similar: [
            "The Legend of Zelda: Tears of the Kingdom",
            "The Legend of Zelda: Skyward Sword HD",
            "The Legend of Zelda: Link's Awakening",
            "The Legend of Zelda: Ocarina of Time",
            "The Legend of Zelda: Majora's Mask"
        ]
    },
    "Minecraft": {
        series: "Minecraft",
        genre: ["Sandbox", "Survival"],
        platform: ["Multiplatform"],
        similar: [
            "Minecraft Legends",
            "Minecraft Dungeons",
            "Minecraft: Story Mode",
            "Minecraft Earth",
            "Minecraft: Education Edition"
        ]
    },
    "Grand Theft Auto V": {
        series: "GTA",
        genre: ["Open World", "Action"],
        platform: ["Multiplatform"],
        similar: [
            "Grand Theft Auto IV",
            "Grand Theft Auto: San Andreas",
            "Grand Theft Auto: Vice City",
            "Grand Theft Auto III",
            "Grand Theft Auto: Liberty City Stories"
        ]
    },
    "The Witcher 3: Wild Hunt": {
        series: "The Witcher",
        genre: ["RPG", "Open World"],
        platform: ["Multiplatform"],
        similar: [
            "The Witcher 2: Assassins of Kings",
            "The Witcher: Enhanced Edition",
            "The Witcher 3: Wild Hunt - Blood and Wine",
            "The Witcher 3: Wild Hunt - Hearts of Stone",
            "The Witcher: Monster Slayer"
        ]
    },
    "Red Dead Redemption 2": {
        series: "Red Dead",
        genre: ["Open World", "Western"],
        platform: ["Multiplatform"],
        similar: [
            "Red Dead Redemption",
            "Red Dead Revolver",
            "Red Dead Redemption: Undead Nightmare",
            "Red Dead Online",
            "Red Dead Redemption 2: Story Mode"
        ]
    },
    "God of War": {
        series: "God of War",
        genre: ["Action", "Adventure"],
        platform: ["PlayStation"],
        similar: [
            "God of War Ragnarök",
            "God of War III",
            "God of War II",
            "God of War: Chains of Olympus",
            "God of War: Ghost of Sparta"
        ]
    },
    "FIFA 23": {
        series: "FIFA",
        genre: ["Sport", "Football"],
        platform: ["Multiplatform"],
        similar: [
            "FIFA 22",
            "FIFA 21",
            "FIFA 20",
            "FIFA 19",
            "FIFA 18"
        ]
    },
    "Call of Duty: Warzone": {
        series: "Call of Duty",
        genre: ["Shooter", "Battle Royale"],
        platform: ["Multiplatform"],
        similar: [
            "Call of Duty: Modern Warfare",
            "Call of Duty: Black Ops Cold War",
            "Call of Duty: Vanguard",
            "Call of Duty: Warzone 2.0",
            "Call of Duty: Modern Warfare II"
        ]
    },
    "Elden Ring": {
        series: "Souls",
        genre: ["Action RPG", "Open World"],
        platform: ["Multiplatform"],
        similar: [
            "Dark Souls III",
            "Dark Souls II",
            "Dark Souls",
            "Demon's Souls",
            "Bloodborne"
        ]
    },
    "Cyberpunk 2077": {
        series: "Cyberpunk",
        genre: ["RPG", "Open World"],
        platform: ["Multiplatform"],
        similar: [
            "Cyberpunk 2077: Phantom Liberty",
            "Cyberpunk 2077: Edgerunners",
            "Cyberpunk 2077: Ultimate Edition",
            "Cyberpunk 2077: Complete Edition",
            "Cyberpunk 2077: Next-Gen Update"
        ]
    }
};

// Liste von falschen Antwortmöglichkeiten
const fakeGames = [
    "The Elder Scrolls VI: Skyrim 2",
    "Half-Life 3: Episode 3",
    "Portal 3: Companion Collection",
    "GTA 6: Vice City Stories",
    "The Last of Us Part III: Remastered",
    "God of War: Ragnarök 2",
    "Red Dead Redemption 3: Undead Nightmare 2",
    "Cyberpunk 2078: Phantom Liberty 2",
    "Elden Ring 2: Shadow of the Erdtree",
    "Baldur's Gate 4: Enhanced Edition",
    "The Witcher 4: Wild Hunt 2",
    "Mass Effect 5: Legendary Edition",
    "Dragon Age 4: Inquisition 2",
    "Starfield 2: New Game Plus",
    "Fallout 5: New Vegas 2",
    "Assassin's Creed: Odyssey 2",
    "Horizon Forbidden West 2: Complete Edition",
    "Spider-Man 3: Miles Morales 2",
    "Final Fantasy XVI-2: Rebirth",
    "Resident Evil 9: Village 2"
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getSimilarGames(game, count) {
    const gameInfo = gameCategories[game.name] || {
        series: "Unknown",
        genre: ["Action", "Adventure"],
        platform: ["Multiplatform"],
        similar: []
    };
    
    // Verwende die vordefinierten ähnlichen Spiele
    let similarGames = gameInfo.similar
        .filter(similarName => {
            // Prüfe, ob das ähnliche Spiel in unserer Spieleliste existiert
            const exists = games.some(g => g.name === similarName);
            return exists && !usedGames.includes(similarName);
        })
        .map(similarName => games.find(g => g.name === similarName));

    // Wenn nicht genug ähnliche Spiele gefunden wurden, füge Spiele aus der gleichen Serie hinzu
    if (similarGames.length < count) {
        const sameSeriesGames = games.filter(g => {
            if (g.name === game.name) return false;
            if (usedGames.includes(g.name)) return false;
            if (similarGames.includes(g)) return false;
            const otherGameInfo = gameCategories[g.name];
            return otherGameInfo && otherGameInfo.series === gameInfo.series;
        });
        similarGames = [...similarGames, ...sameSeriesGames];
    }

    // Wenn immer noch nicht genug, füge Spiele mit ähnlichen Genres hinzu
    if (similarGames.length < count) {
        const similarGenreGames = games.filter(g => {
            if (g.name === game.name) return false;
            if (usedGames.includes(g.name)) return false;
            if (similarGames.includes(g)) return false;
            const otherGameInfo = gameCategories[g.name];
            return otherGameInfo && otherGameInfo.genre.some(genre => gameInfo.genre.includes(genre));
        });
        similarGames = [...similarGames, ...similarGenreGames];
    }

    // Wenn immer noch nicht genug, füge unbenutzte zufällige Spiele hinzu
    if (similarGames.length < count) {
        const unusedGames = games.filter(g => 
            g.name !== game.name && 
            !similarGames.includes(g) && 
            !usedGames.includes(g.name)
        );
        while (similarGames.length < count && unusedGames.length > 0) {
            const randomIndex = Math.floor(Math.random() * unusedGames.length);
            similarGames.push(unusedGames[randomIndex]);
            unusedGames.splice(randomIndex, 1);
        }
    }

    // Markiere nur das aktuelle Spiel als verwendet
    usedGames.push(game.name);
    
    // Mische die ähnlichen Spiele und wähle die gewünschte Anzahl
    return shuffle(similarGames).slice(0, count);
}

// Globale Variable für den Blur-Status
let isBlurred = true;

function ensureBlur() {
    const gameImage = document.getElementById('game-image');
    const blurOverlay = document.querySelector('.blur-overlay');
    gameImage.style.filter = 'blur(20px)';
    blurOverlay.style.opacity = '1';
    isBlurred = true;
}

function removeBlur() {
    const gameImage = document.getElementById('game-image');
    const blurOverlay = document.querySelector('.blur-overlay');
    gameImage.style.filter = 'none';
    blurOverlay.style.opacity = '0';
    isBlurred = false;
}

function showQuestion() {
    document.getElementById('result').style.display = 'none';
    const game = shuffledGames[currentQuestion];
    
    // Aktualisiere die Fortschrittsanzeige
    document.getElementById('current-game').textContent = currentQuestion + 1;
    document.getElementById('total-games').textContent = shuffledGames.length;
    
    // Überprüfe, ob das Spiel bereits verwendet wurde
    if (usedGames.includes(game.name)) {
        // Wenn ja, suche das nächste unbenutzte Spiel
        const nextUnusedGame = shuffledGames.find(g => !usedGames.includes(g.name));
        if (nextUnusedGame) {
            shuffledGames[currentQuestion] = nextUnusedGame;
            game = nextUnusedGame;
        }
    }
    
    const gameImage = document.getElementById('game-image');
    const blurOverlay = document.querySelector('.blur-overlay');
    
    // Reset des Bildes und Blur aktivieren
    gameImage.style.display = 'none';
    gameImage.src = '';
    ensureBlur();
    
    // Erstelle ein temporäres Bild zum Vorladen
    const tempImage = new Image();
    tempImage.onload = () => {
        // Erst wenn das Bild geladen ist, zeigen wir es an
        gameImage.src = game.image;
        gameImage.style.display = 'block';
        // Stelle sicher, dass der Blur-Effekt aktiv bleibt
        ensureBlur();
    };
    tempImage.src = game.image;
    
    document.getElementById('question').textContent = `Wie heißt dieses Spiel?`;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    
    // Verwende die vordefinierten Optionen für das aktuelle Spiel
    const options = game.options;
    shuffle(options);
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        answersDiv.appendChild(btn);
    });
    
    // Button deaktivieren
    document.getElementById('next-btn').disabled = true;
    
    // Füge das aktuelle Spiel zur Liste der verwendeten Spiele hinzu
    usedGames.push(game.name);
}

function checkAnswer(selected) {
    const game = shuffledGames[currentQuestion];
    const answersDiv = document.getElementById('answers');
    const positiveXPDisplay = document.querySelector('.xp-positive span');
    const negativeXPDisplay = document.querySelector('.xp-negative span');
    
    // Bild entblurren
    removeBlur();

    if (selected === game.name) {
        score++;
        positiveXP += 1000;
        showXPChange('+1K');
    } else {
        negativeXP += 2500;
        showXPChange('-2.5K');
    }
    
    positiveXPDisplay.textContent = Math.floor(positiveXP / 1000);
    negativeXPDisplay.textContent = (negativeXP / 1000).toFixed(1);
    
    Array.from(answersDiv.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === game.name) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected) {
            btn.classList.add('wrong');
        }
    });
    
    // Button aktivieren
    document.getElementById('next-btn').disabled = false;
}

document.getElementById('next-btn').onclick = () => {
    // Blur-Effekte sofort aktivieren
    ensureBlur();
    
    // Zusätzliche Sicherheitsmaßnahme: Blur nach kurzer Verzögerung erneut prüfen
    setTimeout(ensureBlur, 50);
    
    // Verzögerung hinzufügen, um sicherzustellen, dass der Blur-Effekt aktiv ist
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < shuffledGames.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 100);
};

// Event-Listener für Bildladefehler
document.getElementById('game-image').onerror = function() {
    ensureBlur();
};

// Event-Listener für Bildänderungen
const gameImage = document.getElementById('game-image');
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
            ensureBlur();
        }
    });
});

observer.observe(gameImage, {
    attributes: true,
    attributeFilter: ['src']
});

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    const accuracy = ((score / shuffledGames.length) * 100).toFixed(1);
    
    resultDiv.innerHTML = `
        <h2>Quiz beendet!</h2>
        <div class="final-stats">
            <p>Richtige Antworten: <span class="highlight">${score} von ${shuffledGames.length}</span></p>
            <p>Genauigkeit: <span class="highlight">${accuracy}%</span></p>
            <p>Gesammelte XP: <span class="highlight">+${positiveXP}</span></p>
            <p>Verlorene XP: <span class="warning">-${negativeXP}</span></p>
        </div>
    `;
}

function restartQuiz() {
    score = 0;
    positiveXP = 0;
    negativeXP = 0;
    currentQuestion = 0;
    usedGames = [];
    usedAnswers = []; // Reset der verwendeten Antworten
    document.querySelector('.xp-positive span').textContent = '0';
    document.querySelector('.xp-negative span').textContent = '0';
    shuffledGames = shuffle([...games]);
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    showQuestion();
}

function showXPChange(text) {
    const xpChange = document.createElement('div');
    xpChange.className = `xp-change ${text.startsWith('+') ? 'positive' : 'negative'}`;
    xpChange.textContent = text;
    document.body.appendChild(xpChange);
    
    setTimeout(() => xpChange.remove(), 1500);
}

// Initialisierung
window.onload = () => {
    shuffledGames = shuffle([...games]);
    showQuestion();
};

