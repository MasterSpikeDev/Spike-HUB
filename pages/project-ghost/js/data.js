// Dados dos personagens (expandidos)
const characters = {
    haruki: {
        name: "Haruki Takamatsu",
        portrait: "assets/images/arts/ficha-personagem/1.png",
        codename: "Ember Blade",
        spirit_user: "Sim",

        description:
            "Haruki Takamatsu, protagonista da história, é um estudante marcado pelo trauma da morte misteriosa de seus pais. Consumido pela perda e pela raiva, acaba se envolvendo em um ritual espiritual que o conecta ao mundo dos mortos, iniciando sua jornada em busca de vingança. Seus poderes são relacionados a chama, mas desenvolveu uma certa habilidade com a katana herdada de sua familia.",

        role: "Protagonista da História",
        age: "17 anos",
        height: "186 cm",
        weight: "73 kg",
        birthday: "18 de Junho",
        bloodType: "O-",
        gender: "Masculino",
        occupation: "Estudante",
        affiliation: "Golden Oak High School",
        status: "Vivo",

        abilities: [
            "Emissão de chamas",
            "Olho de Serpente",
            "Condução de calor",
            "Aura protetora de fogo",
            "Combustão espontânea",
            "Modo fúria da fênix",
        ],

        background:
            "Haruki cresceu em uma família tradicional japonesa. Tinha notas boas e era um aluno quieto, reservado e pouco sociável. Após a tragédia que atingiu sua família, tornou-se emocionalmente instável e mais propenso a explosões de raiva.",

        personality:
            "Determinado e obstinado, Haruki é guiado por um forte senso de justiça — distorcido pela dor. É impulsivo, intenso e carrega um coração puro tentando sobreviver à escuridão que cresce dentro dele. Seu caminho é uma constante luta entre humanidade e vingança.",

        relationships: [
            { name: "Fumiko Emi", relation: "Aliada" },
            { name: "Sônia Takamatsu", relation: "Avó / Responsável legal" },
            { name: "Shiatsu Takamatsu", relation: "Tio" }
        ],

        trivia: [
            "Desenvolveu aversão a escuridão após o incidente",
            "Seus olhos ficam avermelhados quando usa poderes de chama",
            "Tinha excelente desempenho acadêmico antes da tragédia",
            "Tem costume de comprar bebidas e salgadinhos prontos antes da aula",
            "Dificuldade de usar hashis, mesmo sendo japonês",
        ],

        stats: {
            forca: 5,
            agilidade: 4,
            intelecto: 7,
            tenacidade: 8,
            espirito: 9
        }
    },
    fumiko: {
        name: "Fumiko Emi",
        portrait: "assets/images/arts/ficha-personagem/2.png",

        description:
            "Estudante exemplar e reservada, mas secretamente líder da ''Divisão Fantasma'', um grupo que investiga atividades espirituais e combate usuários de Spirit envolvidos em crimes. Seu Spirit manifesta um arco luminoso capaz de ferir apenas entidades espirituais, tornando-a um dos maiores perigos para criaturas do outro lado. Contra humanos, porém, é vulnerável — por isso Fumiko treina artes marciais, possui mira extraordinária e carrega a pistola de seu falecido irmão como símbolo e proteção.",

        spirit_user: "Sim",

        role: "Líder da Divisão Fantasma",
        codename: "Scarlet",

        age: "18 anos",
        height: "180 cm",
        weight: "62 kg",
        birthday: "19 de Janeiro",
        bloodType: "A+",
        gender: "Feminino",
        occupation: "Estudante",
        affiliation: "Golden Oak High School",
        status: "Vivo",

        abilities: [
            "Absorção de luz",
            "Mira aguçada",
            "Arco de luz",
            "Modo Fúria da Amaterasu Ōmikami"
        ],

        background:
            "Fumiko levava uma vida pacata até perder os pais em um acidente de carro. Criada por seu irmão mais velho, um policial, aprendeu noções de tiro, defesa pessoal e, acima de tudo, senso de justiça. Anos depois, testemunhou o assassinato dele por mafiosos — uma tragédia que a marcou para sempre. Fugindo por pouco com vida, Fumiko jurou dedicar sua própria existência a impedir que outras pessoas vivam o que ela viveu. Em busca de força, selou um pacto com um Spirit de luz. Hoje, sua cabeça é valiosa tanto para criminosos quanto para certos usuários de Spirit, embora poucos tenham coragem de atacá-la devido ao poder devastador que seu Spirit exerce sobre entidades espirituais.",

        personality:
            "Animada e confiante, com uma determinação quase inabalável. Apesar da postura gentil no dia a dia, durante missões assume uma seriedade fria e altamente profissional. É responsável, pontual e perfeccionista — qualidades que a tornam uma líder natural.",

        relationships: [
            { name: "Haruki Takamatsu", relation: "Aliado" },
            { name: "???", relation: "Aliado" },
            { name: "???", relation: "Aliado" },
            { name: "???", relation: "Aliado" },
            { name: "???", relation: "Aliada" }
        ],

        trivia: [
            "Sempre carrega um caderno onde registra padrões espirituais e atividades suspeitas.",
            "Apesar de ser estrategista brilhante, é terrível na cozinha — costuma queimar até arroz.",
            "Quando nervosa, enrola uma mecha de cabelo repetidamente.",
            "Prefere estudar em cafeterias, pois odeia silêncio absoluto.",
            "Não suporta café forte; toma sempre com leite e muito açúcar.",
            "Desenha muito bem, mas raramente mostra suas artes para alguém."
        ],

        stats: {
            forca: 2,
            agilidade: 5,
            intelecto: 8,
            tenacidade: 7,
            espirito: 10
        }
    }

};

