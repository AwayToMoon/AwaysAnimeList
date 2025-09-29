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

// Live status elements
const liveStatus = document.getElementById('live-status');
const liveCover = document.getElementById('live-cover');
const liveTitle = document.getElementById('live-title');

// Admin password is now stored securely in Firebase (hashed)

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
const adminPassword = document.getElementById('admin-password');
const adminCancel = document.getElementById('admin-cancel');
const adminLogin = document.getElementById('admin-login');

// Backup elements
const backupBtn = document.getElementById('backup-btn');
const restoreBtn = document.getElementById('restore-btn');
const restoreModal = document.getElementById('restore-modal');
const restoreClose = document.querySelector('[data-close-restore]');
const backupFile = document.getElementById('backup-file');
const restoreCancel = document.getElementById('restore-cancel');
const restoreConfirm = document.getElementById('restore-confirm');

// Termin elements
const terminModal = document.getElementById('termin-modal');
const terminClose = document.querySelector('[data-close-termin]');
const terminType = document.getElementById('termin-type');
const terminDate = document.getElementById('termin-date');
const terminTime = document.getElementById('termin-time');
const terminNote = document.getElementById('termin-note');
const terminCancel = document.getElementById('termin-cancel');
const terminSave = document.getElementById('termin-save');
const terminRemove = document.getElementById('termin-remove');
const dateFields = document.getElementById('date-fields');
const timeField = document.getElementById('time-field');

const API_BASE = 'https://api.jikan.moe/v4';
const ANILIST_API = 'https://graphql.anilist.co';
const ANISEARCH_API = 'https://api.anisearch.com';

function setMessage(text, type = 'info') {
  message.textContent = text;
  message.className = type;
  if (!text) message.removeAttribute('class');
}

// Live status functions
function setLiveAnime(anime) {
  if (!anime) {
    liveStatus.style.display = 'none';
    return;
  }
  
  liveCover.src = anime.image || '';
  liveCover.alt = anime.title || '';
  liveTitle.textContent = anime.title || '';
  liveStatus.style.display = 'flex';
  
  // Show live status for all users
  console.log('Live anime set:', anime.title);
}

async function getCurrentLiveAnime() {
  // First try to get from Firebase
  const firebaseLive = await getFirebaseLiveStatus();
  if (firebaseLive) {
    return firebaseLive;
  }
  
  // Fallback: Look for anime with data-live="true" attribute in any list
  const allCards = document.querySelectorAll('.card[data-live="true"]');
  
  if (allCards.length > 0) {
    const card = allCards[0];
    return {
      title: card.querySelector('.title')?.textContent || '',
      image: card.querySelector('img')?.src || '',
      url: card.querySelector('a')?.href || ''
    };
  }
  
  return null;
}

async function updateLiveStatus() {
  const liveAnime = await getCurrentLiveAnime();
  setLiveAnime(liveAnime);
  
  // Ensure live status is visible for all users
  if (liveAnime) {
    console.log('Live status updated for all users:', liveAnime.title);
  }
}

