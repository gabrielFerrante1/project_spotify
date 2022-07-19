import { Playlist } from "./Playlist"

export type MyPlaylist = {
    error: string,
    playlist?: {
        id: number,
        name: string,
        avatar: string,
        privacy: number,
        musics: Playlist[]
    }
}