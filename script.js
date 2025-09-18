(function () {
const form = document.getElementById('anime-form');
const input = document.getElementById('anime-input');
const listSelect = document.getElementById('anime-list-select');
const message = document.getElementById('message');
const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = {
  plan: document.getElementById('tab-plan'),
  watched: document.getElementById('tab-watched'),
  waiting: document.getElementById('tab-waiting')
};
const grids = {
  plan: document.getElementById('grid-plan'),
  watched: document.getElementById('grid-watched'),
  waiting: document.getElementById('grid-waiting')
};
const themeToggle = document.getElementById('theme-toggle');

// Stats elements
const totalCount = document.getElementById('total-count');
const watchedCount = document.getElementById('watched-count');
const planCount = document.getElementById('plan-count');
const waitingCount = document.getElementById('waiting-count');

// Obfuscated password - not easily readable in source code
// To change password: replace 'admin123' with your desired password
// The password is base64 encoded and reversed to make it harder to read
const ADMIN_PASSWORD = btoa('9966').split('').reverse().join('');

// Modal elements
const editModal = document.getElementById('edit-modal');
const modalCoverImg = document.getElementById('modal-cover-img');
const modalTitleInput = document.getElementById('modal-title-input');
const modalLinkInput = document.getElementById('modal-link-input');
const modalClose = document.querySelector('.modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalSave = document.getElementById('modal-save');

// Admin elements
const adminToggle = document.getElementById('admin-toggle');
const adminModal = document.getElementById('admin-modal');
const adminClose = document.querySelector('[data-close-admin]');
const adminEmail = document.getElementById('admin-email');
const adminPassword = document.getElementById('admin-password');
const adminCancel = document.getElementById('admin-cancel');
const adminLogin = document.getElementById('admin-login');

const API_BASE = 'https://api.jikan.moe/v4';
const ANILIST_API = 'https://graphql.anilist.co';
const ANISEARCH_API = 'https://api.anisearch.com';

// Firebase configuration
let firebase = null;
let isFirebaseReady = false;

// Wait for Firebase to be loaded
function waitForFirebase() {
  return new Promise((resolve) => {
    if (window.firebase) {
      firebase = window.firebase;
      isFirebaseReady = true;
      resolve();
    } else {
      setTimeout(() => waitForFirebase().then(resolve), 100);
    }
  });
}

// Firebase Firestore functions
async function saveAnimeToFirebase(anime, listKey) {
  if (!isFirebaseReady) return;
  
  try {
    const animeRef = firebase.doc(firebase.db, 'animes', `${anime.id}_${listKey}`);
    await firebase.setDoc(animeRef, {
      ...anime,
      listKey,
      timestamp: new Date().toISOString(),
      addedBy: firebase.auth.currentUser?.uid || 'anonymous'
    });
  } catch (error) {
    console.error('Fehler beim Speichern in Firebase:', error);
  }
}

async function deleteAnimeFromFirebase(animeId, listKey) {
  if (!isFirebaseReady) return;
  
  try {
    const animeRef = firebase.doc(firebase.db, 'animes', `${animeId}_${listKey}`);
    await firebase.deleteDoc(animeRef);
  } catch (error) {
    console.error('Fehler beim Löschen aus Firebase:', error);
  }
}

async function loadAnimesFromFirebase() {
  if (!isFirebaseReady) return;
  
  try {
    const animesRef = firebase.collection(firebase.db, 'animes');
    const q = firebase.query(animesRef, firebase.orderBy('timestamp', 'desc'));
    const querySnapshot = await firebase.getDocs(q);
    
    // Clear existing data
    ['plan', 'watched', 'waiting'].forEach(key => {
      grids[key].innerHTML = '';
    });
    
    // Group animes by list
    const animesByList = { plan: [], watched: [], waiting: [] };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (animesByList[data.listKey]) {
        animesByList[data.listKey].push(data);
      }
    });
    
    // Add animes to their respective lists
    ['plan', 'watched', 'waiting'].forEach(key => {
      const sortedAnimes = animesByList[key].sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      sortedAnimes.forEach(anime => {
        addAnimeToList(anime, key, false); // false = don't save to Firebase again
      });
    });
    
    updateStats();
  } catch (error) {
    console.error('Fehler beim Laden aus Firebase:', error);
    // Fallback to localStorage
    loadAll();
  }
}

// Setup real-time listener
function setupRealtimeListener() {
  if (!isFirebaseReady) return;
  
  const animesRef = firebase.collection(firebase.db, 'animes');
  const q = firebase.query(animesRef, firebase.orderBy('timestamp', 'desc'));
  
  firebase.onSnapshot(q, (querySnapshot) => {
    // Only update if we have data from Firebase
    if (querySnapshot.empty) {
      console.log('Keine Daten in Firebase gefunden');
      return;
    }
    
    // Clear existing data
    ['plan', 'watched', 'waiting'].forEach(key => {
      grids[key].innerHTML = '';
    });
    
    // Group animes by list
    const animesByList = { plan: [], watched: [], waiting: [] };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (animesByList[data.listKey]) {
        animesByList[data.listKey].push(data);
      }
    });
    
    // Add animes to their respective lists
    ['plan', 'watched', 'waiting'].forEach(key => {
      const sortedAnimes = animesByList[key].sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      sortedAnimes.forEach(anime => {
        addAnimeToList(anime, key, false); // false = don't save to Firebase again
      });
    });
    
    updateStats();
  }, (error) => {
    console.error('Fehler bei Echtzeit-Updates:', error);
  });
}