async function toggleLiveStatus(card) {
  const isLive = card.dataset.live === 'true';
  
  if (isLive) {
    // Remove live status
    await setFirebaseLiveStatus(null);
    card.dataset.live = 'false';
    card.classList.remove('live-card');
    const liveBtn = card.querySelector('.cover-live');
    if (liveBtn) {
      liveBtn.textContent = '▶️';
      liveBtn.title = 'Als Live markieren';
    }
    setMessage('Live-Status entfernt', 'success');
  } else {
    // Remove live status from all other cards first
    document.querySelectorAll('.card[data-live="true"]').forEach(otherCard => {
      otherCard.dataset.live = 'false';
      otherCard.classList.remove('live-card');
      const otherLiveBtn = otherCard.querySelector('.cover-live');
      if (otherLiveBtn) {
        otherLiveBtn.textContent = '▶️';
        otherLiveBtn.title = 'Als Live markieren';
      }
    });
    
    // Set this card as live
    const liveAnime = {
      id: Number(card.dataset.id) || 0,
      title: card.querySelector('.title')?.textContent || '',
      image: card.querySelector('img')?.src || '',
      url: card.querySelector('a')?.href || ''
    };
    
    await setFirebaseLiveStatus(liveAnime);
    card.dataset.live = 'true';
    card.classList.add('live-card');
    const liveBtn = card.querySelector('.cover-live');
    if (liveBtn) {
      liveBtn.textContent = '⏸️';
      liveBtn.title = 'Live-Status entfernen';
    }
    setMessage('Als Live markiert', 'success');
  }
  
  updateLiveStatus();
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
  const pwd = adminPassword.value.trim();
  
  if (!pwd) {
    setMessage('Bitte geben Sie ein Passwort ein', 'error');
    return;
  }
  
  try {
    const isValid = await checkAdminPassword(pwd);
    if (isValid) {
      localStorage.setItem('animes-is-admin', 'true');
      setAdminUI(true);
      closeAdminModal();
      setMessage('Als Admin angemeldet.', 'success');
    } else {
      setMessage('Falsches Passwort.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    setMessage('Fehler beim Login', 'error');
  }
}

async function checkAdminPassword(inputPassword) {
  try {
    const doc = await window.db.collection("settings").doc("admin").get();
    if (doc.exists) {
      const data = doc.data();
      const hashedInput = CryptoJS.SHA256(inputPassword).toString();
      return hashedInput === data.passwordHash;
    }
    return false;
  } catch (error) {
    console.error("Error checking password:", error);
    return false;
  }
}

function logoutAdmin() {
  localStorage.removeItem('animes-is-admin');
  setAdminUI(false);
  setMessage('Admin abgemeldet.', 'success');
}

function toggleAdmin() {
  const isAdmin = localStorage.getItem('animes-is-admin') === 'true';
  if (isAdmin) logoutAdmin(); else openAdminModal();
}

async function switchTab(key) {
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
  
  // Update live status when switching tabs
  await updateLiveStatus();
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

  const liveBtn = document.createElement('button');
  liveBtn.type = 'button';
  liveBtn.className = 'cover-live';
  liveBtn.title = 'Als Live markieren';
  liveBtn.textContent = '▶️';
  liveBtn.addEventListener('click', () => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können Live-Status ändern.', 'error');
      return;
    }
    toggleLiveStatus(card);
  });

  // Termin Button - nur für "waiting" Liste
  const terminBtn = document.createElement('button');
  terminBtn.type = 'button';
  terminBtn.className = 'cover-termin';
  terminBtn.title = 'Termin für Fortsetzung setzen';
  terminBtn.textContent = '📅';
  terminBtn.addEventListener('click', () => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können Termine setzen.', 'error');
      return;
    }
    openTerminModal(card);
  });

  coverWrap.appendChild(img);
  coverWrap.appendChild(editBtn);
  coverWrap.appendChild(liveBtn);
  if (listKey === 'waiting') {
    coverWrap.appendChild(terminBtn);
  }

  const titleEl = document.createElement('h3');
  titleEl.className = 'title';
  titleEl.textContent = anime.title;

  // Termin Display - nur für "waiting" Liste
  if (listKey === 'waiting' && anime.termin) {
    const terminDisplay = document.createElement('div');
    terminDisplay.className = 'termin-display';
    
    const terminDateEl = document.createElement('div');
    terminDateEl.className = 'termin-date';
    terminDateEl.textContent = formatTerminDate(anime.termin.date, anime.termin.type === 'tba');
    
    terminDisplay.appendChild(terminDateEl);
    
    if (anime.termin.time && anime.termin.type === 'date') {
      const terminTimeEl = document.createElement('div');
      terminTimeEl.className = 'termin-time';
      terminTimeEl.textContent = `⏰ ${anime.termin.time}`;
      terminDisplay.appendChild(terminTimeEl);
    }
    
    if (anime.termin.note) {
      const terminNoteEl = document.createElement('div');
      terminNoteEl.className = 'termin-note';
      terminNoteEl.textContent = anime.termin.note;
      terminDisplay.appendChild(terminNoteEl);
    }
    
    // Set status class based on type and date
    if (anime.termin.type === 'tba') {
      terminDisplay.classList.add('tba');
    } else {
      const today = new Date().toDateString();
      const terminDate = new Date(anime.termin.date).toDateString();
      
      if (terminDate === today) {
        terminDisplay.classList.add('today');
      } else if (new Date(anime.termin.date) < new Date()) {
        terminDisplay.classList.add('overdue');
      } else {
        terminDisplay.classList.add('upcoming');
      }
    }
    
    card.appendChild(terminDisplay);
  }

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

  // Create dropdown container
  const moveContainer = document.createElement('div');
  moveContainer.className = 'move-dropdown-container';
  
  const moveSelect = document.createElement('select');
  moveSelect.className = 'move-dropdown';
  moveSelect.title = 'Anime in andere Liste verschieben';
  
  // Add options for all lists except current one
  const listOptions = [
    { value: 'plan', text: '📋 Noch anschauen', icon: '📋' },
    { value: 'watched', text: '✅ Fertig geschaut', icon: '✅' },
    { value: 'waiting', text: '⏳ Warten auf Fortsetzung', icon: '⏳' }
  ];
  
  listOptions.forEach(option => {
    if (option.value !== listKey) {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.text;
      moveSelect.appendChild(optionEl);
    }
  });
  
  // Add change event listener
  moveSelect.addEventListener('change', async (e) => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können verschieben.', 'error');
      moveSelect.value = ''; // Reset selection
      return;
    }
    const targetList = e.target.value;
    if (targetList && targetList !== listKey) {
      await moveCard(card, targetList);
      // Reset dropdown after move
      moveSelect.value = '';
    }
  });
  
  moveContainer.appendChild(moveSelect);

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn danger';
  delBtn.textContent = '🗑️';
  delBtn.title = 'Löschen';
  delBtn.addEventListener('click', async () => {
    if (localStorage.getItem('animes-is-admin') !== 'true') {
      setMessage('Nur Admins können löschen.', 'error');
      return;
    }
    await deleteCard(card);
  });

  actions.appendChild(link);
  actions.appendChild(moveContainer);
  actions.appendChild(delBtn);

  card.appendChild(coverWrap);
  card.appendChild(titleEl);
  card.appendChild(actions);

  return card;
}

