// Elementos dos modais
const modalLer = document.getElementById('modal-ler');
const modalPersonagens = document.getElementById('modal-personagens');
const modalArtes = document.getElementById('modal-artes');
const modalMusicas = document.getElementById('modal-musicas');
const modalImage = document.getElementById('modal-image');
const modalCharacter = document.getElementById('modal-character');

let selectedVolume = null;
let selectedChapter = null;
let selectedFile = null;
let selectedArtworkType = 'all';
let selectedArtworkSearch = '';



let fireAudioContext;

function playFireSound(type = 'click') {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!fireAudioContext) {
        fireAudioContext = new AudioCtx();
    }

    if (fireAudioContext.state === 'suspended') {
        fireAudioContext.resume();
    }

    const now = fireAudioContext.currentTime;
    const osc = fireAudioContext.createOscillator();
    const gain = fireAudioContext.createGain();

    const profiles = {
        click: { start: 720, end: 320, wave: 'triangle', gain: 0.045, duration: 0.09 },
        open: { start: 480, end: 880, wave: 'sine', gain: 0.06, duration: 0.16 },
        close: { start: 720, end: 220, wave: 'square', gain: 0.04, duration: 0.14 },
        tab: { start: 350, end: 620, wave: 'triangle', gain: 0.03, duration: 0.12 }
    };

    const config = profiles[type] || profiles.click;

    osc.type = config.wave;
    osc.frequency.setValueAtTime(config.start, now);
    osc.frequency.exponentialRampToValueAtTime(config.end, now + config.duration);

    gain.gain.setValueAtTime(config.gain, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + config.duration);

    osc.connect(gain);
    gain.connect(fireAudioContext.destination);
    osc.start(now);
    osc.stop(now + config.duration);
}

function initEmberParticles() {
    const canvas = document.getElementById('embers-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const maxParticles = 180;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        const fromBottom = Math.random() > 0.35;
        return {
            x: Math.random() * canvas.width,
            y: fromBottom ? canvas.height + Math.random() * 80 : Math.random() * canvas.height,
            size: Math.random() * 2.8 + 0.7,
            speedY: Math.random() * -1.3 - 0.25,
            speedX: (Math.random() - 0.5) * 0.65,
            alpha: Math.random() * 0.7 + 0.2,
            hue: Math.random() > 0.45 ? 24 : 46,
            life: Math.random() * 260 + 140
        };
    }

    function drawParticle(p) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
        ctx.shadowColor = p.hue === 24 ? 'rgba(255, 92, 20, 0.85)' : 'rgba(255, 214, 88, 0.8)';
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (particles.length < maxParticles) {
            particles.push(createParticle());
        }

        particles.forEach((p, index) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 1;
            p.alpha *= 0.996;

            if (p.life <= 0 || p.y < -20 || p.alpha < 0.04) {
                particles[index] = createParticle();
            }

            drawParticle(particles[index]);
        });

        requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

const artTypeLabels = {
    all: 'Todas',
    'concept art': 'Concept Art',
    'fan art': 'Fan Art',
    'arte oficial': 'Arte Oficial'
};

// Renderizar capítulos para volume (mantido igual)
function renderChaptersForVolume(volumeNumber) {
    const chapterSelection = document.getElementById('chapter-selection');
    chapterSelection.innerHTML = '';
    
    const volume = chaptersData.volumes.find(v => v.volume == volumeNumber);
    if (!volume) return;
    
    volume.chapters.forEach(chapter => {
        const btn = document.createElement('div');
        btn.className = `chapter-btn ${chapter.available ? '' : 'disabled'}`;
        btn.setAttribute('data-chapter', chapter.chapter);
        btn.setAttribute('data-file', chapter.file);
        btn.innerHTML = `
            ${chapter.title}
            ${!chapter.available ? '<br><small>(Indisponível)</small>' : ''}
        `;
        
        if (chapter.available) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedChapter = chapter.chapter;
                selectedFile = chapter.file;
                updateReadButton();
            });
        }
        
        chapterSelection.appendChild(btn);
    });
    
    selectedChapter = null;
    selectedFile = null;
    updateReadButton();
}   