// Migration function to move data from localStorage to Firebase
async function migrateToFirebase() {
  if (!isFirebaseReady) return;
  
  try {
    const raw = localStorage.getItem('animes-app');
    if (!raw) return;
    
    const data = JSON.parse(raw);
    const migrationKey = 'animes-migrated-to-firebase';
    
    // Check if already migrated
    if (localStorage.getItem(migrationKey)) {
      console.log('Daten bereits migriert');
      return;
    }
    
    // Check if Firebase already has data
    const animesRef = firebase.collection(firebase.db, 'animes');
    const snapshot = await firebase.getDocs(animesRef);
    if (!snapshot.empty) {
      console.log('Firebase hat bereits Daten, überspringe Migration');
      localStorage.setItem(migrationKey, 'true');
      return;
    }
    
    setMessage('Migriere Daten zu Firebase...', 'info');
    console.log('Starte Migration mit Daten:', data);
    
    // Migrate each list
    let migratedCount = 0;
    for (const [listKey, animes] of Object.entries(data)) {
      if (Array.isArray(animes) && animes.length > 0) {
        console.log(`Migriere ${animes.length} Animes für Liste: ${listKey}`);
        for (const anime of animes) {
          try {
            await saveAnimeToFirebase(anime, listKey);
            migratedCount++;
          } catch (error) {
            console.error('Fehler beim Migrieren eines Animes:', error, anime);
          }
        }
      }
    }
    
    // Mark as migrated
    localStorage.setItem(migrationKey, 'true');
    setMessage(`Migration abgeschlossen! ${migratedCount} Animes migriert.`, 'success');
    console.log(`Migration abgeschlossen: ${migratedCount} Animes migriert`);
    
    // Clear localStorage data after successful migration
    setTimeout(() => {
      localStorage.removeItem('animes-app');
      console.log('localStorage-Daten gelöscht');
    }, 3000);
    
  } catch (error) {
    console.error('Migration-Fehler:', error);
    setMessage('Migration fehlgeschlagen. Verwende lokale Daten.', 'error');
  }
}

function setMessage(text, type = 'info') {
  message.textContent = text;
  message.className = type;
  if (!text) message.removeAttribute('class');
}

function setAdminUI(isAdmin) {
  document.body.classList.toggle('is-admin', isAdmin);
  if (adminToggle) adminToggle.textContent = isAdmin ? '✅ Admin' : '🔒 Admin';
  
  // Update all link buttons based on admin status
  const linkButtons = document.querySelectorAll('.btn.link');
  linkButtons.forEach(link => {
    if (isAdmin) {
      link.textContent = '🔗';
    } else {
      link.innerHTML = '🔗 ZUM ANIME';
    }
  });
}

// Firebase Auth State Listener
function setupAuthStateListener() {
  if (!isFirebaseReady) return;
  
  firebase.onAuthStateChanged(firebase.auth, (user) => {
    if (user) {
      // User is signed in
      localStorage.setItem('animes-is-admin', 'true');
      setAdminUI(true);
    } else {
      // User is signed out
      localStorage.removeItem('animes-is-admin');
      setAdminUI(false);
    }
  });
}

function openAdminModal() {
  adminModal.style.display = 'flex';
  adminPassword.value = '';
  setTimeout(() => adminPassword.focus(), 0);
}

function closeAdminModal() {
  adminModal.style.display = 'none';
  adminPassword.value = '';
}

async function loginAdmin() {
  const email = adminEmail.value.trim();
  const password = adminPassword.value.trim();
  
  if (!email || !password) {
    setMessage('Bitte E-Mail und Passwort eingeben.', 'error');
    return;
  }
  
  if (!isFirebaseReady) {
    setMessage('Firebase wird noch geladen...', 'error');
    return;
  }
  
  try {
    setMessage('Anmeldung läuft...', 'info');
    await firebase.signInWithEmailAndPassword(firebase.auth, email, password);
    setMessage('Erfolgreich angemeldet!', 'success');
    closeAdminModal();
  } catch (error) {
    console.error('Login-Fehler:', error);
    let errorMessage = 'Anmeldung fehlgeschlagen.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Benutzer nicht gefunden.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Falsches Passwort.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Ungültige E-Mail-Adresse.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Zu viele Versuche. Bitte später erneut versuchen.';
        break;
    }
    
    setMessage(errorMessage, 'error');
  }
}

