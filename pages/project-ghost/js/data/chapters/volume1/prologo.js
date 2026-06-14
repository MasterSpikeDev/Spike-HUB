import { readerMusic } from "../../music.js";

export const prologoChapter = {
    chapter: "prologo",
    title: "Prólogo",
    available: true,
    file: "prologo/prologo.pdf",
    readingMethods: {
        pdf: true,
        googleDocs: true,
        immersive: true
    },
    reader: {
        title: "Prólogo",
        pageStart: 1,
        pageEnd: 24,
        googleDocsUrl: "https://docs.google.com/document/d/1J3BpHaeWOi7-Dz8iaLW-i4VxXWLOK3kwb8EN9WZpRaQ/edit?usp=sharing",
        pdf: "prologo/prologo.pdf",
        startScreen: {
            title: "Prólogo",
            buttonLabel: "Iniciar leitura do Prólogo",
            background: "#000000",
            backgroundImage: "assets/images/website/none.png",
            audio: readerMusic.fire_inside_me
        },
        scenes: [
            {
                id: "capa",
                from: 1,
                to: 2,
                audio: readerMusic.fire_inside_me,
                theme: {
                    accent: "#ff3a3a",
                    panel: "rgba(34, 8, 10, 0.78)",
                    text: "#fff5f5",
                    muted: "#ffd0d0"
                }
            },
            {
                id: "clock_dream",
                label: "Sonho do relógio",
                from: 3,
                to: 5,
                background: "assets/cenas/ambiente/sonho_prologo.png",
                audio: readerMusic.clock,
                effects: [
                    { id: "voidParticles", intensity: 10, quantity: 1000, speed: 24, color: "#6f6f78", opacity: 1, fadeIn: 1200, fadeOut: 1000, loop: true },
                    { id: "darkness", layer: "page", color: "#ffffff", edgeOpacity: 1, innerRadius: 0.05, fadeIn: 1000, fadeOut: 1000 }
                ],
                theme: {
                    accent: "#000000",
                    panel: "rgba(44, 44, 44, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "Quarto_do_haruki",
                from: 6,
                to: 6,
                background: "assets/cenas/casa_haruki/quarto_haruki.png",
                audio: readerMusic.clock_alarm,
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "Banheiro",
                from: 7,
                to: 7,
                background: "assets/cenas/casa_haruki/espelho.png",
                audio: readerMusic.normal_days,
                theme: {
                    accent: "#000812",
                    panel: "rgba(127, 87, 0, 0.78)", // fundo painel
                    text: "#ffffff", // titulo, texto
                    muted: "#ffffff"
                }
            },
            {
                id: "metro",
                label: "Metro",
                from: 8,
                to: 8,
                background: "assets/cenas/cidade/metro_subterraneo_hall.png",
                audio: [
                    readerMusic.normal_days,
                    readerMusic.metro
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(63, 63, 63, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "escola",
                label: "Escola",
                from: 9,
                to: 9,
                background: "assets/cenas/escola/escola_corredor.png",
                audio: [readerMusic.escola, readerMusic.normal_days],
                theme: {
                    accent: "#000812",
                    panel: "rgba(63, 63, 63, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "escola_2",
                label: "Escola",
                from: 10,
                to: 10,
                background: "assets/cenas/escola/escola_corredor.png",
                audio: [readerMusic.escola],
                theme: {
                    accent: "#000812",
                    panel: "rgba(63, 63, 63, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "sala_diretoria",
                label: "Sala da diretoria",
                from: 11,
                to: 12,
                background: "assets/cenas/escola/diretoria.png",
                audio: readerMusic.escola,
                theme: {
                    accent: "#000812",
                    panel: "rgba(42, 19, 0, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "carro_shiatsu",
                label: "Carro de Shiatsu",
                from: 13,
                to: 14,
                background: "assets/cenas/cidade/avenida.png",
                audio: readerMusic.carros_avenida,
                theme: {
                    accent: "#000812",
                    panel: "rgba(114, 51, 0, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "sotao",
                label: "Sótão",
                from: 15,
                to: 15,
                background: "assets/cenas/casa_shiatsu/sotao.png",
                theme: {
                    accent: "#000812",
                    panel: "rgba(64, 38, 0, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                },
                effects: [
                    { id: "dust", intensity: 10, quantity: 600, spawnRate: 8, speed: 14, opacity: 0.9, size: 1.8, wind: 8, color: "rgba(215,200,170,.55)" }
                ]
            },
            {
                id: "cemiterio",
                label: "Cemitério",
                from: 16,
                to: 16,
                background: "assets/cenas/cidade/cemiterio.png",
                audio: readerMusic.chuva,
                effects: [
                    { id: "rain", intensity: 10, quantity: 500, speed: 820, opacity: 0.5, fadeIn: 900, fadeOut: 900, layer: "page" },
                    { id: "fog", intensity: 0.35, quantity: 42, speed: 12, opacity: 0.18, fadeIn: 1400, fadeOut: 1200 }
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "flashback",
                label: "Flashback",
                from: 17,
                to: 17,
                background: "assets/cenas/flashback/flashback_casa_haruki_pais.png",
                audio: readerMusic.chuva,
                effects: [
                    ,
                    { id: "darkness", layer: "page", color: "#ffffff", edgeOpacity: 1, innerRadius: 0.03, fadeIn: 1000, fadeOut: 1000 }
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(255, 255, 255, 0.27)",
                    text: "#000000",
                    muted: "#000000"
                }
            },
            {
                id: "cemiterio",
                label: "Cemitério",
                from: 18,
                to: 19,
                background: "assets/cenas/cidade/cemiterio.png",
                audio: readerMusic.chuva,
                effects: [
                    { id: "rain", intensity: 10, quantity: 100, speed: 820, opacity: 0.5, fadeIn: 900, fadeOut: 900, layer: "page" },
                    { id: "fog", intensity: 0.35, quantity: 42, speed: 12, opacity: 0.18, fadeIn: 1400, fadeOut: 1200 }
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "entrada_casa_haruki",
                from: 20,
                to: 20,
                background: "assets/cenas/casa_haruki/entrada.png",
                audio: readerMusic.chuva,
                effects: [                 

                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(27, 18, 0, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "televisao",
                from: 21,
                to: 21,
                background: "assets/cenas/casa_haruki/sala_estar.png",
                audio: readerMusic.chuva,
                effects: [
                    
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(27, 18, 0, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "rua_noite_chuva",
                from: 22,
                to: 22,
                background: "assets/cenas/cidade/rua_noite_chuva.png",
                audio: [
                    readerMusic.ashes_japonese,
                    readerMusic.chuva,
                ],
                effects: [
                    { id: "rain", layer: "page", intensity: 0.9, quantity: 190, speed: 900, opacity: 0.42, fadeIn: 700, fadeOut: 800, layer: "page" },
                    //{ id: "heartbeat", layer: "page", bpm: 30, intensity: 0.03, overlayIntensity: 0.2, overlayDuration: 420, overlayFadeOut: 700, color: "#ff1f3d", edgeOpacity: 0.75, fadeIn: 400, fadeOut: 800, sound: "assets/audio/effects/batida_coracao.mp3" }

                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 6, 17, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "rua_noite_chuva_carro",
                from: 23,
                to: 23,
                background: "assets/cenas/cidade/rua_noite_chuva_carro.png",
                audio: [
                    readerMusic.ashes_japonese,
                    readerMusic.chuva
                ],
                effects: [
                    { id: "rain", layer: "page", intensity: 0.85, quantity: 180, speed: 880, opacity: 0.4, fadeIn: 500, fadeOut: 800 },
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 6, 17, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "fim",
                from: 24,
                to: 24,
                audio: [
                    readerMusic.ashes_japonese,
                    readerMusic.chuva
                ],
                effects: [
                    { id: "rain", layer: "page", intensity: 0.6, quantity: 130, speed: 760, opacity: 0.32, fadeIn: 500, fadeOut: 1300 },
                    { id: "ashes", intensity: 0.55, quantity: 80, speed: 30, opacity: 0.34, fadeIn: 600, fadeOut: 1200 }
                ],
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 0, 0, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            }
        ]
    }
};