// Função para abrir modal CORRIGIDA
function openModal(modal) {
    playFireSound('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Adicionar classe active para animação
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Função para fechar modal CORRIGIDA
function closeModal(modal) {
    playFireSound('close');
    modal.classList.remove('active');
    
    // Esperar a animação terminar antes de esconder
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Inicializar a aplicação
function init() {
    console.log('Inicializando aplicação...');
    
    // Configurar event listeners
    setupEventListeners();
    initEmberParticles();
    renderCharacters();
    renderArtworkTypeFilters();
    renderArtworks();
    renderMusic();
    renderChapters();
}

// Configurar event listeners - VERSÃO CORRIGIDA
function setupEventListeners() {
    console.log('Configurando event listeners...');

    document.addEventListener('click', function () {
        playFireSound('click');
    });

    document.addEventListener('visibilitychange', function () {
        playFireSound('tab');
    });

    // Abrir modais dos botões principais
    document.getElementById('btn-ler').addEventListener('click', function() {
        openModal(document.getElementById('modal-ler'));
    });

    document.getElementById('btn-personagens').addEventListener('click', function() {
        openModal(document.getElementById('modal-personagens'));
    });

    document.getElementById('btn-artes').addEventListener('click', function() {
        openModal(document.getElementById('modal-artes'));
    });

    document.getElementById('btn-musicas').addEventListener('click', function() {
        openModal(document.getElementById('modal-musicas'));
    });

    // Fechar modais quando clicar no X
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Fechar modal quando clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(modal);
            }
        });
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Abrir modais do menu de navegação
    document.getElementById('nav-ler').addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('modal-ler'));
    });

    document.getElementById('nav-personagens').addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('modal-personagens'));
    });

    document.getElementById('nav-extras').addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('modal-artes'));
    });

    // Copiar tag do Discord
    document.getElementById('copiar-discord').addEventListener('click', function() {
        const tag = document.getElementById('discord-tag');
        tag.select();
        tag.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(tag.value).then(() => {
            const msg = document.getElementById('copy-msg');
            msg.style.opacity = '1';
            setTimeout(() => {
                msg.style.opacity = '0';
            }, 2000);
        });
    });

    // Pesquisa da galeria de artes
    const artSearch = document.getElementById('art-search');
    if (artSearch) {
        artSearch.addEventListener('input', function() {
            selectedArtworkSearch = this.value;
            renderArtworks();
        });
    }

    // Abrir modal de contato
    document.querySelector('.curiosities-cta .cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('modal-contato'));
    });
}

// Configurar event listeners robustos
// Configurar event listeners robustos (NOVA VERSÃO 100% ESTÁVEL)
function setupRobustEventListeners() {
    console.log('Configurando event listeners (versão otimizada)...');

    // Delegação global para todos os botões de abertura de modal
    document.addEventListener('click', function (e) {
        const target = e.target;

        // CTA Ler
        if (target.closest('#cta-ler')) {
            console.log('CTA Ler clicado');
            openModal(modalLer);
            return;
        }

        // Botão Ler
        if (target.closest('#btn-ler')) {
            console.log('Botão Ler clicado');
            openModal(modalLer);
            return;
        }

        // Personagens
        if (target.closest('#btn-personagens')) {
            console.log('Botão Personagens clicado');
            openModal(modalPersonagens);
            return;
        }

        // Artes
        if (target.closest('#btn-artes')) {
            console.log('Botão Artes clicado');
            openModal(modalArtes);
            return;
        }

        // Músicas
        if (target.closest('#btn-musicas')) {
            console.log('Botão Músicas clicado');
            openModal(modalMusicas);
            return;
        }

        // Nav Ler
        if (target.closest('#nav-ler')) {
            console.log('Nav Ler clicado');
            e.preventDefault();
            openModal(modalLer);
            return;
        }

        // Nav Personagens
        if (target.closest('#nav-personagens')) {
            console.log('Nav Personagens clicado');
            e.preventDefault();
            openModal(modalPersonagens);
            return;
        }

        // Nav Extras (vai para Artes)
        if (target.closest('#nav-extras')) {
            console.log('Nav Extras clicado');
            e.preventDefault();
            openModal(modalArtes);
            return;
        }

        // Fechar modal ao clicar no "X"
        if (target.classList.contains('close-modal')) {
            const modal = target.closest('.modal');
            console.log('Fechando modal via botão');
            closeModal(modal);
            return;
        }

        // Fechar modal ao clicar fora
        if (target.classList.contains('modal')) {
            console.log('Fechando modal ao clicar fora');
            closeModal(target);
            return;
        }
    });
}