async function logoutAdmin() {
  if (isFirebaseReady && firebase.auth.currentUser) {
    try {
      await firebase.signOut(firebase.auth);
    } catch (error) {
      console.error('Logout-Fehler:', error);
    }
  }
  localStorage.removeItem('animes-is-admin');
  setAdminUI(false);
  setMessage('Admin abgemeldet.', 'success');
}

function toggleAdmin() {
  const isAdmin = localStorage.getItem('animes-is-admin') === 'true';
  if (isAdmin) logoutAdmin(); else openAdminModal();
}

function switchTab(key) {
  tabs.forEach(btn => {
    const active = btn.dataset.tab === key;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  Object.entries(panels).forEach(([k, panel]) => {
    const active = k === key;
    panel.classList.toggle('active', active);
    
    // Reset animations for cards in the active panel
    if (active) {
      const cards = panel.querySelectorAll('.card');
      cards.forEach((card, index) => {
        // Remove existing animation classes
        card.style.animation = 'none';
        // Force reflow
        card.offsetHeight;
        // Re-add animation with proper delay
        card.style.animation = `cardSlideIn 0.6s ease-out ${index * 0.1}s both`;
      });
    }
  });
}

tabs.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function normalizeTitle(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[`''""\-_:.,!()\[\]{}]/g, ' ')
    .replace(/[^\w\s]/g, ' ') // Remove any remaining special chars
    .replace(/\s+/g, ' ')
    .trim();
}

function getBestImageUrl(anime) {
  const images = anime.images;
  if (!images) return '';
  if (images.webp?.large_image_url) return images.webp.large_image_url;
  if (images.webp?.image_url) return images.webp.image_url;
  if (images.jpg?.large_image_url) return images.jpg.large_image_url;
  if (images.jpg?.image_url) return images.jpg.image_url;
  return '';
}

function pickBestAnime(results, query) {
  const qNorm = normalizeTitle(query);
  let best = null;
  let bestScore = -1;
  
  for (const item of results) {
    const titles = new Set();
    if (item.title) titles.add(item.title);
    if (item.title_english) titles.add(item.title_english);
    if (item.title_japanese) titles.add(item.title_japanese);
    if (item.title_romaji) titles.add(item.title_romaji);
    if (Array.isArray(item.titles)) {
      for (const t of item.titles) if (t?.title) titles.add(t.title);
    }
    if (Array.isArray(item.synonyms)) {
      for (const s of item.synonyms) if (s) titles.add(s);
    }
    
    const normalized = Array.from(titles).map(normalizeTitle);
    let score = 0;
    
    // Exact match gets highest priority
    if (normalized.some(t => t === qNorm)) {
      return item;
    }
    
    // Check for partial matches with different scoring
    for (const normTitle of normalized) {
      if (normTitle.startsWith(qNorm)) {
        score = Math.max(score, 1000 + (item.members || 0));
      } else if (qNorm.startsWith(normTitle)) {
        score = Math.max(score, 900 + (item.members || 0));
      } else if (normTitle.includes(qNorm)) {
        score = Math.max(score, 500 + (item.members || 0));
      } else if (qNorm.includes(normTitle)) {
        score = Math.max(score, 400 + (item.members || 0));
      } else {
        // Enhanced word-by-word matching for long titles
        const queryWords = qNorm.split(' ').filter(w => w.length > 2);
        const titleWords = normTitle.split(' ').filter(w => w.length > 2);
        
        if (queryWords.length > 0 && titleWords.length > 0) {
          const matchingWords = queryWords.filter(qw => 
            titleWords.some(tw => tw.includes(qw) || qw.includes(tw))
          );
          
          if (matchingWords.length > 0) {
            // Better scoring for word matches
            const wordRatio = matchingWords.length / queryWords.length;
            const titleRatio = matchingWords.length / titleWords.length;
            const combinedRatio = (wordRatio + titleRatio) / 2;
            
            // Higher score for better matches
            const wordScore = combinedRatio * 400;
            score = Math.max(score, wordScore + (item.members || 0));
          }
          
          // Bonus for matching significant words (longer than 4 chars)
          const significantQueryWords = queryWords.filter(w => w.length > 4);
          const significantTitleWords = titleWords.filter(w => w.length > 4);
          const significantMatches = significantQueryWords.filter(qw => 
            significantTitleWords.some(tw => tw.includes(qw) || qw.includes(tw))
          );
          
          if (significantMatches.length > 0) {
            const significantScore = (significantMatches.length / significantQueryWords.length) * 200;
            score = Math.max(score, score + significantScore);
          }
        }
      }
    }
    
    // Fallback to popularity
    if (score === 0) {
      score = (item.members || 0) * 0.1;
    }
    
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  
  return best;
}

async function safeFetchJson(url) {
  const res = await fetch(url);
  if (res.status === 429) {
    await new Promise(r => setTimeout(r, 600));
    const res2 = await fetch(url);
    if (!res2.ok) throw new Error('API Fehler (Rate Limit)');
    return res2.json();
  }
  if (!res.ok) throw new Error('API Fehler');
  return res.json();
}

async function searchAniList(query) {
  const graphqlQuery = `
    query ($search: String) {
      Page(page: 1, perPage: 30) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          synonyms
          coverImage {
            large
            medium
          }
          siteUrl
          popularity
          averageScore
        }
      }
    }
  `;

  try {
    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { search: query }
      })
    });

    if (!response.ok) throw new Error('AniList API Fehler');
    const data = await response.json();
    
    if (data.data && data.data.Page && data.data.Page.media) {
      return data.data.Page.media.map(item => ({
        id: item.id,
        title: item.title.english || item.title.romaji || item.title.native,
        title_english: item.title.english,
        title_japanese: item.title.native,
        title_romaji: item.title.romaji,
        synonyms: item.synonyms || [],
        images: {
          jpg: {
            large_image_url: item.coverImage?.large,
            image_url: item.coverImage?.medium
          }
        },
        url: item.siteUrl,
        members: item.popularity,
        score: item.averageScore
      }));
    }
    return [];
  } catch (err) {
    console.warn('AniList API Fehler:', err);
    return [];
  }
}

async function searchAniSearch(query) {
  try {
    const response = await fetch(`${ANISEARCH_API}/anime?q=${encodeURIComponent(query)}&limit=20`);
    if (!response.ok) throw new Error('AniSearch API Fehler');
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
      return data.map(item => ({
        id: item.id || item.mal_id,
        title: item.title?.en || item.title?.de || item.title?.ja || item.title?.romaji || item.title,
        title_english: item.title?.en,
        title_japanese: item.title?.ja,
        title_romaji: item.title?.romaji,
        synonyms: item.synonyms || [],
        images: {
          jpg: {
            large_image_url: item.cover?.large || item.cover?.original,
            image_url: item.cover?.medium || item.cover?.small
          }
        },
        url: item.url || `https://www.anisearch.com/anime/${item.id}`,
        members: item.popularity || item.members,
        score: item.score
      }));
    }
    return [];
  } catch (err) {
    console.warn('AniSearch API Fehler:', err);
    return [];
  }
}

