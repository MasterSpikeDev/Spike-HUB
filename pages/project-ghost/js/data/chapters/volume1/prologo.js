import { readerMusic } from "../../music.js";

export const prologoChapter = {
    chapter: "prologo",
    title: "Prólogo",
    available: true,
    file: "prologo/prologo.pdf",
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
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "metro",
                label: "Metro",
                from: 8,
                to: 8,
                background: "assets/cenas/cidade/metro_subterraneo_hall.png",
                audio: readerMusic.metro,
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "escola",
                label: "Escola",
                from: 9,
                to: 10,
                background: "assets/cenas/escola/escola_corredor.png",
                audio: readerMusic.escola,
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
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
                    panel: "rgba(0, 24, 64, 0.78)",
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
                    panel: "rgba(0, 24, 64, 0.78)",
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
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            },
            {
                id: "cemiterio",
                label: "Cemitério",
                from: 16,
                to: 19,
                background: "assets/cenas/cidade/cemiterio.png",
                audio: readerMusic.chuva,
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
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
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
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
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
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
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
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
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
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#ffffff"
                }
            }
        ]
    }
};
