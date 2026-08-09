import { prologoChapter } from "./volume1/prologo.js";
import { capitulo_1 } from "./volume1/capitulo_1.js";

export const chaptersData = {
    totalVolumes: 3,
    volumes: [
        {
            volume: 1,
            title: "PROJECT GHOST",
            available: true,
            chapters: [
                prologoChapter,
                capitulo_1
            ]
        },
        {
            volume: 2,
            title: "Livro de Receitas",
            available: false,
            chapters: []
        },
        {
            volume: 3,
            title: "Art Book",
            available: false,
            chapters: []
        }
    ]
};
