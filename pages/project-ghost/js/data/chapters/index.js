import { prologoChapter } from "./volume1/prologo.js";

export const chaptersData = {
    totalVolumes: 2,
    volumes: [
        {
            volume: 1,
            title: "PROJECT GHOST",
            available: true,
            chapters: [
                prologoChapter
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
