export const characters = {
    haruki: {
        tag: "haruki",
        name: "Haruki Takamatsu",
        portrait: "assets/images/arts/ficha-personagem/haruki/haruki_3.png",
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
        portrait: "assets/images/arts/ficha-personagem/fumiko/fumiko_2.png",

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
    },
    ichiko: {
        tag: "ichiko",
        name: "Ichiko Kurogane",
        portrait: "assets/images/arts/ficha-personagem/ichiko/ichiko_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/ichiko/ichiko_1.png",
        ],

        description:
            "Ichiko Kurogane é o Ritualista da Divisão Fantasma, responsável por estudar, preparar e executar os procedimentos que os outros membros preferem não conhecer em detalhes. À primeira vista, sua postura descontraída, seu sorriso constante e seu jeito exageradamente curioso poderiam fazê-lo parecer apenas excêntrico. O problema é que Ichiko não possui praticamente nenhum senso de limite quando o assunto envolve sangue, Spirits ou o corpo humano. Sua pele é anormalmente fria, seus caninos ficam visíveis quando sorri e sua empolgação diante de situações grotescas frequentemente faz com que outras pessoas questionem se ele está realmente brincando. Apesar da aparência de alguém completamente perturbado, Ichiko possui um dos maiores conhecimentos sobre Spirits dentro da Divisão Fantasma. Seu fascínio pelo sangue frequentemente parece mórbido, mas por trás dele existe uma compreensão quase religiosa daquilo que cada gota representa: uma pequena parte de alguém que continua existindo mesmo depois que aquela pessoa desaparece.",

        spirit_user: "Sim",

        role: "Membro da Divisão Fantasma / Ritualista da Divisão Fantasma",
        codename: "O Ritualista",

        age: "25 anos",
        height: "184 cm",
        weight: "72 kg",
        birthday: "31 de julho", // Junji Ito - horror, obsessão e grotesco
        bloodType: "???",
        gender: "Masculino",

        occupation: "Ritualista / Especialista em fenômenos espirituais e sangue",
        affiliation: "Divisão Fantasma",
        status: "Vivo",

        abilities: [
            "Fermentação de sangue",
            "Leitura de memórias através do sangue",
            "Transfusão de sangue",
            "Acidificação sanguínea"
        ],

        background:
            "???",

        personality:
            "Excêntrico, hiperativo, curioso e assustadoramente confortável com situações que deixariam qualquer outra pessoa desconfortável. Ichiko fala rápido quando está empolgado, repete palavras, invade o espaço pessoal dos outros sem perceber e frequentemente precisa ser lembrado por Fumiko de que existem coisas chamadas ''boas maneiras''. Seu sorriso quase permanente e seu humor mórbido fazem com que pareça muito menos confiável do que realmente é. Apesar disso, Ichiko é extremamente inteligente, observador e dedicado às pessoas da Divisão. Ele utiliza humor e comportamento exagerado como uma maneira de impedir que os outros percebam quando alguma coisa realmente o afeta. Possui uma relação complicada com culpa e acredita que algumas coisas que fez no passado simplesmente não podem ser apagadas. Por isso, sua lealdade à Divisão é praticamente absoluta. Quando a situação deixa de ser engraçada, Ichiko muda completamente: fica silencioso, preciso e assustadoramente sério. Ele pode brincar com sangue, cadáveres e Spirits durante uma investigação, mas jamais trata a morte de um aliado como brincadeira.",

        relationships: [
            {
                name: "Haruki Takamatsu",
                relation: "Aliado / Curiosidade científica / Protetor"
            },
            {
                name: "Fumiko Emi",
                relation: "Líder / Aliada / Respeito"
            },
            {
                name: "Genki Kato",
                relation: "Aliado / Amigo / Provocações constantes"
            },
            {
                name: "Naomi Suzuki",
                relation: "Aliada / Amiga / Provocações constantes"
            },
            {
                name: "???",
                relation: "???"
            }/*,
            {
                name: "Kazuma Kurogane",
                relation: "Irmão / Trauma / Conflito"
            }*/
        ],

        trivia: [
            "Sua pele é naturalmente muito fria ao toque.",
            "Seus caninos ficam bastante visíveis quando sorri.",
            "Quando fica genuinamente sério, normalmente para de sorrir por completo.",
            "Possui uma geladeira hospitalar dedicada exclusivamente às bolsas de sangue utilizadas pela Divisão.",
            "Sabe de memória o tipo sanguíneo de todos os membros da Divisão Fantasma.",
            "Tem o hábito de inclinar a cabeça enquanto analisa algo que considera interessante.",
            "Sua risada costuma ser seca, alta e desconfortavelmente longa (Khehehehehe).",
            "Não considera sangue algo nojento e genuinamente não entende por que outras pessoas têm tanta aversão a ele.",
            "Sua bebida favorita é limonada de frutas vermelhas."
        ],

        stats: {
            forca: 5,
            agilidade: 8,
            intelecto: 9,
            tenacidade: 6,
            espirito: 10
        }
    },

    //
    sonia: {
        tag: "sonia",
        name: "Sônia Takamatsu",
        portrait: "assets/images/arts/ficha-personagem/sonia/sonia_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/sonia/sonia_1.png",
        ],

        description:
            "Sônia Takamatsu é a avó de Haruki e a pessoa responsável por manter alguma normalidade em sua vida depois da perda dos pais. Baixinha, acolhedora e aparentemente frágil por causa da idade, ela possui uma presença que domina a casa sem precisar levantar a voz. É o tipo de pessoa que demonstra amor através de pequenas ações: prepara o café, lembra horários, separa vitaminas, confere remédios, lava uniformes e reclama quando Haruki sai de casa sem comer. Seu cabelo grisalho curto e levemente ondulado, os óculos de leitura presos por uma pequena corrente e as roupas confortáveis fazem com que pareça exatamente aquilo que Haruki mais precisa quando volta para casa: segurança.",

        spirit_user: "Não",

        role: "Avó e responsável legal de Haruki Takamatsu",
        codename: "Nenhum",

        age: "66 anos",
        height: "158 cm",
        weight: "67 kg",
        birthday: "21 de setembro",
        bloodType: "A+",
        gender: "Feminino",
        occupation: "Aposentada",
        affiliation: "Família Takamatsu",
        status: "Vivo",

        abilities: [
            "Nenhuma habilidade sobrenatural",
            "Culinária",
            "Primeiros socorros básicos"
        ],

        background:
            "Depois da morte dos pais de Haruki, Sônia assumiu a responsabilidade pelo neto e passou a organizar praticamente todos os aspectos de sua rotina. Os meses seguintes foram marcados pelo luto dentro da casa, contas médicas, consultas, medicamentos e pela tentativa constante de impedir que Haruki simplesmente desistisse de cuidar de si mesmo. Sônia nunca tentou substituir os pais dele, mas fez questão de que a casa continuasse funcionando. Mesmo quando Haruki se fecha, chega tarde ou responde de maneira ríspida, ela continua deixando comida pronta e perguntando se ele tomou os remédios. Para Sônia, cuidar não é uma obrigação: é a maneira que encontrou de manter sua família unida depois de perder parte dela.",

        personality:
            "Carinhosa, protetora, persistente e muito mais firme do que sua aparência sugere. Sônia raramente grita e prefere demonstrar desaprovação com silêncio, pequenas broncas ou um olhar por cima dos óculos. É extremamente atenta ao estado físico e emocional de Haruki e percebe rapidamente quando ele está escondendo alguma coisa, mesmo que nem sempre consiga descobrir o quê. Possui valores tradicionais em alguns aspectos, mas não é rígida nem intolerante. Sua maior característica é a constância: independentemente do tamanho do problema, Sônia continua fazendo café pela manhã e esperando Haruki voltar para casa.",

        relationships: [
            {
                name: "Haruki Takamatsu",
                relation: "Neto / Responsável / Amor incondicional"
            },
            {
                name: "Shiatsu Takamatsu",
                relation: "Filho / Família"
            },
            {
                name: "Sachiko Takamatsu",
                relation: "Nora / Família"
            },
            {
                name: "Akira Takamatsu",
                relation: "Filho falecido"
            },
            {
                name: "Yui Takamatsu",
                relation: "Nora falecida"
            }
        ],

        trivia: [
            "Usa óculos de leitura presos por uma pequena corrente.",
            "Mantém remédios e vitaminas organizados por horário.",
            "Tem o hábito de dobrar as mangas enquanto cozinha.",
            "Guarda documentos, recibos e boletos em pastas extremamente organizadas.",
            "Percebe imediatamente quando Haruki não dormiu direito.",
            "Mesmo quando está irritada, pergunta se ele já comeu.",
            "Não gosta quando Haruki sai de casa sem tomar café.",
            "É uma das poucas pessoas que consegue fazer Haruki obedecer apenas chamando seu nome."
        ],

        stats: {
            forca: 2,
            agilidade: 3,
            intelecto: 8,
            tenacidade: 1,
            espirito: 6
        }
    },

    shiatsu: {
        tag: "shiatsu",
        name: "Shiatsu Takamatsu",
        portrait: "assets/images/arts/ficha-personagem/shiatsu/shiatsu_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/shiatsu/shiatsu_1.png",
        ],

        description:
            "Shiatsu Takamatsu é tio de Haruki e terapeuta, dono de um pequeno consultório. Calmo e bem-humorado, conhece profundamente músculos, articulações e os limites do corpo humano. Por causa disso, acaba ajudando Haruki de maneira inesperada em sua vida como combatente, ensinando técnicas simples para cair sem se machucar, absorver impactos e reconhecer lesões. Também conhece boa parte da história da família Takamatsu e preservou objetos deixados pelo pai de Haruki.",

        spirit_user: "Não",

        role: "Tio de Haruki / Confidente da Família Takamatsu",
        codename: "Nenhum",

        age: "47 anos",
        height: "180 cm",
        weight: "83 kg",
        birthday: "3 de novembro",
        bloodType: "O+",
        gender: "Masculino",

        occupation: "Massagista / Terapeuta / Proprietário de pequeno consultório",
        affiliation: "Família Takamatsu",
        status: "Vivo",

        abilities: [
            "Nenhuma habilidade sobrenatural",
            "Terapia de shiatsu",
            "Conhecimento avançado de músculos e articulações",
            "Identificação de lesões físicas",
            "Redução e estabilização emergencial de luxações",
            "Técnicas de queda e absorção de impacto",
            "Noções de movimentação corporal",
            "Primeiros socorros"
        ],

        background:
            "Shiatsu foi muito próximo do pai de Haruki e conhece histórias da família que o sobrinho nunca ouviu. Depois da morte dos pais dele, tornou-se uma presença discreta em sua vida. Além de preservar uma antiga katana e uma carta deixadas para Haruki, passou a ajudá-lo com conhecimentos adquiridos durante anos trabalhando diretamente com o corpo humano.",

        personality:
            "Calmo, paciente e bem-humorado. Shiatsu prefere ensinar através de histórias e demonstrações em vez de grandes discursos. Costuma parecer despreocupado, mas percebe rapidamente quando Haruki está escondendo dor física ou emocional. Quando necessário, consegue ser bastante firme.",

        relationships: [
            {
                name: "Haruki Takamatsu",
                relation: "Sobrinho / Confidente / Figura paterna secundária"
            },
            {
                name: "Sônia Takamatsu",
                relation: "Mãe / Família"
            },
            {
                name: "Sachiko Takamatsu",
                relation: "Esposa"
            },
            {
                name: "Akira Takamatsu",
                relation: "Irmão falecido / Melhor amigo"
            },
            {
                name: "Yui Takamatsu",
                relation: "Cunhada falecida"
            }
        ],

        trivia: [
            "Reconhece músculos tensionados ou lesionados apenas pela palpação.",
            "Percebe rapidamente quando Haruki está escondendo alguma lesão.",
            "Ensinou Haruki a distribuir o impacto de uma queda pelo corpo inteiro em vez de tentar pará-la com os braços.",
            "Ensina Haruki movimentos que parecem simples, mas acabam sendo extremamente úteis durante batalhas.",
            "Sabe improvisar estabilizações para articulações deslocadas até que atendimento médico adequado seja possível.",
            "Costuma explicar movimentos usando exemplos de músculos e articulações em vez de técnicas de luta.",
            "Frequentemente reclama da postura de Haruki.",
            "Acredita que conhecer os limites do próprio corpo é tão importante quanto saber lutar.",
            "Faz chá para visitas mesmo quando ninguém pediu."
        ],

        stats: {
            forca: 7,
            agilidade: 4,
            intelecto: 7,
            tenacidade: 7,
            espirito: 4
        }
    },

    diretora: {
        tag: ["reiko"],
        name: "Reiko Kurosawa",
        portrait: "assets/images/arts/ficha-personagem/diretora-golden-oak/diretora_1.png",

        portraits: [
            "assets/images/arts/ficha-personagem/diretora-golden-oak/diretora_1.png",
        ],

        description:
            "Reiko Kurosawa é a diretora da Golden Oak Academy. Elegante, rígida e extremamente observadora, mantém a escola sob disciplina constante sem precisar levantar a voz. Apesar da aparência fria, sabe diferenciar um aluno irresponsável de alguém que realmente precisa de ajuda. Por isso, passa a observar Haruki com mais atenção conforme seus problemas dentro da escola aumentam.",

        spirit_user: "Não",

        role: "Diretora da Golden Oak Academy",
        codename: "Nenhum",

        age: "50 anos",
        height: "174 cm",
        weight: "68 kg",
        birthday: "8 de março",
        bloodType: "A-",
        gender: "Feminino",
        occupation: "Diretora escolar",
        affiliation: "Golden Oak Academy",
        status: "Vivo",

        abilities: [
            "Nenhuma habilidade sobrenatural",
            "Administração escolar",
            "Gestão de conflitos",
            "Excelente capacidade de observação",
            "Oratória"
        ],

        background:
            "Reiko construiu sua carreira dentro da educação até assumir a direção da Golden Oak Academy. Conhecida por sua disciplina e organização, acredita que punições só fazem sentido quando também se entende a origem do problema. O comportamento cada vez mais irregular de Haruki acaba despertando sua preocupação.",

        personality:
            "Rígida, controlada e muito profissional. Possui pouca tolerância para desrespeito ou desculpas, mas não é cruel. Observadora, percebe facilmente quando um aluno está escondendo algo e acredita que respeito deve existir dos dois lados.",

        relationships: [
            {
                name: "Haruki Takamatsu",
                relation: "Aluno / Caso disciplinar / Preocupação"
            },
            {
                name: "Shiatsu Takamatsu",
                relation: "Responsável de Haruki / Contato escolar"
            },
            {
                name: "Sônia Takamatsu",
                relation: "Responsável legal de Haruki"
            }
        ],

        trivia: [
            "Usa óculos retangulares de armação fina.",
            "Possui uma única mecha grisalha na parte frontal do cabelo.",
            "Costuma usar batom vinho ou vermelho escuro.",
            "Prefere roupas sociais brancas ou off-white.",
            "Nunca precisa levantar a voz para conseguir silêncio.",
            "Seu escritório é extremamente organizado.",
            "Costuma encarar alunos por cima dos óculos quando percebe uma mentira.",
            "Haruki inicialmente acredita que ela simplesmente o odeia."
        ],

        stats: {
            forca: 3,
            agilidade: 3,
            intelecto: 9,
            tenacidade: 8,
            espirito: 5
        }
    }
};