function addAnimeToList(anime, listKey) {
  const card = createCard(anime, listKey);
  
  // Load termin data if it exists
  if (anime.termin) {
    card.dataset.termin = JSON.stringify(anime.termin);
    updateTerminDisplay(card, anime.termin);
  }
  
  // Insert card in alphabetical order
  insertCardAlphabetically(card, listKey);
  
  // Re-animate all cards
  const allCards = grids[listKey].querySelectorAll('.card');
  allCards.forEach((card, index) => {
    card.style.animation = `cardSlideIn 0.6s ease-out ${index * 0.1}s both`;
  });
  
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

async function moveCard(card, targetList) {
  const current = card.dataset.list;
  if (current === targetList) return;
  
  const title = card.querySelector('.title')?.textContent || '';
  const cover = card.querySelector('img')?.src || '';
  const url = card.querySelector('a')?.href || '';
  const anime = { id: Number(card.dataset.id) || 0, title, image: cover, url };
  
  // Remove from current list
  card.remove();
  
  // Update the card's list attribute
  card.dataset.list = targetList;
  
  // Update the dropdown options for the new list
  updateCardDropdown(card, targetList);
  
  // Insert alphabetically in target list
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
  await updateLiveStatus();
  saveAll();
}

function updateCardDropdown(card, currentList) {
  const dropdown = card.querySelector('.move-dropdown');
  if (!dropdown) return;
  
  // Clear existing options
  dropdown.innerHTML = '';
  
  // Add options for all lists except current one
  const listOptions = [
    { value: 'plan', text: '📋 Noch anschauen' },
    { value: 'watched', text: '✅ Fertig geschaut' },
    { value: 'waiting', text: '⏳ Warten auf Fortsetzung' }
  ];
  
  listOptions.forEach(option => {
    if (option.value !== currentList) {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.text;
      dropdown.appendChild(optionEl);
    }
  });
}

// Termin Functions
function formatTerminDate(dateString, isTBA = false) {
  if (isTBA) {
    return 'TBA (To Be Announced)';
  }
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dateStr = date.toDateString();
  const todayStr = today.toDateString();
  const tomorrowStr = tomorrow.toDateString();
  
  if (dateStr === todayStr) {
    return 'Heute';
  } else if (dateStr === tomorrowStr) {
    return 'Morgen';
  } else {
    return date.toLocaleDateString('de-DE', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit',
      year: '2-digit'
    });
  }
}

