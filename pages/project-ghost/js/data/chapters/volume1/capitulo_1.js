import { readerMusic } from "../../music.js";

export const capitulo_1 = {
    chapter: "capitulo_1",
    title: "Capítulo 1",
    available: true,
    file: "capitulo_1/capitulo_1.pdf",
    readingMethods: {
        pdf: true,
        googleDocs: true,
        immersive: false
    },
    reader: {
        title: "Capítulo 1",
        pageStart: 1,
        pageEnd: 24,
        googleDocsUrl: "https://docs.google.com/document/d/1Qb3g6eVjdAjsI4YUECUZS0LrwlLfvNJN1jl3pW43FGM/edit?usp=sharing",
        pdf: "capitulo_1/capitulo_1.pdf",
        startScreen: {
            title: "Capítulo 1",
            buttonLabel: "Iniciar leitura do Capítulo 1",
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
            }
        ]
    }
}