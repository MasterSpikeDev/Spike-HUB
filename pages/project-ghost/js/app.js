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
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Adicionar classe active para animação
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Função para fechar modal CORRIGIDA
function closeModal(modal) {
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
    renderCharacters();
    renderArtworks();
    renderMusic();
    renderChapters();
}

// Configurar event listeners - VERSÃO CORRIGIDA
function setupEventListeners() {
    console.log('Configurando event listeners...');

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

// Renderizar artes - ATUALIZADO
function renderArtworks() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Verifica se o elemento existe
    if (!galleryGrid) {
        console.error('Elemento #gallery-grid não encontrado!');
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    // Verifica se há artes para renderizar
    if (!artworks || artworks.length === 0) {
        galleryGrid.innerHTML = '<p class="no-artworks" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Nenhuma arte disponível no momento.</p>';
        return;
    }
    
    artworks.forEach(art => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Cria o item com imagem otimizada
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
            </div>
        `;
        
        // Adiciona atributos para o modal
        item.dataset.image = art.image;
        item.dataset.title = art.title;
        item.dataset.description = art.description;
        item.dataset.year = art.year;
        item.dataset.artist = art.artist;
        
        galleryGrid.appendChild(item);
        
        // Pré-carrega a imagem para evitar flickering
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
        
        // Adiciona evento de clique para abrir modal
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
                // Fallback: abrir imagem em nova aba
                window.open(imageUrl, '_blank');
            }
        });
    });
    
    console.log(`✅ ${artworks.length} artes renderizadas na galeria.`);
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


function openCharacterSheet(characterId) {
    const character = characters[characterId];
    
    if (character) {
        document.getElementById('character-modal-title').textContent = character.name;
        
        const sheet = document.getElementById('character-sheet');
        
        // Determinar classe de status
        let statusClass = 'status-unknown';
        if (character.status && character.status.toLowerCase().includes('vivo')) {
            statusClass = 'status-alive';
        } else if (character.status && character.status.toLowerCase().includes('morto')) {
            statusClass = 'status-deceased';
        }
        
        // Gerar gráfico de estrela se existirem stats
        let starChartHTML = '';
        if (character.stats) {
            starChartHTML = generateStarChart(character.stats, character.name);
        }
        
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
        `;
        
        closeModal(document.getElementById('modal-personagens'));
        openModal(document.getElementById('modal-character'));
        
        // Adicionar animação de entrada
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
    
    return `
        <div class="star-chart-container">
            <div class="star-chart-title">ATRIBUTOS DO PERSONAGEM</div>
            
            <!-- Pontuação total -->
            <div class="total-score">
                <div class="score-label">PONTUAÇÃO TOTAL</div>
                <div class="score-value">${totalScore}/${maxPossibleScore} (${percentageScore}%)</div>
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