// Renderizar personagens (mantido igual)
function renderCharacters() {
    const characterGrid = document.getElementById('character-grid');
    characterGrid.innerHTML = '';
    
    Object.keys(characters).forEach(key => {
        const character = characters[key];
        const card = document.createElement('div');
        card.className = 'character-card';
        card.setAttribute('data-character', key);
        card.innerHTML = `
            <div class="character-img" style="background-image: url('${character.portrait}');"></div>
            <div class="character-info">
                <div class="character-name">${character.name}</div>
                <p>${character.description.substring(0, 100)}...</p>
            </div>
        `;
        characterGrid.appendChild(card);
        
        card.addEventListener('click', function() {
            openCharacterSheet(key);
        });
    });
    
    // Pesquisa
    document.getElementById('character-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const characterCards = document.querySelectorAll('.character-card');
        
        characterCards.forEach(card => {
            const name = card.querySelector('.character-name').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Utilitários de tipo de arte
function normalizeArtType(type) {
    return (type || '').toString().trim().toLowerCase();
}

function getArtTypeLabel(type) {
    return artTypeLabels[type] || type;
}

function getFilteredArtworksByType(items, type) {
    if (type === 'all') return items;
    return items.filter((art) => normalizeArtType(art.artType) === type);
}

function getFilteredArtworksBySearch(items, searchTerm) {
    const term = (searchTerm || '').toLowerCase().trim();
    if (!term) return items;

    return items.filter((art) => {
        const text = `${art.title || ''} ${art.description || ''} ${art.artist || ''}`.toLowerCase();
        return text.includes(term);
    });
}

function renderArtworkTypeFilters() {
    const filtersContainer = document.getElementById('art-filters');
    if (!filtersContainer) return;

    const filterTypes = ['all', 'concept art', 'fan art', 'arte oficial'];
    filtersContainer.innerHTML = filterTypes.map((type) => `
        <button type="button" class="art-filter-btn ${selectedArtworkType === type ? 'active' : ''}" data-art-type="${type}">
            ${getArtTypeLabel(type)}
        </button>
    `).join('');

    filtersContainer.querySelectorAll('.art-filter-btn').forEach((button) => {
        button.addEventListener('click', () => {
            selectedArtworkType = button.dataset.artType;
            renderArtworkTypeFilters();
            renderArtworks();
        });
    });
}

// Renderizar artes - ATUALIZADO
function renderArtworks() {
    const galleryGrid = document.getElementById('gallery-grid');

    if (!galleryGrid) {
        console.error('Elemento #gallery-grid não encontrado!');
        return;
    }

    galleryGrid.innerHTML = '';

    if (!artworks || artworks.length === 0) {
        galleryGrid.innerHTML = '<p class="no-artworks" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Nenhuma arte disponível no momento.</p>';
        return;
    }

    const artworksByType = getFilteredArtworksByType(artworks, selectedArtworkType);
    const filteredArtworks = getFilteredArtworksBySearch(artworksByType, selectedArtworkSearch);

    if (filteredArtworks.length === 0) {
        galleryGrid.innerHTML = '<p class="no-artworks" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Nenhuma arte encontrada para os filtros atuais.</p>';
        return;
    }

    filteredArtworks.forEach(art => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        item.innerHTML = `
            <div class="gallery-img" 
                 style="background-image: url('${art.image}')"
                 data-image="${art.image}">
                <div class="image-loading">Carregando...</div>
            </div>
            <div class="gallery-info">
                <div class="gallery-title" title="${art.title}">${art.title}</div>
                <div class="gallery-year">${art.year}</div>
                <div class="gallery-artist" style="font-size: 0.8rem; color: #aaa; margin-top: 5px;">${art.artist}</div>
                <div class="gallery-art-type">${getArtTypeLabel(normalizeArtType(art.artType))}</div>
            </div>
        `;

        item.dataset.image = art.image;
        item.dataset.title = art.title;
        item.dataset.description = art.description;
        item.dataset.year = art.year;
        item.dataset.artist = art.artist;

        galleryGrid.appendChild(item);

        const img = new Image();
        img.src = art.image;
        img.onload = function() {
            const loadingDiv = item.querySelector('.image-loading');
            if (loadingDiv) {
                loadingDiv.style.display = 'none';
            }
        };
        img.onerror = function() {
            console.error(`Erro ao carregar imagem: ${art.image}`);
            const imgDiv = item.querySelector('.gallery-img');
            if (imgDiv) {
                imgDiv.style.backgroundImage = "url('assets/images/placeholder.png')";
                imgDiv.style.backgroundSize = 'cover';
            }
        };

        item.addEventListener('click', function() {
            const imageUrl = this.dataset.image;
            const title = this.dataset.title;
            const description = this.dataset.description;
            const year = this.dataset.year;
            const artist = this.dataset.artist;

            if (typeof openImageModal === 'function') {
                openImageModal(imageUrl, title, description, year, artist);
            } else {
                console.warn('Função openImageModal não encontrada!');
                window.open(imageUrl, '_blank');
            }
        });
    });

    console.log(`✅ ${filteredArtworks.length} artes renderizadas na galeria.`);
}

// Renderizar músicas (mantido igual)
function renderMusic() {
    const musicGrid = document.getElementById('music-grid');
    musicGrid.innerHTML = '';
    
    musicTracks.forEach(track => {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.setAttribute('data-url', track.url);
        card.innerHTML = `
            <div class="music-thumb" style="background-image: url('${track.thumbnail}');">
                <div class="music-play">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="music-info">
                <div class="music-title">${track.title}</div>
                <div class="music-desc">${track.description}</div>
            </div>
        `;
        musicGrid.appendChild(card);
        
        card.addEventListener('click', function() {
            const youtubeUrl = this.getAttribute('data-url');
            window.open(youtubeUrl, '_blank');
        });
    });
}

// Renderizar capítulos (mantido igual)
function renderChapters() {
    const modalLerBody = document.getElementById('modal-ler-body');
    modalLerBody.innerHTML = `
        <div class="selection-title">Selecione o Volume:</div>
        <div class="volume-selection" id="volume-selection"></div>
        
        <div class="selection-title" style="margin-top: 30px;">Selecione o Capítulo:</div>
        <div class="chapter-selection" id="chapter-selection"></div>
        
        <button class="read-btn" id="confirm-read" disabled>Ler Capítulo</button>
    `;
    
    // Renderizar volumes
    const volumeSelection = document.getElementById('volume-selection');
    chaptersData.volumes.forEach(volume => {
        const btn = document.createElement('div');
        btn.className = `volume-btn ${volume.available ? '' : 'disabled'}`;
        btn.setAttribute('data-volume', volume.volume);
        btn.innerHTML = `
            Volume ${volume.volume}
            ${!volume.available ? '<br><small>(Em breve)</small>' : ''}
        `;
        
        if (volume.available) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.volume-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedVolume = volume.volume;
                renderChaptersForVolume(volume.volume);
                updateReadButton();
            });
        }
        
        volumeSelection.appendChild(btn);
    });
    
    // Botão de leitura
    document.getElementById('confirm-read').addEventListener('click', function() {
        if (selectedVolume && selectedChapter && selectedFile) {
            const pdfPath = `./posts/volume${selectedVolume}/${selectedFile}`;
            window.open(pdfPath, '_blank');
            closeModal(document.getElementById('modal-ler'));
        }
    });
}