async function fetchAnimeByTitle(title) {
  const originalTitle = title.trim();
  
  // For very long titles, try shorter versions
  const titleWords = originalTitle.split(' ');
  const shortVersions = [];
  
  if (titleWords.length > 4) {
    // Try first 3-4 words
    shortVersions.push(titleWords.slice(0, 3).join(' '));
    shortVersions.push(titleWords.slice(0, 4).join(' '));
    // Try key words (longer than 3 chars)
    const keyWords = titleWords.filter(w => w.length > 3);
    if (keyWords.length > 0) {
      shortVersions.push(keyWords.slice(0, 2).join(' '));
      shortVersions.push(keyWords.slice(0, 3).join(' '));
    }
  }
  
  // Try individual significant words
  const significantWords = titleWords.filter(w => w.length > 4);
  shortVersions.push(...significantWords);
  
  // Try combinations of significant words
  if (significantWords.length >= 2) {
    shortVersions.push(significantWords.slice(0, 2).join(' '));
  }
  if (significantWords.length >= 3) {
    shortVersions.push(significantWords.slice(0, 3).join(' '));
  }
  
  // Special handling for known problematic titles
  if (originalTitle.toLowerCase().includes('parry everything')) {
    shortVersions.push('I Parry Everything');
    shortVersions.push('Parry Everything');
    shortVersions.push('Ore wa Subete wo Parry Suru');
  }
  
  // Try multiple search strategies
  const searchQueries = [
    originalTitle,
    originalTitle.replace(/[^\w\s]/g, ''), // Remove special chars
    originalTitle.replace(/\s+/g, ' '), // Normalize spaces
    ...shortVersions
  ];
  
  // Add common title variations
  const variations = [
    originalTitle,
    originalTitle.toLowerCase(),
    originalTitle.toUpperCase(),
    originalTitle.replace(/[^\w\s]/g, ' ').trim(),
  ];
  
  // Remove duplicates and empty strings
  const uniqueQueries = [...new Set([...searchQueries, ...variations])].filter(q => q.trim());
  
  // Try AniList first (often better for English titles)
  for (const query of uniqueQueries.slice(0, 3)) { // Try first 3 queries on AniList
    if (!query.trim()) continue;
    
    try {
      const anilistResults = await searchAniList(query);
      if (anilistResults.length > 0) {
        const chosen = pickBestAnime(anilistResults, originalTitle);
        if (chosen) {
          const matchQuality = calculateMatchQuality(chosen, originalTitle);
          if (matchQuality > 0.2) {
            return {
              id: chosen.id,
              title: chosen.title || chosen.title_english || originalTitle,
              image: getBestImageUrl(chosen),
              url: chosen.url
            };
          }
        }
      }
    } catch (err) {
      // Continue to other APIs
      continue;
    }
  }
  
  // Try AniSearch (good for German/European titles)
  for (const query of uniqueQueries.slice(0, 3)) { // Try first 3 queries on AniSearch
    if (!query.trim()) continue;
    
    try {
      const anisearchResults = await searchAniSearch(query);
      if (anisearchResults.length > 0) {
        const chosen = pickBestAnime(anisearchResults, originalTitle);
        if (chosen) {
          const matchQuality = calculateMatchQuality(chosen, originalTitle);
          if (matchQuality > 0.2) {
            return {
              id: chosen.id,
              title: chosen.title || chosen.title_english || originalTitle,
              image: getBestImageUrl(chosen),
              url: chosen.url
            };
          }
        }
      }
    } catch (err) {
      // Continue to MyAnimeList
      continue;
    }
  }
  
  // Fallback to MyAnimeList
  for (const query of uniqueQueries) {
    if (!query.trim()) continue;
    
    const q = encodeURIComponent(query);
    
    // Try different search strategies with more results
    const searchStrategies = [
      `${API_BASE}/anime?q=${q}&limit=50&order_by=members&sort=desc&sfw=true`,
      `${API_BASE}/anime?q=${q}&limit=50&order_by=score&sort=desc&sfw=true`,
      `${API_BASE}/anime?q=${q}&limit=50&order_by=popularity&sort=desc&sfw=true`,
      `${API_BASE}/anime?q=${q}&limit=100&sfw=true` // No ordering for broader results
    ];
    
    for (const url of searchStrategies) {
      try {
        const data = await safeFetchJson(url);
        if (data && data.data && data.data.length > 0) {
          const chosen = pickBestAnime(data.data, originalTitle);
          if (chosen) {
            // Double-check: if the match is very poor, don't return it
            const matchQuality = calculateMatchQuality(chosen, originalTitle);
            if (matchQuality > 0.2) { // Lowered threshold for better results
              return {
                id: chosen.mal_id,
                title: chosen.title || chosen.title_english || originalTitle,
                image: getBestImageUrl(chosen),
                url: chosen.url
              };
            }
          }
        }
      } catch (err) {
        // Continue to next strategy
        continue;
      }
    }
  }
  
  return null;
}

