import { prologoChapter } from "./volume1/prologo.js";

export const chaptersData = {
    totalVolumes: 2,
    volumes: [
        {
            volume: 1,
            title: "Prólogo",
            available: true,
            chapters: [prologoChapter]
        },
        {
            volume: "receitas",
            title: "Livro de Receitas",
            available: false,
            chapters: []
        }
    ]
};