// Atualizar botão de leitura (mantido igual)
function updateReadButton() {
    const confirmRead = document.getElementById('confirm-read');
    if (selectedVolume && selectedChapter && selectedFile) {
        confirmRead.disabled = false;
    } else {
        confirmRead.disabled = true;
    }
}


function normalizeTag(tag) {
    return (tag || '').toString().trim().toLowerCase();
}

function getCharacterGalleryItems(character) {
    const characterTag = normalizeTag(character.tag);
    if (!characterTag) return [];

    return artworks.filter((art) => {
        if (!Array.isArray(art.tags)) return false;
        return art.tags.map(normalizeTag).includes(characterTag);
    });
}

function renderCharacterGallery(items) {
    if (!items.length) {
        return `
            <div class="character-gallery-empty">
                <i class="fas fa-image"></i>
                <p>Nenhuma arte associada a este personagem ainda.</p>
            </div>
        `;
    }

    const filterTypes = ['all', 'concept art', 'fan art', 'arte oficial'];

    return `
        <div class="character-art-filters">
            ${filterTypes.map((type) => `
                <button class="character-art-filter-btn ${type === 'all' ? 'active' : ''}" type="button" data-art-type="${type}">
                    ${getArtTypeLabel(type)}
                </button>
            `).join('')}
        </div>

        <div class="search-bar character-gallery-search-bar">
            <input type="text" class="character-art-search" placeholder="Pesquisar artes deste personagem...">
        </div>

        <div class="character-gallery-grid">
            ${items.map((art) => `
                <button class="character-gallery-item" type="button"
                    data-image="${art.image}"
                    data-title="${art.title}"
                    data-description="${art.description}"
                    data-year="${art.year}"
                    data-artist="${art.artist}"
                    data-art-type="${normalizeArtType(art.artType)}">
                    <div class="character-gallery-thumb" style="background-image: url('${art.image}')"></div>
                    <div class="character-gallery-meta">
                        <div class="character-gallery-title">${art.title}</div>
                        <div class="character-gallery-subtitle">${art.year} • ${art.artist}</div>
                        <div class="character-gallery-type">${getArtTypeLabel(normalizeArtType(art.artType))}</div>
                    </div>
                </button>
            `).join('')}
        </div>
    `;
}