function calculateMatchQuality(anime, query) {
  const titles = new Set();
  if (anime.title) titles.add(anime.title);
  if (anime.title_english) titles.add(anime.title_english);
  if (anime.title_japanese) titles.add(anime.title_japanese);
  if (Array.isArray(anime.titles)) {
    for (const t of anime.titles) if (t?.title) titles.add(t.title);
  }
  
  const qNorm = normalizeTitle(query);
  let bestMatch = 0;
  
  for (const title of titles) {
    const tNorm = normalizeTitle(title);
    
    // Exact match
    if (tNorm === qNorm) return 1.0;
    
    // Calculate similarity
    const queryWords = qNorm.split(' ').filter(w => w.length > 2);
    const titleWords = tNorm.split(' ').filter(w => w.length > 2);
    
    if (queryWords.length === 0 || titleWords.length === 0) continue;
    
    const matchingWords = queryWords.filter(qw => 
      titleWords.some(tw => tw.includes(qw) || qw.includes(tw))
    );
    
    const similarity = matchingWords.length / Math.max(queryWords.length, titleWords.length);
    bestMatch = Math.max(bestMatch, similarity);
  }
  
  return bestMatch;
}

function createCard(anime, listKey) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = String(anime.id || '0');
  card.dataset.list = listKey;

  const coverWrap = document.createElement('div');
  coverWrap.className = 'cover-wrap';

  const img = document.createElement('img');
  img.className = 'cover';
  img.alt = anime.title;
  img.loading = 'lazy';
  img.src = anime.image || '';

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'cover-edit';
  editBtn.title = 'Titel bearbeiten';
  editBtn.textContent = '✏️';
  editBtn.addEventListener('click', () => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können bearbeiten.', 'error');
      return;
    }
    const titleEl = card.querySelector('.title');
    const currentTitle = titleEl?.textContent || '';
    const coverSrc = img.src || '';
    const linkEl = card.querySelector('a');
    const currentLink = linkEl?.href || '';
    
    modalCoverImg.src = coverSrc;
    modalCoverImg.alt = currentTitle;
    modalTitleInput.value = currentTitle;
    modalLinkInput.value = currentLink;
    editModal.style.display = 'flex';
    modalTitleInput.focus();
    modalTitleInput.select();
    editModal.dataset.cardId = card.dataset.id;
  });

  coverWrap.appendChild(img);
  coverWrap.appendChild(editBtn);

  const titleEl = document.createElement('h3');
  titleEl.className = 'title';
  titleEl.textContent = anime.title;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const link = document.createElement('a');
  link.href = anime.url || '#';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.className = 'btn link';
  link.title = 'Details anzeigen';
  
  // Add text for non-admin users
  const isAdmin = localStorage.getItem('animes-is-admin') === 'true';
  if (isAdmin) {
    link.textContent = '🔗';
  } else {
    link.innerHTML = '🔗 ZUM ANIME';
  }

  const moveBtn = document.createElement('button');
  moveBtn.type = 'button';
  moveBtn.className = 'btn secondary';
  moveBtn.textContent = listKey === 'plan' ? '✅' : listKey === 'watched' ? '⏳' : '📋';
  moveBtn.title = listKey === 'plan' ? 'Als gesehen markieren' : listKey === 'watched' ? 'Warten auf Fortsetzung' : 'Zur Liste hinzufügen';
  moveBtn.addEventListener('click', () => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können verschieben.', 'error');
      return;
    }
    const current = card.dataset.list;
    let target;
    if (current === 'plan') target = 'watched';
    else if (current === 'watched') target = 'waiting';
    else target = 'plan';
    moveCard(card, target);
    moveBtn.textContent = target === 'plan' ? '✅' : target === 'watched' ? '⏳' : '📋';
    moveBtn.title = target === 'plan' ? 'Als gesehen markieren' : target === 'watched' ? 'Warten auf Fortsetzung' : 'Zur Liste hinzufügen';
  });

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn danger';
  delBtn.textContent = '🗑️';
  delBtn.title = 'Löschen';
  delBtn.addEventListener('click', () => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können löschen.', 'error');
      return;
    }
    deleteCard(card);
  });

  actions.appendChild(link);
  actions.appendChild(moveBtn);
  actions.appendChild(delBtn);

  card.appendChild(coverWrap);
  card.appendChild(titleEl);
  card.appendChild(actions);

  return card;
}