function openTerminModal(card) {
  const currentTermin = card.dataset.termin ? JSON.parse(card.dataset.termin) : null;
  
  if (currentTermin) {
    terminType.value = currentTermin.type || 'date';
    terminDate.value = currentTermin.date || '';
    terminTime.value = currentTermin.time || '';
    terminNote.value = currentTermin.note || '';
    terminRemove.style.display = 'inline-block';
  } else {
    terminType.value = 'date';
    terminDate.value = '';
    terminTime.value = '';
    terminNote.value = '';
    terminRemove.style.display = 'none';
  }
  
  // Update field visibility based on type
  updateTerminFieldsVisibility();
  
  terminModal.style.display = 'flex';
  terminModal.dataset.cardId = card.dataset.id;
  terminDate.focus();
}

function closeTerminModal() {
  terminModal.style.display = 'none';
  terminType.value = 'date';
  terminDate.value = '';
  terminTime.value = '';
  terminNote.value = '';
  terminModal.dataset.cardId = '';
  terminRemove.style.display = 'none';
  updateTerminFieldsVisibility();
}

function saveTermin() {
  const cardId = terminModal.dataset.cardId;
  const type = terminType.value;
  const date = terminDate.value.trim();
  const time = terminTime.value.trim();
  const note = terminNote.value.trim();
  
  if (type === 'date' && !date) {
    setMessage('Bitte wähle ein Datum aus.', 'error');
    return;
  }
  
  const termin = {
    type: type,
    date: type === 'date' ? date : null,
    time: type === 'date' ? (time || null) : null,
    note: note || null
  };
  
  // Find the card and update it
  const allCards = document.querySelectorAll('.card');
  for (const card of allCards) {
    if (card.dataset.id === cardId) {
      card.dataset.termin = JSON.stringify(termin);
      
      // Update or create termin display
      updateTerminDisplay(card, termin);
      
      setMessage('Termin gespeichert!', 'success');
      break;
    }
  }
  
  closeTerminModal();
  saveAll();
}

function removeTermin() {
  const cardId = terminModal.dataset.cardId;
  
  // Find the card and remove termin
  const allCards = document.querySelectorAll('.card');
  for (const card of allCards) {
    if (card.dataset.id === cardId) {
      delete card.dataset.termin;
      
      // Remove termin display
      const terminDisplay = card.querySelector('.termin-display');
      if (terminDisplay) {
        terminDisplay.remove();
      }
      
      setMessage('Termin entfernt!', 'success');
      break;
    }
  }
  
  closeTerminModal();
  saveAll();
}

function updateTerminDisplay(card, termin) {
  // Remove existing termin display
  const existingDisplay = card.querySelector('.termin-display');
  if (existingDisplay) {
    existingDisplay.remove();
  }
  
  // Only show for waiting list
  if (card.dataset.list !== 'waiting') return;
  
  const terminDisplay = document.createElement('div');
  terminDisplay.className = 'termin-display';
  
  const terminDateEl = document.createElement('div');
  terminDateEl.className = 'termin-date';
  terminDateEl.textContent = formatTerminDate(termin.date, termin.type === 'tba');
  terminDisplay.appendChild(terminDateEl);
  
  if (termin.time && termin.type === 'date') {
    const terminTimeEl = document.createElement('div');
    terminTimeEl.className = 'termin-time';
    terminTimeEl.textContent = `⏰ ${termin.time}`;
    terminDisplay.appendChild(terminTimeEl);
  }
  
  if (termin.note) {
    const terminNoteEl = document.createElement('div');
    terminNoteEl.className = 'termin-note';
    terminNoteEl.textContent = termin.note;
    terminDisplay.appendChild(terminNoteEl);
  }
  
  // Set status class based on type and date
  if (termin.type === 'tba') {
    terminDisplay.classList.add('tba');
  } else {
    const today = new Date().toDateString();
    const terminDate = new Date(termin.date).toDateString();
    
    if (terminDate === today) {
      terminDisplay.classList.add('today');
    } else if (new Date(termin.date) < new Date()) {
      terminDisplay.classList.add('overdue');
    } else {
      terminDisplay.classList.add('upcoming');
    }
  }
  
  // Insert after title, before actions
  const titleEl = card.querySelector('.title');
  titleEl.parentNode.insertBefore(terminDisplay, titleEl.nextSibling);
}

function updateTerminFieldsVisibility() {
  const type = terminType.value;
  
  if (type === 'tba') {
    dateFields.classList.add('hidden');
    timeField.classList.add('hidden');
  } else {
    dateFields.classList.remove('hidden');
    timeField.classList.remove('hidden');
  }
}