function setupCharacterSheetTabs(sheet) {
    const tabButtons = sheet.querySelectorAll('.character-tab-btn');
    const panes = sheet.querySelectorAll('.character-tab-pane');

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetPane = btn.getAttribute('data-tab-target');

            tabButtons.forEach((item) => item.classList.remove('active'));
            panes.forEach((pane) => pane.classList.remove('active'));

            btn.classList.add('active');
            const pane = sheet.querySelector(`.character-tab-pane[data-tab-pane="${targetPane}"]`);
            if (pane) pane.classList.add('active');
        });
    });

    const characterGalleryItems = sheet.querySelectorAll('.character-gallery-item');
    const characterGalleryEmpty = sheet.querySelector('.character-gallery-empty');

    let selectedCharacterArtworkType = 'all';
    let selectedCharacterArtworkSearch = '';

    function applyCharacterGalleryFilters() {
        let visibleCount = 0;

        characterGalleryItems.forEach((item) => {
            const itemType = item.dataset.artType;
            const haystack = `${item.dataset.title || ''} ${item.dataset.description || ''} ${item.dataset.artist || ''}`.toLowerCase();
            const matchesType = selectedCharacterArtworkType === 'all' || itemType === selectedCharacterArtworkType;
            const matchesSearch = !selectedCharacterArtworkSearch || haystack.includes(selectedCharacterArtworkSearch);
            const shouldShow = matchesType && matchesSearch;
            item.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) visibleCount += 1;
        });

        if (characterGalleryEmpty) {
            characterGalleryEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
            characterGalleryEmpty.querySelector('p').textContent = 'Nenhuma arte encontrada para os filtros atuais.';
        }
    }

    sheet.querySelectorAll('.character-art-filter-btn').forEach((button) => {
        button.addEventListener('click', () => {
            selectedCharacterArtworkType = button.dataset.artType;

            sheet.querySelectorAll('.character-art-filter-btn').forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            applyCharacterGalleryFilters();
        });
    });

    const characterArtSearch = sheet.querySelector('.character-art-search');
    if (characterArtSearch) {
        characterArtSearch.addEventListener('input', function() {
            selectedCharacterArtworkSearch = this.value.toLowerCase().trim();
            applyCharacterGalleryFilters();
        });
    }

    sheet.querySelectorAll('.character-gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            openImageModal(
                item.dataset.image,
                item.dataset.title,
                item.dataset.description,
                item.dataset.year,
                item.dataset.artist
            );
        });
    });

    applyCharacterGalleryFilters();
}