function addAnimeToList(anime, listKey, saveToFirebase = true) {
  const card = createCard(anime, listKey);
  
  // Insert card in alphabetical order
  insertCardAlphabetically(card, listKey);
  
  // Re-animate all cards
  const allCards = grids[listKey].querySelectorAll('.card');
  allCards.forEach((card, index) => {
    card.style.animation = `cardSlideIn 0.6s ease-out ${index * 0.1}s both`;
  });
  
  // Save to Firebase if requested
  if (saveToFirebase && isFirebaseReady) {
    saveAnimeToFirebase(anime, listKey);
  }
  
  updateStats();
}

function insertCardAlphabetically(card, listKey) {
  const title = card.querySelector('.title')?.textContent || '';
  const existingCards = Array.from(grids[listKey].children);
  
  // Find the correct position
  let insertIndex = existingCards.length;
  for (let i = 0; i < existingCards.length; i++) {
    const existingTitle = existingCards[i].querySelector('.title')?.textContent || '';
    if (title.toLowerCase() < existingTitle.toLowerCase()) {
      insertIndex = i;
      break;
    }
  }
  
  // Insert at the correct position
  if (insertIndex === existingCards.length) {
    grids[listKey].appendChild(card);
  } else {
    grids[listKey].insertBefore(card, existingCards[insertIndex]);
  }
}

function moveCard(card, targetList) {
  const current = card.dataset.list;
  if (current === targetList) return;
  
  const animeId = Number(card.dataset.id) || 0;
  const title = card.querySelector('.title')?.textContent || '';
  const cover = card.querySelector('img')?.src || '';
  const url = card.querySelector('a')?.href || '';
  const anime = { id: animeId, title, image: cover, url };
  
  // Update Firebase
  if (isFirebaseReady) {
    // Delete from old list
    deleteAnimeFromFirebase(animeId, current);
    // Add to new list
    saveAnimeToFirebase(anime, targetList);
  }
  
  card.dataset.list = targetList;
  
  // Remove from current list and insert alphabetically in target list
  card.remove();
  insertCardAlphabetically(card, targetList);
  
  // Re-animate all cards in the target list
  const allCards = grids[targetList].querySelectorAll('.card');
  allCards.forEach((card, index) => {
    card.style.animation = `cardSlideIn 0.6s ease-out ${index * 0.1}s both`;
  });
  
  const listNames = {
    plan: 'Noch anschauen',
    watched: 'Schon angeschaut', 
    waiting: 'Warten auf Fortsetzung'
  };
  setMessage(`Verschoben nach "${listNames[targetList]}": ${title}`, 'success');
  updateStats();
  saveAll();
}