// Dados das artes (com descrições expandidas)
const artworks = [
    {
        id: 1,
        title: "Haruki Takamatsu - Traje Anti-Chama (Parte 1)",
        image: "assets/images/arts/concept-arts/haruki/1.png",
        description: "Arte conceitual gerada por IA, do traje anti-chama de Haruki Takamatsu / Ember Blade, parte 1",
        year: "2025",
        artist: "Concept Art - IA"
    },
    {
        id: 2,
        title: "Haruki Takamatsu - Traje Anti-Chama (Parte 2)",
        image: "assets/images/arts/concept-arts/haruki/2.png",
        description: "Arte conceitual gerada por IA, do traje anti-chama de Haruki Takamatsu, agora com sua iconica touca e mascará / Ember Blade, parte 1",
        year: "2025",
        artist: "Concept Art - IA"
    },
    {
        id: 3,
        title: "Fumiko Emi - Concept Art 1",
        image: "assets/images/arts/concept-arts/fumiko/1.png",
        description: "Arte conceitual gerada por IA, de Fumiko Emi",
        year: "2025",
        artist: "Concept Art - IA"
    },
    {
        id: 9,
        title: "Genki Kato (Art Oficial)",
        image: "assets/images/arts/artes/9.png",
        description: "Arte feita em sua primeira versão da história (The Ghoul`s Prophecy), na arte temos Genki Kato, um dos membros da Divisão Fantasma. Curiosidade: Essa arte foi feita para apresentar o lançamento do capitulo 3.",
        year: "2022",
        artist: "Arte Oficial - Moon Honey"
    },
    {
        id: 4,
        title: "Fumiko Emi - Concept Art 2",
        image: "assets/images/arts/concept-arts/fumiko/2.png",
        description: "Arte conceitual gerada por IA, de Fumiko Emi",
        year: "2025",
        artist: "Concept Art - IA"
    },
    {
        id: 5,
        title: "Haruki Takamatsu (Clássico)",
        image: "assets/images/arts/artes/2.png",
        description: "Arte feita pelo Autor em sua primeira versão da história (The Ghoul`s Prophecy), na arte temos Haruki Clássico e Nero Clássico. Curiosidade: Essa foi a primeira arte e o primeiro conceito de criar uma obra própria.",
        year: "2021",
        artist: "Arte Oficial"
    },
    {
        id: 6,
        title: "Fumiko Emi (Clássica)",
        image: "assets/images/arts/artes/3.png",
        description: "Arte feita em sua primeira versão da história (The Ghoul`s Prophecy), na arte temos Fumiko Emi belíssima, usando sua primeira versão de seu poder. Curiosidade: Na primeira versão, Fumiko Emi teria poderes de dar vida a brinquedos danificados, e usa-los para criar seu proprio mini-exercito para batalhas. Descontinuado por amadurecimento da obra e questões de balanceamento (era um poder fraco demais).",
        year: "2022",
        artist: "Arte Oficial - Moon Honey"
    },
    {
        id: 7,
        title: "Fumiko Emi (Fan-Art)",
        image: "assets/images/arts/artes/4.png",
        description: "Arte feita em sua primeira versão da história (The Ghoul`s Prophecy), na arte temos Fumiko Emi belíssima. Curiosidade: O antigo design de Fumiko era com longos cabelos vermelho carmesin completamente solto e despojado, e o uniforme escolar era azul vibrante. ''ruivinha muito lindinha espero que tenha acertado algo do design delakkkkk''.",
        year: "2022",
        artist: "Fan Art - Shurros"
    },
    {
        id: 8,
        title: "Fumiko roubando batatinhas (Fan-Art)",
        image: "assets/images/arts/artes/8.png",
        description: "Arte feita em sua primeira versão da história (The Ghoul`s Prophecy), na arte temos Fumiko Emi roubando as iconicas batatinhas fritas de Nero.",
        year: "2022",
        artist: "Fan Art - Ludivine / Yellow Mariana"
    },
    {
        id: 9,
        title: "Dupla principal",
        image: "assets/images/arts/artes/1.png",
        description: "Haruki Takamatsu e Fumiko Emi, arte completa",
        year: "2025",
        artist: "Official Art - IA"
    }
];
// Dados dos capítulos (mantidos iguais)
const chaptersData = {
    totalVolumes: 1,
    volumes: [
        {
            volume: 1,
            title: "Volume 1: O Contrato",
            available: true,
            chapters: [
                { chapter: "prologo", title: "Prólogo", available: true, file: "prologo.pdf" }
            ]
        }
    ]
};

// Dados das músicas (mantidos iguais)
const musicTracks = [
    {
        id: 1,
        title: "Project Ghost - Abertura conceito",
        description: "Orquestra Sombria",
        thumbnail: "assets/images/arts/musicas/1.png",
        url: "https://www.youtube.com/watch?v=KHIodTpO_5Q"
    }
];