function openCharacterSheet(characterId) {
    const character = characters[characterId];

    if (character) {
        document.getElementById('character-modal-title').textContent = character.name;

        const sheet = document.getElementById('character-sheet');

        let statusClass = 'status-unknown';
        if (character.status && character.status.toLowerCase().includes('vivo')) {
            statusClass = 'status-alive';
        } else if (character.status && character.status.toLowerCase().includes('morto')) {
            statusClass = 'status-deceased';
        }

        let starChartHTML = '';
        if (character.stats) {
            starChartHTML = generateStarChart(character.stats, character.name);
        }

        const characterGalleryItems = getCharacterGalleryItems(character);

        sheet.innerHTML = `
            <div class="character-sheet-header">
                <h2>${character.name}</h2>
                <div class="character-role">${character.role || 'Personagem Principal'}</div>
            </div>

            <div class="character-photo-section">
                <div class="photo-frame">
                    <img src="${character.portrait}" alt="${character.name}">
                </div>
                <div class="photo-label">IDENTIFICAÇÃO OFICIAL</div>

                ${starChartHTML}

                <div class="character-basic-info">
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Nome Completo</div>
                            <div class="info-value">${character.fullName || character.name}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Idade</div>
                            <div class="info-value">${character.age}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Data de Nascimento</div>
                            <div class="info-value">${character.birthday || 'Desconhecida'}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Gênero</div>
                            <div class="info-value">${character.gender}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Altura</div>
                            <div class="info-value">${character.height}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Peso</div>
                            <div class="info-value">${character.weight}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Tipo Sanguíneo</div>
                            <div class="info-value">${character.bloodType || 'Desconhecido'}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value">
                                <span class="status-badge ${statusClass}">${character.status}</span>
                            </div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Codinome</div>
                            <div class="info-value">${character.codename || 'Nenhum'}</div>
                        </div>

                        <div class="info-item">
                            <div class="info-label">Usuário de Spirit?</div>
                            <div class="info-value">${character.spirit_user || 'Não'}</div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="character-content-section">
                <div class="character-tabs">
                    <button class="character-tab-btn active" type="button" data-tab-target="details">Ficha</button>
                    <button class="character-tab-btn" type="button" data-tab-target="gallery">Galeria</button>
                </div>

                <div class="character-tab-pane active" data-tab-pane="details">
                    <div class="character-details">
                        <div class="detail-section">
                            <h3><i class="fas fa-user"></i> Descrição Física</h3>
                            <p>${character.physicalDescription || character.description}</p>
                        </div>

                        <div class="detail-section">
                            <h3><i class="fas fa-brain"></i> Personalidade</h3>
                            <p>${character.personality}</p>
                        </div>

                        <div class="detail-section">
                            <h3><i class="fas fa-history"></i> Histórico</h3>
                            <p>${character.background}</p>
                        </div>

                        ${character.affiliation ? `
                        <div class="detail-section">
                            <h3><i class="fas fa-users"></i> Afiliação</h3>
                            <p>${character.affiliation}</p>
                        </div>
                        ` : ''}

                        ${character.occupation ? `
                        <div class="detail-section">
                            <h3><i class="fas fa-briefcase"></i> Ocupação</h3>
                            <p>${character.occupation}</p>
                        </div>
                        ` : ''}

                        <div class="detail-section">
                            <h3><i class="fas fa-fire"></i> Habilidades & Poderes</h3>
                            <div class="abilities-list">
                                ${character.abilities ? character.abilities.map(ability => `
                                    <span class="ability-tag">${ability}</span>
                                `).join('') : '<p>Nenhuma habilidade registrada</p>'}
                            </div>
                        </div>

                        ${character.relationships && character.relationships.length > 0 ? `
                        <div class="detail-section">
                            <h3><i class="fas fa-heart"></i> Relações</h3>
                            <div class="relationships-grid">
                                ${character.relationships.map(rel => `
                                    <div class="relationship-item">
                                        <div class="relationship-name">${rel.name}</div>
                                        <div class="relationship-type">${rel.relation}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}

                        ${character.trivia && character.trivia.length > 0 ? `
                        <div class="detail-section">
                            <h3><i class="fas fa-lightbulb"></i> Curiosidades</h3>
                            <ul class="trivia-list">
                                ${character.trivia.map(item => `
                                    <li>${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ` : ''}

                        ${character.quote ? `
                        <div class="detail-section" style="grid-column: 1 / -1; background: rgba(255, 107, 53, 0.1); border-color: #ff6b35;">
                            <h3><i class="fas fa-quote-left"></i> Citação Marcante</h3>
                            <p style="font-style: italic; font-size: 1.2rem; color: #ff6b35;">"${character.quote}"</p>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <div class="character-tab-pane" data-tab-pane="gallery">
                    <div class="character-gallery-header">
                        <h3><i class="fas fa-images"></i> Galeria de ${character.name}</h3>
                        <p>Artes associadas automaticamente pela tag: <strong>${character.tag || '-'}</strong></p>
                    </div>
                    ${renderCharacterGallery(characterGalleryItems)}
                </div>
            </div>
        `;

        closeModal(document.getElementById('modal-personagens'));
        openModal(document.getElementById('modal-character'));
        setupCharacterSheetTabs(sheet);

        setTimeout(() => {
            sheet.style.opacity = '1';
            sheet.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Função para gerar o gráfico de estrela (radar chart)
// Função para gerar o gráfico de estrela (radar chart) - ESCALA 0-10
function generateStarChart(stats, characterName) {
    const maxValue = 10; // Nova escala máxima
    const attributes = [
        { name: 'FORÇA', value: stats.forca || 0 },
        { name: 'AGILIDADE', value: stats.agilidade || 0 },
        { name: 'INTELECTO', value: stats.intelecto || 0 },
        { name: 'TENACIDADE', value: stats.tenacidade || 0 },
        { name: 'ESPÍRITO', value: stats.espirito || 0 }
    ];
    
    // Calcular os pontos para o polígono da estrela
    const centerX = 125;
    const centerY = 125;
    const maxRadius = 100;
    const numPoints = attributes.length;
    
    // Calcular pontos do polígono (agora dividindo por 10)
    let points = '';
    for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const radius = (attributes[i].value / maxValue) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points += `${x},${y} `;
    }
    
    // Calcular posições dos labels
    const labelPositions = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const radius = maxRadius + 30; // Um pouco mais longe do centro
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        labelPositions.push({ x, y, name: attributes[i].name, value: attributes[i].value });
    }
    
    // Gerar linhas de grade concêntricas (agora 10 níveis)
    let gridLines = '';
    for (let level = 1; level <= maxValue; level++) {
        let gridPoints = '';
        for (let i = 0; i < numPoints; i++) {
            const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
            const radius = (level / maxValue) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            gridPoints += `${x},${y} `;
        }
        gridLines += `<polygon class="star-grid-line" points="${gridPoints}" />`;
    }
    
    // Gerar linhas dos eixos
    let axisLines = '';
    for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const x = centerX + maxRadius * Math.cos(angle);
        const y = centerY + maxRadius * Math.sin(angle);
        axisLines += `<line class="star-axis-line" x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" />`;
    }
    
    // Calcular pontuação total
    const totalScore = attributes.reduce((sum, attr) => sum + attr.value, 0);
    const maxPossibleScore = maxValue * attributes.length;
    const percentageScore = Math.round((totalScore / maxPossibleScore) * 100);
    const averageScore = (totalScore / attributes.length).toFixed(1);
    const bestAttribute = [...attributes].sort((a, b) => b.value - a.value)[0];

    let powerRank = 'C';
    if (percentageScore >= 90) powerRank = 'S';
    else if (percentageScore >= 75) powerRank = 'A';
    else if (percentageScore >= 60) powerRank = 'B';
    else if (percentageScore >= 45) powerRank = 'C';
    else powerRank = 'D';

    return `
        <div class="star-chart-container">
            <div class="star-chart-title">ATRIBUTOS DO PERSONAGEM</div>
            
            <!-- Pontuação total -->
            <div class="total-score">
                <div class="score-label">PONTUAÇÃO TOTAL</div>
                <div class="score-value">${totalScore}/${maxPossibleScore} (${percentageScore}%)</div>
            </div>

            <div class="star-status-grid">
                <div class="star-status-card">
                    <span class="star-status-label">Rank de Poder</span>
                    <span class="star-status-value">${powerRank}</span>
                </div>
                <div class="star-status-card">
                    <span class="star-status-label">Maior Atributo</span>
                    <span class="star-status-value">${bestAttribute.name} ${bestAttribute.value}/${maxValue}</span>
                </div>
                <div class="star-status-card">
                    <span class="star-status-label">Média Geral</span>
                    <span class="star-status-value">${averageScore}/${maxValue}</span>
                </div>
            </div>
            
            <div class="star-chart">
                <svg class="star-svg" viewBox="0 0 250 250">
                    <!-- Fundo da estrela -->
                    <circle class="star-background" cx="125" cy="125" r="110" />
                    
                    <!-- Grades concêntricas -->
                    ${gridLines}
                    
                    <!-- Linhas dos eixos -->
                    ${axisLines}
                    
                    <!-- Polígono dos atributos -->
                    <polygon class="star-polygon" points="${points}" />
                    
                    <!-- Ponto central -->
                    <circle cx="125" cy="125" r="3" fill="#ff6b35" />
                    
                    <!-- Marcadores de nível -->
                    <text x="130" y="25" class="level-marker">10</text>
                    <text x="130" y="45" class="level-marker">8</text>
                    <text x="130" y="65" class="level-marker">6</text>
                    <text x="130" y="85" class="level-marker">4</text>
                    <text x="130" y="105" class="level-marker">2</text>
                </svg>
                
                <!-- Labels dos atributos -->
                ${labelPositions.map(pos => `
                    <div class="star-label" style="left: ${pos.x}px; top: ${pos.y}px;">
                        ${pos.name}
                        <span class="star-label-value">${pos.value}/${maxValue}</span>
                    </div>
                `).join('')}
            </div>
            
            <!-- Legenda com barras -->
            <div class="star-legend">
                ${attributes.map(attr => `
                    <div class="legend-item">
                        <span class="legend-name">${attr.name}</span>
                        <div class="legend-value">
                            <div class="legend-bar">
                                <div class="legend-fill" style="width: ${(attr.value / maxValue) * 100}%"></div>
                            </div>
                            <span class="legend-number">${attr.value}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Função auxiliar para inicializar animações do gráfico de estrela
function initStarChartAnimations() {
    // Animar barras da legenda
    setTimeout(() => {
        document.querySelectorAll('.legend-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
}

// Modifique a função openCharacterSheet para chamar a animação
// Adicione esta linha no final da função openCharacterSheet, após openModal(modalCharacter):
setTimeout(initStarChartAnimations, 300);

// ABRIR MODAL DE IMAGEM - COMPLETAMENTE REFEITO
function openImageModal(imageUrl, title, description, year, artist) {
    const modal = document.getElementById('modal-image');
    const expandedImage = document.getElementById('expanded-image');
    
    // Atualizar a imagem
    expandedImage.src = imageUrl;
    expandedImage.alt = title;
    
    // Remover info anterior se existir
    const existingInfo = modal.querySelector('.image-details');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Criar nova seção de detalhes
    const imageDetails = document.createElement('div');
    imageDetails.className = 'image-details';
    imageDetails.innerHTML = `
        <div class="image-details-content">
            <h3 class="image-title">${title}</h3>
            <p class="image-description">${description}</p>
            <div class="image-meta">
                <span class="image-meta-item"><i class="fas fa-calendar"></i> ${year}</span>
                <span class="image-meta-item"><i class="fas fa-user"></i> ${artist}</span>
            </div>
        </div>
    `;
    
    // Inserir após a imagem
    modal.querySelector('.modal-body').appendChild(imageDetails);
    
    // Abrir o modal
    openModal(modal);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

document.addEventListener('click', function(e) {
    const el = e.target.closest('[data-open-modal], .close-modal, .modal');

    if (!el) return;

    // Abrir modal
    if (el.matches('[data-open-modal]')) {
        const modalId = el.getAttribute('data-open-modal');
        const modalEl = document.getElementById(modalId);
        if (modalEl) openModal(modalEl);
        e.preventDefault();
        return;
    }

    // Fechar modal no X
    if (el.classList.contains('close-modal')) {
        const modal = el.closest('.modal');
        closeModal(modal);
        return;
    }

    // Fechar ao clicar fora
    if (el.classList.contains('modal')) {
        closeModal(el);
        return;
    }
});

// Abrir modal de contato
document.querySelector(".cta-button").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("modal-contato").style.display = "flex";
});

// Fechar modal de contato
document.querySelectorAll("#modal-contato .close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("modal-contato").style.display = "none";
    });
});

// Copiar tag do Discord
document.getElementById("copiar-discord").addEventListener("click", () => {
    const input = document.getElementById("discord-tag");
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);

    const msg = document.getElementById("copy-msg");
    msg.style.opacity = 1;
    setTimeout(() => msg.style.opacity = 0, 1500);
});

document.querySelectorAll(".modal-content").forEach(modal => {
    modal.addEventListener("click", (e) => {
        e.stopPropagation(); // impede que o clique feche o modal
    });
});