function deleteCard(card) {
  const title = card.querySelector('.title')?.textContent || '';
  const animeId = Number(card.dataset.id) || 0;
  const listKey = card.dataset.list;
  
  // Delete from Firebase
  if (isFirebaseReady) {
    deleteAnimeFromFirebase(animeId, listKey);
  }
  
  card.remove();
  setMessage(`Gelöscht: ${title}`, 'success');
  updateStats();
  saveAll();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (localStorage.getItem('animes-is-admin') !== 'true') {
    setMessage('Nur Admins können hinzufügen.', 'error');
    return;
  }
  const title = input.value.trim();
  if (!title) return;
  setMessage('🔍 Suche Cover...');
  try {
    const anime = await fetchAnimeByTitle(title);
    if (!anime) {
      setMessage('Kein Ergebnis gefunden. Bitte anderen Namen probieren.', 'error');
      return;
    }
    const listKey = listSelect.value;
    addAnimeToList(anime, listKey);
    setMessage(`Hinzugefügt: ${anime.title}`, 'success');
    input.value = '';
    saveAll();
  } catch (err) {
    setMessage('Fehler bei der Suche. Versuch es später erneut.', 'error');
  }
});

function serializeList(listKey) {
  return Array.from(grids[listKey].children).map(card => {
    const title = card.querySelector('.title')?.textContent || '';
    const cover = card.querySelector('img')?.src || '';
    const url = card.querySelector('a')?.href || '';
    const id = Number(card.dataset.id) || 0;
    return { id, title, image: cover, url };
  });
}

function saveAll() {
  const data = {
    plan: serializeList('plan'),
    watched: serializeList('watched'),
    waiting: serializeList('waiting')
  };
  try {
    localStorage.setItem('animes-app', JSON.stringify(data));
  } catch (_) {
    // ignore
  }
}

function loadAll() {
  try {
    const raw = localStorage.getItem('animes-app');
    if (!raw) return;
    const data = JSON.parse(raw);
    ['plan', 'watched', 'waiting'].forEach(key => {
      // Sort animes alphabetically before adding them
      const sortedAnimes = (data[key] || []).sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      sortedAnimes.forEach(item => addAnimeToList(item, key));
    });
  } catch (_) {
    // ignore
  }
}

// THEME
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.add('theme-light');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    root.classList.remove('theme-light');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

function updateStats() {
  const planItems = grids.plan.children.length;
  const watchedItems = grids.watched.children.length;
  const waitingItems = grids.waiting.children.length;
  const totalItems = planItems + watchedItems + waitingItems;
  
  totalCount.textContent = totalItems;
  planCount.textContent = planItems;
  watchedCount.textContent = watchedItems;
  waitingCount.textContent = waitingItems;
}

function getPreferredTheme() {
  const saved = localStorage.getItem('animes-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('animes-theme', next);
  applyTheme(next);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Modal handlers
function closeModal() {
  editModal.style.display = 'none';
  modalTitleInput.value = '';
  modalLinkInput.value = '';
  editModal.dataset.cardId = '';
}

function saveTitle() {
  const cardId = editModal.dataset.cardId;
  const newTitle = modalTitleInput.value.trim();
  const newLink = modalLinkInput.value.trim();
  if (!newTitle) return;
  
  const allCards = document.querySelectorAll('.card');
  for (const card of allCards) {
    if (card.dataset.id === cardId) {
      const oldTitle = card.querySelector('.title')?.textContent || '';
      
      // Update title
      const titleEl = card.querySelector('.title');
      if (titleEl && newTitle !== titleEl.textContent) {
        titleEl.textContent = newTitle;
      }
      
      // Update link
      const linkEl = card.querySelector('a');
      if (linkEl) {
        if (newLink) {
          linkEl.href = newLink;
          linkEl.onclick = null; // Remove any preventDefault
        } else {
          // If no link provided, disable the link
          linkEl.href = '#';
          linkEl.onclick = (e) => e.preventDefault();
        }
      }
      
      // Re-sort if title changed
      if (newTitle !== oldTitle) {
        const listKey = card.dataset.list;
        card.remove();
        insertCardAlphabetically(card, listKey);
        
        // Re-animate all cards in the list
        const allCardsInList = grids[listKey].querySelectorAll('.card');
        allCardsInList.forEach((card, index) => {
          card.style.animation = `cardSlideIn 0.6s ease-out ${index * 0.1}s both`;
        });
      }
      
      // Update Firebase if title or link changed
      if (isFirebaseReady && (newTitle !== oldTitle || newLink !== currentLink)) {
        const animeId = Number(card.dataset.id) || 0;
        const listKey = card.dataset.list;
        const cover = card.querySelector('img')?.src || '';
        const updatedAnime = { id: animeId, title: newTitle, image: cover, url: newLink };
        saveAnimeToFirebase(updatedAnime, listKey);
      }
      
      saveAll();
      setMessage('Anime bearbeitet.', 'success');
      break;
    }
  }
  closeModal();
}

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
modalSave.addEventListener('click', saveTitle);
editModal.addEventListener('click', (e) => {
  if (e.target === editModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && editModal.style.display === 'flex') closeModal();
});
modalTitleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); saveTitle(); }
});