async function deleteCard(card) {
  const title = card.querySelector('.title')?.textContent || '';
  card.remove();
  setMessage(`Gelöscht: ${title}`, 'success');
  updateStats();
  await updateLiveStatus();
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
    const termin = card.dataset.termin ? JSON.parse(card.dataset.termin) : null;
    return { id, title, image: cover, url, termin };
  });
}

function saveAll() {
  const data = {
    plan: serializeList('plan'),
    watched: serializeList('watched'),
    waiting: serializeList('waiting'),
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
  try {
    localStorage.setItem('animes-app', JSON.stringify(data));
    // Sync to Firebase if available
    if (window.db) {
      syncToFirebase(data);
    }
  } catch (_) {
    // ignore
  }
}

// Firebase sync functions
async function syncToFirebase(data) {
  try {
    await window.db.collection('animeList').doc('main').set(data);
    console.log('Data synced to Firebase');
  } catch (error) {
    console.error('Firebase sync failed:', error);
  }
}

// Firebase Live Status functions
async function setFirebaseLiveStatus(liveAnime) {
  try {
    if (window.db) {
      await window.db.collection('liveStatus').doc('current').set({
        liveAnime: liveAnime,
        timestamp: new Date().toISOString()
      });
      console.log('Live status saved to Firebase:', liveAnime?.title || 'null');
    }
  } catch (error) {
    console.error('Firebase live status save failed:', error);
  }
}

async function getFirebaseLiveStatus() {
  try {
    if (window.db) {
      const doc = await window.db.collection('liveStatus').doc('current').get();
      if (doc.exists) {
        const data = doc.data();
        return data.liveAnime || null;
      }
    }
  } catch (error) {
    console.error('Firebase live status load failed:', error);
  }
  return null;
}

async function loadFromFirebase() {
  try {
    const doc = await window.db.collection('animeList').doc('main').get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (error) {
    console.error('Firebase load failed:', error);
  }
  return null;
}

// Backup functions
function createBackup() {
  console.log('createBackup function called');
  const data = {
    plan: serializeList('plan'),
    watched: serializeList('watched'),
    waiting: serializeList('waiting'),
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `anime-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  setMessage('Backup erfolgreich erstellt!', 'success');
}

function openRestoreModal() {
  console.log('openRestoreModal function called');
  restoreModal.style.display = 'flex';
  backupFile.value = '';
}

function closeRestoreModal() {
  restoreModal.style.display = 'none';
  backupFile.value = '';
}

function restoreFromBackup() {
  const file = backupFile.files[0];
  if (!file) {
    setMessage('Bitte wähle eine Backup-Datei aus.', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      // Validate backup data
      if (!data.plan || !data.watched || !data.waiting) {
        throw new Error('Ungültige Backup-Datei');
      }
      
      // Clear current data
      ['plan', 'watched', 'waiting'].forEach(key => {
        grids[key].innerHTML = '';
      });
      
      // Restore data
      ['plan', 'watched', 'waiting'].forEach(key => {
        if (data[key] && Array.isArray(data[key])) {
          data[key].forEach(item => {
            if (item.title) {
              addAnimeToList(item, key);
            }
          });
        }
      });
      
      saveAll();
      updateStats();
      closeRestoreModal();
      setMessage(`Backup erfolgreich wiederhergestellt! ${data.plan.length + data.watched.length + data.waiting.length} Animes geladen.`, 'success');
      
    } catch (error) {
      setMessage('Fehler beim Laden der Backup-Datei: ' + error.message, 'error');
    }
  };
  reader.readAsText(file);
}

async function loadAll() {
  try {
    // Try to load from Firebase first
    if (window.db) {
      const firebaseData = await loadFromFirebase();
      if (firebaseData) {
        loadFirebaseData(firebaseData);
        // Load live status from Firebase
        await loadFirebaseLiveStatus();
        return;
      }
    }
    
    // Fallback to local storage
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
    
    // Load live status from Firebase even if using local storage
    await loadFirebaseLiveStatus();
  } catch (_) {
    // ignore
  }
}

async function loadFirebaseLiveStatus() {
  try {
    const liveAnime = await getFirebaseLiveStatus();
    if (liveAnime) {
      // Find the corresponding card and mark it as live
      const allCards = document.querySelectorAll('.card');
      for (const card of allCards) {
        const cardTitle = card.querySelector('.title')?.textContent || '';
        if (cardTitle === liveAnime.title) {
          card.dataset.live = 'true';
          card.classList.add('live-card');
          const liveBtn = card.querySelector('.cover-live');
          if (liveBtn) {
            liveBtn.textContent = '⏸️';
            liveBtn.title = 'Live-Status entfernen';
          }
          break;
        }
      }
      setLiveAnime(liveAnime);
    }
  } catch (error) {
    console.error('Error loading Firebase live status:', error);
  }
}

function loadFirebaseData(data) {
  // Clear current data
  ['plan', 'watched', 'waiting'].forEach(key => {
    grids[key].innerHTML = '';
  });
  
  // Load Firebase data
  ['plan', 'watched', 'waiting'].forEach(key => {
    if (data[key] && Array.isArray(data[key])) {
      data[key].forEach(item => {
        if (item.title) {
          addAnimeToList(item, key);
        }
      });
    }
  });
  
  // Update local storage
  localStorage.setItem('animes-app', JSON.stringify(data));
  updateStats();
  setMessage('Daten aus der Cloud geladen!', 'success');
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
  if (e.key === 'Escape' && restoreModal.style.display === 'flex') closeRestoreModal();
  if (e.key === 'Escape' && terminModal.style.display === 'flex') closeTerminModal();
});
modalTitleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); saveTitle(); }
});

// Termin modal enter key support
if (terminDate) terminDate.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); saveTermin(); }
});
if (terminTime) terminTime.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); saveTermin(); }
});
if (terminNote) terminNote.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); saveTermin(); }
});

// Restore modal click outside to close
restoreModal.addEventListener('click', (e) => {
  if (e.target === restoreModal) closeRestoreModal();
});

// Admin handlers
if (adminToggle) adminToggle.addEventListener('click', toggleAdmin);
if (adminClose) adminClose.addEventListener('click', () => adminModal.style.display = 'none');
if (adminCancel) adminCancel.addEventListener('click', () => adminModal.style.display = 'none');
if (adminLogin) adminLogin.addEventListener('click', loginAdmin);
if (adminPassword) adminPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginAdmin(); });

// Backup handlers
if (backupBtn) {
  console.log('Backup button found, adding event listener');
  backupBtn.addEventListener('click', createBackup);
} else {
  console.log('Backup button not found');
}

if (restoreBtn) {
  console.log('Restore button found, adding event listener');
  restoreBtn.addEventListener('click', openRestoreModal);
} else {
  console.log('Restore button not found');
}

if (restoreClose) restoreClose.addEventListener('click', closeRestoreModal);
if (restoreCancel) restoreCancel.addEventListener('click', closeRestoreModal);
if (restoreConfirm) restoreConfirm.addEventListener('click', restoreFromBackup);

// Termin handlers
if (terminClose) terminClose.addEventListener('click', closeTerminModal);
if (terminCancel) terminCancel.addEventListener('click', closeTerminModal);
if (terminSave) terminSave.addEventListener('click', saveTermin);
if (terminRemove) terminRemove.addEventListener('click', removeTermin);
if (terminType) terminType.addEventListener('change', updateTerminFieldsVisibility);
if (terminModal) terminModal.addEventListener('click', (e) => {
  if (e.target === terminModal) closeTerminModal();
});

// Init
loadAll().then(async () => {
  updateStats();
  await updateLiveStatus(); // Always update live status for all users
  await switchTab('plan');
});
applyTheme(getPreferredTheme());
setAdminUI(localStorage.getItem('animes-is-admin') === 'true');

// Ensure backup buttons work - add event listeners after DOM is fully loaded
setTimeout(() => {
  const backupBtnRetry = document.getElementById('backup-btn');
  const restoreBtnRetry = document.getElementById('restore-btn');
  
  if (backupBtnRetry && !backupBtnRetry.onclick) {
    console.log('Adding backup button listener via setTimeout');
    backupBtnRetry.addEventListener('click', createBackup);
  }
  
  if (restoreBtnRetry && !restoreBtnRetry.onclick) {
    console.log('Adding restore button listener via setTimeout');
    restoreBtnRetry.addEventListener('click', openRestoreModal);
  }
}, 100);
})();
