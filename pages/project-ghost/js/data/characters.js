export const characters = {
    haruki: {
        tag: "haruki",
        name: "Haruki Takamatsu",
        portrait: "assets/images/arts/ficha-personagem/haruki/haruki_1.png",
        portraits: [
            "assets/images/arts/ficha-personagem/haruki/haruki_1.png",
            "assets/images/arts/ficha-personagem/haruki/haruki_2.png",
            "assets/images/arts/ficha-personagem/haruki/haruki_3.png",
        ],
        codename: "O Incendiário",
        spirit_user: "Sim",

        description:
            "Haruki Takamatsu, protagonista da história, é um estudante marcado pelo trauma da morte misteriosa de seus pais. Consumido pela perda e pela raiva, acaba se envolvendo em um ritual espiritual que o conecta ao mundo dos mortos, iniciando sua jornada em busca de vingança. Seus poderes são relacionados a fogo, mas desenvolveu uma certa habilidade com a katana herdada de sua familia.",

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
            "Aura protetora de fogo"
        ],

        background:
            "Haruki cresceu em uma família tradicional japonesa. Tinha notas boas e era um aluno quieto, reservado e pouco sociável. Após a tragédia que atingiu sua família, tornou-se emocionalmente instável e mais propenso a explosões de raiva. Antes da conexão com a divisão fantamas, Haruki se encontrava em um quadro depressivo leve, com uso de remédios controlados, e pouco contato social. Explode em momentos de raiva, principalmente quando mencionam o incidente.",

        personality:
            "Determinado e obstinado, Haruki é guiado por um forte senso de justiça, porém distorcido pela dor. É impulsivo, intenso e carrega um coração puro apesar de não parecer a primeira vista, sempre tentando sobreviver à escuridão que cresce dentro dele. Seu caminho é uma constante luta entre humanidade e vingança, e ele se esforça para proteger aqueles que ama, mesmo que isso signifique enfrentar seus próprios demônios internos.",

        relationships: [
            { name: "Fumiko Emi", relation: "Aliada" },
            { name: "Sônia Takamatsu", relation: "Avó / Responsável legal" },
            { name: "Shiatsu Takamatsu", relation: "Tio" },
            // novos membros
            { name: "Genki Kato", relation: "Aliado" },
            { name: "Naomi Suzuki", relation: "Aliada" },
            { name: "Ichiko Kurogane", relation: "Aliado / Indiferente" },

        ],

        trivia: [
            "Medo do escuro, trauma severo.",
            "Seus olhos ficam avermelhados quando usa poderes de chama, mudança repentina.",
            "Tinha excelente desempenho acadêmico antes da tragédia",
            "Tem costume de comprar bebidas e salgadinhos prontos antes da aula",
            "Dificuldade de usar hashis, mesmo sendo japonês",
            "Adora ouvir música, especialmente rock",
        ],

        stats: {
            forca: 8,
            agilidade: 7,
            intelecto: 7,
            tenacidade: 6,
            espirito: 7
        }
    },
    fumiko: {
        tag: "fumiko",
        name: "Fumiko Emi",
        portrait: "assets/images/arts/ficha-personagem/fumiko/fumiko_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/fumiko/fumiko_1.png",
            "assets/images/arts/ficha-personagem/fumiko/fumiko_2.png",

        ],

        description:
            "Estudante exemplar e reservada, mas secretamente líder da ''Divisão Fantasma'', um grupo que investiga atividades espirituais e combate usuários de Spirit envolvidos em crimes. Seu Spirit manifesta um arco luminoso capaz de ferir apenas entidades espirituais, tornando-a um dos maiores perigos para criaturas do outro lado, e mudando sua cor dos olhos para amarelo. Precisa estar na luz do sol durante o dia para recarregar seu poder, 1 hora de sol equivale a 3 flechas geradas por ciclo de poder. Contra humanos, porém, é vulnerável, causando nenhum dano, por isso Fumiko treina e possui mira extraordinária e carrega sua pistola (Glock 19) em uma maleta ou coldre.",

        spirit_user: "Sim",

        role: "Líder da Divisão Fantasma / Dupla de Haruki Takamatsu",
        codename: "A Manda Chuva da Divisão Fantasma",

        age: "19 anos",
        height: "180 cm",
        weight: "62 kg",
        birthday: "19 de Janeiro",
        bloodType: "A-",
        gender: "Feminino",
        occupation: "Estudante",
        affiliation: "Golden Oak High School",
        status: "Vivo",

        abilities: [
            "Absorção de luz",
            "Arco de luz",
            "Flechas de luz",
            "Mira aguçada",

            // novo poder, brinquedos de luz
            "???"
        ],

        background:
            "???",

        personality:
            "Animada e confiante, com uma determinação quase inabalável. Apesar da postura gentil no dia a dia, durante missões assume uma seriedade fria e altamente profissional. É responsável e pontual, qualidades que a tornam uma líder natural da equipe, apesar da idade.",

        relationships: [
            { name: "Haruki Takamatsu", relation: "Aliado" },
            { name: "Genki Kato", relation: "Aliado" },
            { name: "Naomi Suzuki", relation: "Aliada" },
            { name: "Ichiko Kurogane", relation: "Aliado" }
        ],

        trivia: [
            "Sempre carrega um caderno onde registra padrões espirituais e atividades suspeitas.",
            "Apesar de ser estrategista brilhante, é terrível na cozinha, costuma queimar até arroz.",
            "Quando nervosa, enrola uma mecha de cabelo repetidamente.",
            "Prefere estudar em cafeterias, pois odeia silêncio absoluto.",
            "Não suporta café forte, toma sempre com leite e muito açúcar.",
            "Desenha muito bem, mas raramente mostra suas artes para alguém.",
            "Tem o costume de ver o por do sol todas as tardes, mesmo quando não tem tempo para isso, é um momento de paz para ela.",
        ],

        stats: {
            forca: 3,
            agilidade: 7,
            intelecto: 8,
            tenacidade: 5,
            espirito: 9
        }
    },
    genki: {
        tag: "genki",
        name: "Genki Kato",
        portrait: "assets/images/arts/ficha-personagem/genki/genki_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/genki/genki_1.png",

        ],

        description:
            "Genki Kato é o pilar silencioso da Divisão Fantasma. Calmo, sério e difícil de abalar, ele manipula matéria ao seu redor para proteger aliados, abrir caminhos e transformar o campo de batalha em uma extensão da própria vontade. Ele pode tocar em materiais não vivos, e manipular seus estados, formatos e organização estrutural, a complexidade do material muda o tempo e esforço exigido por ele durante o poder, seus olhos brilham em azul durante o uso. Por trás da postura fria, carrega o peso de quem sempre precisa continuar de pé pelos outros. Carrega sua pistola (Glock 19) em um coldre, mas raramente a usa, preferindo confiar em suas habilidades de manipulação para se defender e atacar, mas não hesita em usá-la quando necessário, principalmente para proteger os outros.",

        spirit_user: "Sim",

        role: "Membro da Divisão Fantasma / Motorista da Divisão Fantasma",
        codename: "O Motorista",

        age: "25 anos",
        height: "192 cm",
        weight: "90 kg",
        birthday: "15 de dezembro", // Gustave Eiffel aniversario - engenheiro da torre eiffel
        bloodType: "B+",
        gender: "Masculino",
        occupation: "Ex-Policial",
        affiliation: "Delegacia de Polícia de Shibuya",
        status: "Vivo",

        abilities: [
            "Manipulação de matéria",
            "Modificar estados físicos (Sólido, líquido, gasoso)",
            "Transformação de forma",
            "Contrução de estruturas improvisadas",
        ],

        background:
            "???",

        personality:
            "Calmo, racional e emocionalmente contido. Genki é o tipo de pessoa que raramente perde seu senso de responsabilidade, mesmo nas situações mais estressantes. Ele é um ouvinte atento e um conselheiro confiável, sempre disposto a oferecer uma palavra mesmo que direta demais, ou um plano estratégico quando necessário. Apesar de sua natureza reservada, ele é profundamente leal aos seus aliados e fará qualquer coisa para protegê-los, mesmo que isso signifique colocar-se em perigo.",

        relationships: [
            { name: "Haruki Takamatsu", relation: "Aliado / Indiferente" },
            { name: "Fumiko Emi", relation: "Aliada / Confiavel" },
            { name: "Naomi Suzuki", relation: "Aliada / Indiferente" },
            { name: "Ichiko Kurogane", relation: "Aliado / Indiferente" }
        ],

        trivia: [
            "Tem hábito de girar as chaves do carro da Divisão Fantasma.",
            "Quase sempre carrega ferramentas, parafusos ou peças metálicas nos bolsos sem perceber.",
            "Dorme muito pouco, mas nunca comenta sobre isso.",
            "Tem uma postura intimidadora sem tentar parecer ameaçador.",
            "Costuma observar o ambiente inteiro antes de sentar em qualquer lugar.",
            "Tem dificuldade em falar sobre os próprios sentimentos diretamente.",
            "Consegue improvisar armas e ferramentas com praticamente qualquer material ao redor.",
            "Apesar da aparência séria, tem um humor seco e inesperadamente bom às vezes.",
            "É muito difícil vê-lo entrar em pânico.",
            "O aniversário dele é 15 de dezembro, mesma data de Gustave Eiffel, referência ao engenheiro da Torre Eiffel.",
        ],

        stats: {
            forca: 6,
            agilidade: 6,
            intelecto: 7,
            tenacidade: 8,
            espirito: 6
        }
    },
    naomi: {
        tag: "naomi",
        name: "Naomi Suzuki",
        portrait: "assets/images/arts/ficha-personagem/naomi/naomi_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/naomi/naomi_1.png",

        ],

        description:
            "Naomi Suzuki é uma mulher, sensível e emocionalmente instável, que tenta esconder o próprio caos atrás de uma rotina calma. Sua presença é delicada, quase distante, mas existe algo pesado dentro dela, como se estivesse sempre segurando o mundo para não desabar junto com ela. Apesar de todo seu estresse, e tentar controlar a rotina de todos com horários e muito café, ela vê calma nas borboletas desde criança é o que conforta seu coração, possuindo uma pequena tatuagem de borboleta no pescoço, e brincos dourados em formatos de borboleta pequenos. Seu Spirit consiste na mudança gravitacional, ela puxa o ar para os pulmoes e o tempo que ela mantem o ar dentro do corpo, ela pode controlar a gravidade ao redor dela em objetos especificos, podendo levitar, aumentar ou diminuir a gravidade em um ponto específico, ou criar uma espécie de campo gravitacional (uma zona de vacuo ao seu redor, perigoso para aliados e inimigos que podem morrer sufocados flutuando no ar), para se proteger ou atacar, porem esse ponto fica completamente sem ar e em vacuo. Objetos pesados consomem mais seu ar, podendo manter por pouco tempo a levitação ou manipulação de um objeto especifico. Seus olhos ficam roxos durante o uso do poder. Durante o uso, é possivel notar faiscas de estrelas saindo dos seus olhos, e borboletas de luz roxas em volta do objeto manipulado, indicando que o bater das asas levitam e manipulam aquele ponto.",
        spirit_user: "Sim",

        role: "Membro da Divisão Fantasma / Secretária da Divisão Fantasma",
        codename: "A Secretária / A Borboleta",

        age: "26 anos",
        height: "188 cm",
        weight: "78 kg",
        birthday: "14 de janeiro", // Yukio Mishima aniversario - Escritor japonês famoso Fascinado por: borboletas, morte e beleza
        bloodType: "AB+",
        gender: "Feminino",
        occupation: "Ex-Secretária do departamento de marketing de uma empresa de tecnologia",
        affiliation: "Empresa de tecnologia falida desconhecida",
        status: "Vivo",

        abilities: [
            "Manipulação gravitacional",
            "Zona de vácuo",
        ],

        background:
            "???",

        personality:
            "Faladeira porém emocionalmente frágil, mas muito mais perceptiva do que aparenta. Costuma esconder desconforto e ansiedade atrás de uma postura e educada ou sarcástica, depende do humor (um pouco bipolar). Tem dificuldade em se abrir completamente, prefere guardar sentimentos para si e muitas vezes parece distante, como se estivesse perdida nos próprios pensamentos. Apesar disso, demonstra cuidado genuíno pelas pessoas de forma sutil e silenciosa. Ama muito em segredo, de todas as formas, não deixaria nenhum dos seus aliados morrer em campo, se jolaria na frente para salvar, mesmo que custasse o uso máximo de seu folego",
        relationships: [
            { name: "Haruki Takamatsu", relation: "Aliado / Protetora" },
            { name: "Fumiko Emi", relation: "Aliada / Amiga" },
            { name: "Genki Kato", relation: "Aliada / Indiferente / Protetora" },
            { name: "Ichiko Kurogane", relation: "Aliado / Indiferente" }
        ],

        trivia: [
            "Gosta de observar borboletas e insetos pequenos em silêncio.",
            "Costuma ficar acordada até muito tarde mesmo quando está cansada.",
            "Tem dificuldade em manter contato visual por muito tempo.",
            "O quarto dela normalmente parece organizado, mas tem uma gaveta cheia de papéis amassados, anotações e coisas aleatórias que ela não quer que ninguém veja.",
            "Fala baixo mesmo quando está irritada.",
            "Odeia barulhos muito altos ou ambientes lotados.",
            "Tem um humor inesperadamente sarcástico às vezes.",
            "O silêncio dela raramente significa conforto.",
            "Borboletas sempre aparecem de alguma forma ao redor dela.",
            "Ela bebe bastante alcool, principalmente saquê e cerveja, mas não gosta de bebidas doces.",
        ],

        stats: {
            forca: 4,
            agilidade: 5,
            intelecto: 8,
            tenacidade: 5,
            espirito: 10
        }
    }

};