// Admin handlers
if (adminToggle) adminToggle.addEventListener('click', toggleAdmin);
if (adminClose) adminClose.addEventListener('click', () => adminModal.style.display = 'none');
if (adminCancel) adminCancel.addEventListener('click', () => adminModal.style.display = 'none');
if (adminLogin) adminLogin.addEventListener('click', loginAdmin);
adminPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginAdmin(); });
adminEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') adminPassword.focus(); });

// Init
async function initializeApp() {
  // Initialize UI first
  switchTab('plan');
  updateStats();
  applyTheme(getPreferredTheme());
  setAdminUI(localStorage.getItem('animes-is-admin') === 'true');
  
  // Load data from localStorage first (safety first!)
  console.log('Lade Daten aus localStorage...');
  loadAll();
  
  // Wait for Firebase to be ready
  await waitForFirebase();
  
  // Setup Firebase listeners
  setupAuthStateListener();
  
  // Handle data loading and migration
  if (isFirebaseReady) {
    console.log('Firebase ist bereit, prüfe Migration...');
    
    // Check if we have localStorage data to migrate
    const hasLocalData = localStorage.getItem('animes-app');
    const isMigrated = localStorage.getItem('animes-migrated-to-firebase');
    
    if (hasLocalData && !isMigrated) {
      console.log('Starte Migration...');
      await migrateToFirebase();
    }
    
    // Load from Firebase
    await loadAnimesFromFirebase();
    
    // Setup real-time listener after initial load
    setupRealtimeListener();
  } else {
    console.log('Firebase nicht verfügbar, verwende localStorage');
  }
}

// Debug function to check data
function debugData() {
  console.log('=== DEBUG INFO ===');
  console.log('Firebase ready:', isFirebaseReady);
  console.log('localStorage data:', localStorage.getItem('animes-app'));
  console.log('Migration status:', localStorage.getItem('animes-migrated-to-firebase'));
  console.log('Admin status:', localStorage.getItem('animes-is-admin'));
  console.log('Plan animes:', grids.plan.children.length);
  console.log('Watched animes:', grids.watched.children.length);
  console.log('Waiting animes:', grids.waiting.children.length);
  console.log('==================');
}

// NOTFALL: Daten aus localStorage wiederherstellen
function emergencyRestore() {
  console.log('🚨 NOTFALL-WIEDERHERSTELLUNG GESTARTET');
  
  // Migration-Status zurücksetzen
  localStorage.removeItem('animes-migrated-to-firebase');
  
  // Firebase-Listener deaktivieren
  if (window.firebaseUnsubscribe) {
    window.firebaseUnsubscribe();
  }
  
  // Daten aus localStorage laden
  loadAll();
  
  console.log('✅ Daten wiederhergestellt!');
  setMessage('NOTFALL: Daten aus localStorage wiederhergestellt!', 'success');
}

// NOTFALL: Alle Firebase-Daten löschen und neu starten
async function emergencyReset() {
  console.log('🚨 NOTFALL-RESET GESTARTET');
  
  if (!isFirebaseReady) {
    console.log('Firebase nicht verfügbar');
    return;
  }
  
  try {
    // Alle Firebase-Daten löschen
    const animesRef = firebase.collection(firebase.db, 'animes');
    const snapshot = await firebase.getDocs(animesRef);
    
    for (const doc of snapshot.docs) {
      await firebase.deleteDoc(doc.ref);
    }
    
    // Migration-Status zurücksetzen
    localStorage.removeItem('animes-migrated-to-firebase');
    
    // Daten aus localStorage laden
    loadAll();
    
    console.log('✅ Reset abgeschlossen!');
    setMessage('NOTFALL: Reset abgeschlossen!', 'success');
  } catch (error) {
    console.error('Reset-Fehler:', error);
    setMessage('Reset fehlgeschlagen!', 'error');
  }
}

// Make debug and emergency functions available globally
window.debugData = debugData;
window.emergencyRestore = emergencyRestore;
window.emergencyReset = emergencyReset;

// Start the app
initializeApp();
})();
