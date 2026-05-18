import { readerMusic } from "../../music.js";

export const prologoChapter = {
    chapter: "prologo",
    title: "Prólogo",
    available: true,
    file: "prologo/prologo-base.pdf",
    reader: {
        title: "Prólogo",
        pageStart: 1,
        pageEnd: 30,
        googleDocsUrl: "https://docs.google.com/document/d/1J3BpHaeWOi7-Dz8iaLW-i4VxXWLOK3kwb8EN9WZpRaQ/edit?usp=sharing",
        pdf: "prologo/prologo-modo-leitura.pdf",
        scenes: [
            {
                id: "capa",
                label: "Cap",
                description: "Vazio, escuridão, fumaça e sensação de tempo suspenso.",
                from: 1,
                to: 2,
                background: "none",
                audio: "none",
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
                description: "Vazio, escuridão, fumaça e sensação de tempo suspenso.",
                from: 3,
                to: 5,
                background: "assets/cenas/vazio.png",
                audio: readerMusic.acaso,
                theme: {
                    accent: "#000000",
                    panel: "rgba(44, 44, 44, 0.78)",
                    text: "#ffffff",
                    muted: "#454141"
                }
            },
            {
                id: "Quarto_do_haruki",
                label: "Quarto do Haruki",
                description: "Mofo, escuro e o som do despertador",
                from: 6,
                to: 6,
                background: "assets/cenas/quarto_haruki.png",
                audio: readerMusic.curiosidade,
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#001c22"
                }
            },
            {
                id: "Quarto_do_haruki",
                label: "Quarto do Haruki",
                description: "Mofo, escuro e o som do despertador",
                from: 7,
                to: 7,
                background: "assets/cenas/quarto_haruki.png",
                audio: readerMusic.curiosidade,
                theme: {
                    accent: "#000812",
                    panel: "rgba(0, 24, 64, 0.78)",
                    text: "#ffffff",
                    muted: "#001c22"
                }
            }
        ]
    }
};
