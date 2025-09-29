
(function () {
  const form = document.getElementById('anime-form');
  const input = document.getElementById('anime-input');
  const listSelect = document.getElementById('anime-list-select');
  const message = document.getElementById('message');
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = {
    plan: document.getElementById('tab-plan'),
    watched: document.getElementById('tab-watched'),
    waiting: document.getElementById('tab-waiting'),
    fsk: document.getElementById('tab-fsk')
  };
  const grids = {
    plan: document.getElementById('grid-plan'),
    watched: document.getElementById('grid-watched'),
    waiting: document.getElementById('grid-waiting'),
    fsk: document.getElementById('grid-fsk')
  };
  const themeToggle = document.getElementById('theme-toggle');
  
  // Stats elements
  const totalCount = document.getElementById('total-count');
  const watchedCount = document.getElementById('watched-count');
  const planCount = document.getElementById('plan-count');
  const waitingCount = document.getElementById('waiting-count');
  const fskCount = document.getElementById('fsk-count');
  
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
  
  // Help elements
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const helpClose = document.querySelector('[data-close-help]');
  
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
  
  // Rating elements
  const ratingModal = document.getElementById('rating-modal');
  const ratingClose = document.querySelector('[data-close-rating]');
  const ratingStars = document.getElementById('rating-stars');
  const ratingText = document.getElementById('rating-text');
  const ratingReview = document.getElementById('rating-review');
  const ratingCancel = document.getElementById('rating-cancel');
  const ratingSave = document.getElementById('rating-save');
  const ratingRemove = document.getElementById('rating-remove');
  
  
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
  
  // Anime Details Modal elements
  const animeDetailsModal = document.getElementById('anime-details-modal');
  const animeDetailsClose = document.querySelector('[data-close-details]');
  const animeDetailsTitle = document.getElementById('anime-details-title');
  const animeDetailsName = document.getElementById('anime-details-name');
  const animeDetailsImage = document.getElementById('anime-details-image');
  const animeDetailsGenresList = document.getElementById('anime-details-genres-list');
  const animeDetailsExternalLink = document.getElementById('anime-details-external-link');
  const animeDetailsTrailerBtn = document.getElementById('anime-details-trailer-btn');
  
  // Anime Trailer Modal elements
  const animeTrailerModal = document.getElementById('anime-trailer-modal');
  const trailerClose = document.querySelector('[data-close-trailer]');
  const trailerModalTitle = document.getElementById('trailer-modal-title');
  const trailerPlayer = document.getElementById('trailer-player');
  const trailerAnimeTitle = document.getElementById('trailer-anime-title');
  const trailerAnimeDescription = document.getElementById('trailer-anime-description');
  
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
          
          // Choose animation type based on position for variety
          const animationType = index % 3 === 0 ? 'cardBounceIn' : 
                               index % 3 === 1 ? 'cardStaggerIn' : 'cardSlideIn';
          const delay = index * 0.08; // Slightly faster stagger
          const duration = index % 3 === 0 ? '0.8s' : '0.6s';
          
          // Re-add animation with proper delay and type
          card.style.animation = `${animationType} ${duration} cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`;
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
          url: generateAniworldUrl(item.title?.en || item.title?.de || item.title?.ja || item.title?.romaji || item.title),
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
  
  // Generate Aniworld URL for anime
  function generateAniworldUrl(title) {
    if (!title) return '#';
    // Convert title to URL-friendly format
    const urlTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
    return `https://aniworld.to/anime/stream/${urlTitle}`;
  }

  // Anime tag mapping for better categorization
  const ANIME_TAG_MAPPING = {
    'Isekai': 'isekai',
    'Action': 'action',
    'Romance': 'romance',
    'Comedy': 'comedy',
    'Drama': 'drama',
    'Fantasy': 'fantasy',
    'Sports': 'sports',
    'Mystery': 'mystery',
    'Horror': 'horror',
    'Slice of Life': 'slice-of-life',
    'Mecha': 'mecha',
    'Supernatural': 'supernatural',
    'Adventure': 'action',
    'Sci-Fi': 'fantasy',
    'Thriller': 'mystery',
    'Psychological': 'drama',
    'School': 'slice-of-life',
    'Music': 'slice-of-life',
    'Historical': 'drama',
    'Military': 'action',
    'Parody': 'comedy',
    'Samurai': 'action',
    'Demons': 'supernatural',
    'Magic': 'fantasy',
    'Vampire': 'supernatural',
    'Martial Arts': 'action',
    'Police': 'action',
    'Space': 'fantasy',
    'Game': 'fantasy',
    'Cars': 'sports',
    'Josei': 'drama',
    'Seinen': 'drama',
    'Shoujo': 'romance',
    'Shounen': 'action'
  };
  
  async function fetchAnimeTags(animeId) {
    try {
      // Try AniList first for better tag data
      const anilistQuery = `
        query ($id: Int) {
          Media(id: $id) {
            genres
            tags {
              name
              rank
            }
          }
        }
      `;
      
      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: anilistQuery,
          variables: { id: animeId }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.Media) {
          const media = data.data.Media;
          const tags = [];
          
          // Add genres as primary tags
          if (media.genres && media.genres.length > 0) {
            tags.push(...media.genres.slice(0, 3));
          }
          
          // Add top-ranked tags
          if (media.tags && media.tags.length > 0) {
            const topTags = media.tags
              .filter(tag => tag.rank > 50) // Only high-ranked tags
              .sort((a, b) => b.rank - a.rank)
              .slice(0, 2)
              .map(tag => tag.name);
            tags.push(...topTags);
          }
          
          return [...new Set(tags)].slice(0, 4); // Remove duplicates and limit to 4 tags
        }
      }
    } catch (error) {
      console.warn('AniList tags fetch failed:', error);
    }
    
    // Fallback to Jikan API
    try {
      const response = await fetch(`${API_BASE}/anime/${animeId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.genres) {
          return data.data.genres
            .filter(genre => genre.name)
            .slice(0, 4)
            .map(genre => genre.name);
        }
      }
    } catch (error) {
      console.warn('Jikan tags fetch failed:', error);
    }
    
    return [];
  }
  
  function createAnimeTags(tags) {
    if (!tags || tags.length === 0) return '';
    
    const tagElements = tags.map(tag => {
      const normalizedTag = tag.toLowerCase();
      const tagClass = ANIME_TAG_MAPPING[tag] || 
                      Object.keys(ANIME_TAG_MAPPING).find(key => 
                        key.toLowerCase() === normalizedTag
                      )?.toLowerCase() || 
                      'action'; // Default fallback
      
      return `<span class="anime-tag ${tagClass}">${tag}</span>`;
    }).join('');
    
    return `<div class="anime-tags">${tagElements}</div>`;
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
              // Fetch tags for the anime
              const tags = await fetchAnimeTags(chosen.id);
              
              return {
                id: chosen.id,
                title: chosen.title || chosen.title_english || originalTitle,
                image: getBestImageUrl(chosen),
                url: generateAniworldUrl(chosen.title || chosen.title_english || originalTitle),
                tags: tags
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
              // Fetch tags for the anime
              const tags = await fetchAnimeTags(chosen.id);
              
              return {
                id: chosen.id,
                title: chosen.title || chosen.title_english || originalTitle,
                image: getBestImageUrl(chosen),
                url: generateAniworldUrl(chosen.title || chosen.title_english || originalTitle),
                tags: tags
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
                // Fetch tags for the anime
                const tags = await fetchAnimeTags(chosen.mal_id);
                
                return {
                  id: chosen.mal_id,
                  title: chosen.title || chosen.title_english || originalTitle,
                  image: getBestImageUrl(chosen),
                  url: generateAniworldUrl(chosen.title || chosen.title_english || originalTitle),
                  tags: tags
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
    card.dataset.rating = anime.rating || '0';
  
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
  
    // Rating Button - für alle Nutzer sichtbar
    const ratingBtn = document.createElement('button');
    ratingBtn.type = 'button';
    ratingBtn.className = 'cover-rating';
    ratingBtn.title = 'Bewerten';
    ratingBtn.textContent = '⭐';
    ratingBtn.addEventListener('click', () => {
      if (localStorage.getItem('animes-is-admin') !== 'true') {
        setMessage('Nur Admins können bewerten.', 'error');
        return;
      }
      openRatingModal(card);
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
    coverWrap.appendChild(ratingBtn);
    if (listKey === 'waiting') {
      coverWrap.appendChild(terminBtn);
    }
  
    const titleEl = document.createElement('h3');
    titleEl.className = 'title';
    titleEl.textContent = anime.title;
    titleEl.title = anime.title; // Add tooltip for full title
  
    // Add anime tags if available
    if (anime.tags && anime.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.innerHTML = createAnimeTags(anime.tags);
      card.appendChild(tagsContainer);
    }
  
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
  
    // Create admin actions container (only for admins)
    const adminActions = document.createElement('div');
    adminActions.className = 'actions';
  
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
      { value: 'waiting', text: '⏳ Warten auf Fortsetzung', icon: '⏳' },
      { value: 'fsk', text: '🔞 FSK16/18+', icon: '🔞' }
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
  
    adminActions.appendChild(moveContainer);
    adminActions.appendChild(delBtn);
  
    // Create link button container (always at the bottom)
    const linkContainer = document.createElement('div');
    linkContainer.className = 'link-container';
  
    const link = document.createElement('button');
    link.type = 'button';
    link.className = 'btn link';
    link.title = 'Details anzeigen';
    link.textContent = '📋 DETAILS';
    
    // Add click handler to open details modal
    link.addEventListener('click', () => {
      openAnimeDetailsModal(anime);
    });
  
    linkContainer.appendChild(link);

    // Create hidden link element to store the URL (needed for saveTitle function)
    const hiddenLink = document.createElement('a');
    hiddenLink.href = anime.url || '#';
    hiddenLink.style.display = 'none';
    card.appendChild(hiddenLink);

    card.appendChild(coverWrap);
    card.appendChild(titleEl);
    card.appendChild(adminActions);
    card.appendChild(linkContainer);
  
    // Add rating display if exists - für alle Nutzer sichtbar
    if (anime.rating && anime.rating > 0) {
      const ratingDisplay = document.createElement('div');
      ratingDisplay.className = 'rating-display';
      
      const review = anime.review || '';
      
      ratingDisplay.innerHTML = `
        <div class="rating-text">⭐ ${anime.rating}/10</div>
        ${review ? `<div class="rating-review">"${review}"</div>` : ''}
      `;
      
      // Insert before link container
      card.insertBefore(ratingDisplay, linkContainer);
    }
  
    return card;
  }
  
  function addAnimeToList(anime, listKey) {
    // Automatically add Aniworld URL if no URL exists
    if (!anime.url || anime.url === '#' || anime.url.includes('index.html')) {
      anime.url = generateAniworldUrl(anime.title);
    }
    
    const card = createCard(anime, listKey);
    
    // Load termin data if it exists
    if (anime.termin) {
      card.dataset.termin = JSON.stringify(anime.termin);
      updateTerminDisplay(card, anime.termin);
    }
    
    // Load rating data if it exists
    if (anime.rating && anime.rating > 0) {
      card.dataset.rating = anime.rating;
      card.dataset.review = anime.review || '';
      updateRatingDisplay(card, anime.rating);
    }
    
    // Insert card in alphabetical order
    insertCardAlphabetically(card, listKey);
    
    // Re-animate all cards with enhanced staggered effect
    const allCards = grids[listKey].querySelectorAll('.card');
    allCards.forEach((card, index) => {
      // Remove existing animation
      card.style.animation = 'none';
      // Force reflow
      card.offsetHeight;
      
      // Choose animation type for variety
      const animationType = index % 4 === 0 ? 'cardBounceIn' : 
                           index % 4 === 1 ? 'cardStaggerIn' : 
                           index % 4 === 2 ? 'cardSlideIn' : 'cardBounceIn';
      const delay = index * 0.06; // Faster stagger for new additions
      const duration = index % 4 === 0 ? '0.9s' : '0.7s';
      
      // Apply enhanced animation
      card.style.animation = `${animationType} ${duration} cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`;
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
      waiting: 'Warten auf Fortsetzung',
      fsk: 'FSK16/18+'
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
      { value: 'waiting', text: '⏳ Warten auf Fortsetzung' },
      { value: 'fsk', text: '🔞 FSK16/18+' }
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
    
    // Insert after title, before admin actions
    const titleEl = card.querySelector('.title');
    const adminActions = card.querySelector('.actions');
    if (adminActions) {
      titleEl.parentNode.insertBefore(terminDisplay, adminActions);
    } else {
      titleEl.parentNode.appendChild(terminDisplay);
    }
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
  
  // Anime Details Modal Functions
  async function openAnimeDetailsModal(anime) {
    // Set basic info
    animeDetailsName.textContent = anime.title;
    animeDetailsImage.src = anime.image || '';
    animeDetailsImage.alt = anime.title;
    animeDetailsExternalLink.href = anime.url || '#';
    
    // Show loading state
    animeDetailsGenresList.innerHTML = '<span class="loading">Lade...</span>';
    
    // Hide trailer button initially
    animeDetailsTrailerBtn.style.display = 'none';
    
    // Show modal
    animeDetailsModal.style.display = 'flex';
    
    // Fetch detailed anime data
    try {
      const detailedAnime = await fetchDetailedAnimeData(anime.id);
      if (detailedAnime) {
        populateAnimeDetails(detailedAnime);
      } else {
        // Fallback to basic info if detailed fetch fails
        populateBasicAnimeDetails(anime);
      }
      
      // Always show trailer button - let the modal handle "no trailer" case
      animeDetailsTrailerBtn.style.display = 'inline-flex';
      animeDetailsTrailerBtn.onclick = () => openAnimeTrailerModal(anime);
    } catch (error) {
      console.warn('Failed to fetch detailed anime data:', error);
      populateBasicAnimeDetails(anime);
    }
  }
  
  async function fetchDetailedAnimeData(animeId) {
    if (!animeId || animeId === '0') return null;
    
    try {
      // Try AniList first for better data
      const anilistQuery = `
        query ($id: Int) {
          Media(id: $id) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            status
            format
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            averageScore
            popularity
            genres
            coverImage {
              large
              extraLarge
            }
            siteUrl
          }
        }
      `;
      
      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: anilistQuery,
          variables: { id: parseInt(animeId) }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.Media) {
          return data.data.Media;
        }
      }
    } catch (error) {
      console.warn('AniList detailed fetch failed:', error);
    }
    
    // Fallback to Jikan API
    try {
      const response = await fetch(`${API_BASE}/anime/${animeId}`);
      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (error) {
      console.warn('Jikan detailed fetch failed:', error);
    }
    
    return null;
  }
  
  function populateAnimeDetails(anime) {
    // Keep the name from the card (don't change it)
    // animeDetailsName.textContent is already set from the card
    
    // Genres
    if (anime.genres && anime.genres.length > 0) {
      animeDetailsGenresList.innerHTML = anime.genres.map(genre => 
        `<span class="genre-tag">${genre}</span>`
      ).join('');
    } else {
      animeDetailsGenresList.innerHTML = '<span class="meta-value">Keine Genres verfügbar</span>';
    }
  }
  
  function populateBasicAnimeDetails(anime) {
    // Fallback to basic info if detailed fetch fails
    animeDetailsName.textContent = anime.title || 'Unbekannt';
    animeDetailsGenresList.innerHTML = '<span class="meta-value">Keine Genres verfügbar</span>';
  }
  
  function closeAnimeDetailsModal() {
    animeDetailsModal.style.display = 'none';
  }
  
  // Anime Trailer Modal Functions
  async function openAnimeTrailerModal(anime) {
    // Set basic info
    trailerAnimeTitle.textContent = anime.title;
    trailerModalTitle.textContent = `${anime.title} - Trailer`;
    
    // Show loading state
    trailerPlayer.innerHTML = `
      <div class="trailer-loading">
        <div class="loading"></div>
        <p>Lade Trailer...</p>
      </div>
    `;
    
    // Show modal
    animeTrailerModal.style.display = 'flex';
    
    // Fetch trailer data
    try {
      const trailerData = await fetchAnimeTrailer(anime.id, anime.title);
      if (trailerData && trailerData.trailerUrl) {
        embedTrailer(trailerData.trailerUrl, trailerData.title);
        if (trailerData.description) {
          trailerAnimeDescription.textContent = trailerData.description;
    } else {
          trailerAnimeDescription.textContent = `Trailer für ${anime.title}`;
        }
      } else {
        showNoTrailerMessage(anime.title);
      }
    } catch (error) {
      console.warn('Failed to fetch trailer:', error);
      showNoTrailerMessage(anime.title);
    }
  }
  
  async function fetchAnimeTrailer(animeId, animeTitle) {
    // Try with ID first if available
    if (animeId && animeId !== '0') {
      try {
        const trailerData = await fetchTrailerById(animeId);
        if (trailerData) return trailerData;
      } catch (error) {
        console.warn('Trailer fetch by ID failed:', error);
      }
    }
    
    // If no trailer found by ID, try with title variations
    if (animeTitle) {
      try {
        return await searchTrailerByTitleVariations(animeTitle);
      } catch (error) {
        console.warn('Trailer search by title failed:', error);
      }
    }
    
    return null;
  }
  
  async function fetchTrailerById(animeId) {
    try {
      // Try AniList first for trailer data
      const anilistQuery = `
        query ($id: Int) {
          Media(id: $id) {
            id
            title {
              romaji
              english
              native
            }
            description
            trailer {
              id
              site
              thumbnail
            }
          }
        }
      `;
      
      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: anilistQuery,
          variables: { id: parseInt(animeId) }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.Media && data.data.Media.trailer) {
          const trailer = data.data.Media.trailer;
          const media = data.data.Media;
          
          // Generate YouTube embed URL with better parameters
          if (trailer.site === 'youtube' && trailer.id) {
            return {
              trailerUrl: `https://www.youtube.com/embed/${trailer.id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`,
              title: media.title.english || media.title.romaji || media.title.native,
              description: media.description ? media.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : null
            };
          }
        }
      }
    } catch (error) {
      console.warn('AniList trailer fetch failed:', error);
    }
    
    // Fallback to Jikan API
    try {
      const response = await fetch(`${API_BASE}/anime/${animeId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.trailer && data.data.trailer.youtube_id) {
          return {
            trailerUrl: `https://www.youtube.com/embed/${data.data.trailer.youtube_id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`,
            title: data.data.title,
            description: data.data.synopsis ? data.data.synopsis.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : null
          };
        }
      }
    } catch (error) {
      console.warn('Jikan trailer fetch failed:', error);
    }
    
    return null;
  }
  
  // Enhanced trailer search with title variations for popular animes
  async function searchTrailerByTitleVariations(animeTitle) {
    if (!animeTitle) return null;
    
    // Create title variations for better matching
    const titleVariations = createTitleVariations(animeTitle);
    
    for (const variation of titleVariations) {
      try {
        const trailerData = await searchTrailerByTitle(variation);
        if (trailerData) return trailerData;
      } catch (error) {
        console.warn(`Trailer search failed for variation "${variation}":`, error);
        continue;
      }
    }
    
    return null;
  }
  
  function createTitleVariations(originalTitle) {
    const variations = [originalTitle];
    
    // Special cases for popular animes
    const specialCases = {
      'Boruto: Naruto Next Generations': [
        'Boruto',
        'Boruto Naruto Next Generations',
        'Boruto: Naruto Next Generation',
        'Boruto Naruto'
      ],
      'One Piece': [
        'One Piece',
        'One Piece Anime'
      ],
      'Attack on Titan': [
        'Attack on Titan',
        'Shingeki no Kyojin',
        'AOT'
      ],
      'Demon Slayer': [
        'Demon Slayer',
        'Kimetsu no Yaiba',
        'Demon Slayer: Kimetsu no Yaiba'
      ],
      'My Hero Academia': [
        'My Hero Academia',
        'Boku no Hero Academia',
        'MHA'
      ]
    };
    
    // Check for special cases
    for (const [key, variants] of Object.entries(specialCases)) {
      if (originalTitle.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(originalTitle.toLowerCase())) {
        variations.push(...variants);
      }
    }
    
    // Add common variations
    variations.push(
      originalTitle.replace(/:/g, ''),
      originalTitle.replace(/:/g, ' -'),
      originalTitle.split(':')[0],
      originalTitle.split(' -')[0]
    );
    
    // Remove duplicates and empty strings
    return [...new Set(variations)].filter(v => v && v.trim());
  }
  
  async function searchTrailerByTitle(searchTitle) {
    if (!searchTitle) return null;
    
    try {
      const searchQuery = `
        query ($search: String) {
          Page(page: 1, perPage: 10) {
            media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
              id
              title {
                romaji
                english
                native
              }
              description
              trailer {
                id
                site
                thumbnail
              }
            }
          }
        }
      `;
      
      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          variables: { search: searchTitle }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.Page && data.data.Page.media) {
          for (const media of data.data.Page.media) {
            if (media.trailer && media.trailer.id && media.trailer.site === 'youtube') {
              return {
                trailerUrl: `https://www.youtube.com/embed/${media.trailer.id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`,
                title: media.title.english || media.title.romaji || media.title.native,
                description: media.description ? media.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : null
              };
            }
          }
        }
      }
    } catch (error) {
      console.warn('Title-based trailer search failed:', error);
    }
    
    return null;
  }
  
  function embedTrailer(trailerUrl, title) {
    trailerPlayer.innerHTML = `
      <iframe 
        src="${trailerUrl}" 
        title="${title} Trailer"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        onerror="handleTrailerError('${title}')"
        onload="handleTrailerLoad()">
      </iframe>
    `;
  }
  
  function handleTrailerError(animeTitle) {
    console.warn('YouTube trailer failed to load:', animeTitle);
    showTrailerError('YouTube-Fehler beim Laden des Trailers');
  }
  
  function handleTrailerLoad() {
    console.log('Trailer loaded successfully');
  }
  
  function showTrailerError(message) {
    trailerPlayer.innerHTML = `
      <div class="trailer-loading">
        <div style="font-size: 48px; color: var(--muted); margin-bottom: 16px;">⚠️</div>
        <h3 style="color: var(--text); font-weight: 600; margin-bottom: 12px;">Trailer-Fehler</h3>
        <p style="color: var(--danger); font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
          ${message}
        </p>
        <div style="padding: 16px; background: var(--card); border-radius: 12px; border: 1px solid var(--border);">
          <p style="color: var(--text); font-size: 14px; margin: 0;">
            🔧 <strong>Mögliche Ursachen:</strong><br>
            • YouTube hat die Einbettung blockiert<br>
            • Trailer ist nicht mehr verfügbar<br>
            • Netzwerk- oder Browser-Problem
          </p>
        </div>
      </div>
    `;
    trailerAnimeDescription.textContent = 'Trailer konnte nicht geladen werden - bitte manuell suchen.';
  }
  
  function showNoTrailerMessage(animeTitle) {
    trailerPlayer.innerHTML = `
      <div class="trailer-loading">
        <div style="font-size: 64px; color: var(--muted); margin-bottom: 20px;">😔</div>
        <h3 style="color: var(--text); font-weight: 600; margin-bottom: 12px;">Wir finden keinen Trailer</h3>
        <p style="color: var(--muted); font-size: 16px; line-height: 1.5;">
          Für <strong>${animeTitle}</strong> konnten wir leider keinen offiziellen Trailer in unserer Datenbank finden.
        </p>
        <div style="margin-top: 20px; padding: 16px; background: var(--card); border-radius: 12px; border: 1px solid var(--border);">
          <p style="color: var(--text); font-size: 14px; margin: 0;">
            🔍 <strong>Sorry!</strong> Suche ihn selbst, falls es einen gibt! Versuche es auf YouTube oder anderen Plattformen.
          </p>
        </div>
      </div>
    `;
    trailerAnimeDescription.textContent = `Kein Trailer für ${animeTitle} gefunden - bitte selbst suchen!`;
  }
  
  function closeAnimeTrailerModal() {
    animeTrailerModal.style.display = 'none';
    // Clear the iframe to stop video playback
    trailerPlayer.innerHTML = '';
  }
  
  async function checkTrailerAvailability(animeId) {
    if (!animeId || animeId === '0') return false;
    
    try {
      // Quick check with AniList
      const anilistQuery = `
        query ($id: Int) {
          Media(id: $id) {
            trailer {
              id
              site
            }
          }
        }
      `;
      
      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: anilistQuery,
          variables: { id: parseInt(animeId) }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.Media && data.data.Media.trailer && data.data.Media.trailer.id) {
          return true;
        }
      }
    } catch (error) {
      // Continue to Jikan check
    }
    
    // Fallback to Jikan API
    try {
      const response = await fetch(`${API_BASE}/anime/${animeId}`);
      if (response.ok) {
        const data = await response.json();
        return data.data && data.data.trailer && data.data.trailer.youtube_id;
      }
    } catch (error) {
      // Ignore errors
    }
    
    return false;
  }
  
  // Simplified trailer check - only check by ID to reduce API calls and errors
  async function checkTrailerAvailabilityWithFallback(animeId, animeTitle) {
    // Only check if we have a valid ID to avoid excessive API calls
    if (animeId && animeId !== '0') {
      try {
        return await checkTrailerAvailability(animeId);
      } catch (error) {
        console.warn('Trailer availability check failed:', error);
        return false;
      }
    }
    
    // For animes without ID, don't check to avoid errors
    return false;
  }
  
  // Removed searchTrailerByTitle function to reduce API calls and potential errors
  
  // Rating Functions
  function openRatingModal(card) {
    const currentRating = card.dataset.rating || '0';
    const currentReview = card.dataset.review || '';
    
    // Set current rating
    ratingStars.querySelectorAll('.star').forEach((star, index) => {
      if (index < parseInt(currentRating)) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
    
    ratingReview.value = currentReview;
    ratingText.textContent = currentRating > 0 ? `${currentRating}/10` : 'Bewertung auswählen';
    ratingRemove.style.display = currentRating > 0 ? 'inline-block' : 'none';
    
    ratingModal.style.display = 'flex';
    ratingModal.dataset.cardId = card.dataset.id;
  }
  
  function closeRatingModal() {
    ratingModal.style.display = 'none';
    ratingStars.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
    ratingReview.value = '';
    ratingText.textContent = 'Bewertung auswählen';
    ratingModal.dataset.cardId = '';
    ratingRemove.style.display = 'none';
  }
  
  function saveRating() {
    const cardId = ratingModal.dataset.cardId;
    const rating = ratingStars.querySelectorAll('.star.active').length;
    const review = ratingReview.value.trim();
    
    if (rating === 0) {
      setMessage('Bitte wähle eine Bewertung aus.', 'error');
      return;
    }
    
    // Find the card and update it
    const allCards = document.querySelectorAll('.card');
    for (const card of allCards) {
      if (card.dataset.id === cardId) {
        card.dataset.rating = rating;
        card.dataset.review = review;
        
        // Update or create rating display
        updateRatingDisplay(card, rating);
        
        setMessage('Bewertung gespeichert!', 'success');
        break;
      }
    }
    
    closeRatingModal();
    saveAll();
    updateStats();
  }
  
  function removeRating() {
    const cardId = ratingModal.dataset.cardId;
    
    // Find the card and remove rating
    const allCards = document.querySelectorAll('.card');
    for (const card of allCards) {
      if (card.dataset.id === cardId) {
        delete card.dataset.rating;
        delete card.dataset.review;
        
        // Remove rating display
        const ratingDisplay = card.querySelector('.rating-display');
        if (ratingDisplay) {
          ratingDisplay.remove();
        }
        
        setMessage('Bewertung entfernt!', 'success');
        break;
      }
    }
    
    closeRatingModal();
    saveAll();
    updateStats();
  }
  
  function updateRatingDisplay(card, rating) {
    // Remove existing rating display
    const existingDisplay = card.querySelector('.rating-display');
    if (existingDisplay) {
      existingDisplay.remove();
    }
    
    if (rating > 0) {
      const ratingDisplay = document.createElement('div');
      ratingDisplay.className = 'rating-display';
      
      const review = card.dataset.review || '';
      const progress = (rating / 10) * 100;
      
      // Create star display
      const stars = '⭐'.repeat(Math.min(rating, 5));
      const starElements = stars.split('').map((star, index) => 
        `<span class="rating-star" style="animation-delay: ${index * 0.1}s">${star}</span>`
      ).join('');
      
      // Create 10 stars in 2 rows of 5 stars each
      const filledStars = '⭐'.repeat(Math.min(rating, 10));
      const emptyStars = '☆'.repeat(Math.max(0, 10 - rating));
      const allStars = filledStars + emptyStars;
      
      // Split into two rows of 5 stars each
      const firstRow = allStars.substring(0, 5);
      const secondRow = allStars.substring(5, 10);
      
      ratingDisplay.innerHTML = `
        <div class="rating-text">${rating}/10</div>
        <div class="rating-stars-10">
          <div class="star-row">${firstRow}</div>
          <div class="star-row">${secondRow}</div>
        </div>
        ${review ? `<div class="rating-review">"${review}"</div>` : ''}
      `;
      
      // Insert before link container
      const linkContainer = card.querySelector('.link-container');
      if (linkContainer) {
        card.insertBefore(ratingDisplay, linkContainer);
      } else {
        card.appendChild(ratingDisplay);
      }
      
      // No progress bar animation needed for 10-star system
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
      const rating = card.dataset.rating ? parseInt(card.dataset.rating) : null;
      const review = card.dataset.review || null;
      return { id, title, image: cover, url, termin, rating, review };
    });
  }
  
  function saveAll() {
    const data = {
      plan: serializeList('plan'),
      watched: serializeList('watched'),
      waiting: serializeList('waiting'),
      fsk: serializeList('fsk'),
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
      fsk: serializeList('fsk'),
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
        ['plan', 'watched', 'waiting', 'fsk'].forEach(key => {
          grids[key].innerHTML = '';
        });
        
        // Restore data
        ['plan', 'watched', 'waiting', 'fsk'].forEach(key => {
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
        const totalAnimes = (data.plan?.length || 0) + (data.watched?.length || 0) + (data.waiting?.length || 0) + (data.fsk?.length || 0);
        setMessage(`Backup erfolgreich wiederhergestellt! ${totalAnimes} Animes geladen.`, 'success');
        
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
      ['plan', 'watched', 'waiting', 'fsk'].forEach(key => {
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
    ['plan', 'watched', 'waiting', 'fsk'].forEach(key => {
      grids[key].innerHTML = '';
    });
    
    // Load Firebase data
    ['plan', 'watched', 'waiting', 'fsk'].forEach(key => {
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
    
    // Remove all theme classes
    root.classList.remove('theme-light', 'theme-neon', 'theme-retro');
    
    // Apply the selected theme
    if (theme === 'light') {
      root.classList.add('theme-light');
      if (themeToggle) themeToggle.textContent = '☀️';
    } else if (theme === 'neon') {
      root.classList.add('theme-neon');
      if (themeToggle) themeToggle.textContent = '⚡';
    } else if (theme === 'retro') {
      root.classList.add('theme-retro');
      if (themeToggle) themeToggle.textContent = '🎨';
    } else {
      // Default dark theme
      if (themeToggle) themeToggle.textContent = '🌙';
    }
  }
  
  function updateStats() {
    const planItems = grids.plan.children.length;
    const watchedItems = grids.watched.children.length;
    const waitingItems = grids.waiting.children.length;
    const fskItems = grids.fsk.children.length;
    const totalItems = planItems + watchedItems + waitingItems + fskItems;
    
    totalCount.textContent = totalItems;
    planCount.textContent = planItems;
    watchedCount.textContent = watchedItems;
    waitingCount.textContent = waitingItems;
    fskCount.textContent = fskItems;
  }
  
  function getPreferredTheme() {
    const saved = localStorage.getItem('animes-theme');
    if (saved === 'light' || saved === 'dark' || saved === 'neon' || saved === 'retro') return saved;
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
  
  function toggleTheme() {
    const themes = ['dark', 'light', 'neon', 'retro'];
    const current = document.documentElement.classList.contains('theme-light') ? 'light' : 
                   document.documentElement.classList.contains('theme-neon') ? 'neon' :
                   document.documentElement.classList.contains('theme-retro') ? 'retro' : 'dark';
    
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    const next = themes[nextIndex];
    
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
    if (e.key === 'Escape' && animeDetailsModal.style.display === 'flex') closeAnimeDetailsModal();
    if (e.key === 'Escape' && animeTrailerModal.style.display === 'flex') closeAnimeTrailerModal();
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
  
  // Help handlers
  if (helpBtn) helpBtn.addEventListener('click', () => helpModal.style.display = 'flex');
  if (helpClose) helpClose.addEventListener('click', () => helpModal.style.display = 'none');
  if (helpModal) helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) helpModal.style.display = 'none';
  });
  
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
  
  // Rating handlers
  if (ratingClose) ratingClose.addEventListener('click', closeRatingModal);
  if (ratingCancel) ratingCancel.addEventListener('click', closeRatingModal);
  if (ratingSave) ratingSave.addEventListener('click', saveRating);
  if (ratingRemove) ratingRemove.addEventListener('click', removeRating);
  if (ratingModal) ratingModal.addEventListener('click', (e) => {
    if (e.target === ratingModal) closeRatingModal();
  });
  
  // Rating stars interaction
  if (ratingStars) {
    ratingStars.addEventListener('click', (e) => {
      if (e.target.classList.contains('star')) {
        const rating = parseInt(e.target.dataset.rating);
        ratingStars.querySelectorAll('.star').forEach((star, index) => {
          if (index < rating) {
            star.classList.add('active');
          } else {
            star.classList.remove('active');
          }
        });
        ratingText.textContent = `${rating}/10`;
      }
    });
    
    ratingStars.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('star')) {
        const rating = parseInt(e.target.dataset.rating);
        ratingStars.querySelectorAll('.star').forEach((star, index) => {
          if (index < rating) {
            star.classList.add('hover');
          } else {
            star.classList.remove('hover');
          }
        });
      }
    });
    
    ratingStars.addEventListener('mouseout', () => {
      ratingStars.querySelectorAll('.star').forEach(star => {
        star.classList.remove('hover');
      });
    });
  }
  
  
  // Termin handlers
  if (terminClose) terminClose.addEventListener('click', closeTerminModal);
  if (terminCancel) terminCancel.addEventListener('click', closeTerminModal);
  if (terminSave) terminSave.addEventListener('click', saveTermin);
  if (terminRemove) terminRemove.addEventListener('click', removeTermin);
  if (terminType) terminType.addEventListener('change', updateTerminFieldsVisibility);
  if (terminModal) terminModal.addEventListener('click', (e) => {
    if (e.target === terminModal) closeTerminModal();
  });
  
  // Anime Details Modal handlers
  if (animeDetailsClose) animeDetailsClose.addEventListener('click', closeAnimeDetailsModal);
  if (animeDetailsModal) animeDetailsModal.addEventListener('click', (e) => {
    if (e.target === animeDetailsModal) closeAnimeDetailsModal();
  });
  
  // Anime Trailer Modal handlers
  if (trailerClose) trailerClose.addEventListener('click', closeAnimeTrailerModal);
  if (animeTrailerModal) animeTrailerModal.addEventListener('click', (e) => {
    if (e.target === animeTrailerModal) closeAnimeTrailerModal();
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
  
