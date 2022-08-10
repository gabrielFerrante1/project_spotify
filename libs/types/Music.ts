import { ApiResponse } from "./Api"

export type Music = {
    id: number,
    name: string,
    path: string,
    avatar: string,
    author: string,
    genre: string,
    privacy: number,
    tipo?: 'Música' | 'Playlist',
    musics?: Music[]
}

export type LastMusic = ApiResponse & {
    music: Music
}