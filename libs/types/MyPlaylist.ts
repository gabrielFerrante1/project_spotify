import { ApiResponse } from "./Api"
import { Music } from "./Music"

export type Playlist = {
    id: number,
    name: string,
    avatar: string,
    privacy: number,
    musics: Music[]
}

export type MyPlaylists = ApiResponse & {
    playlist: Playlist[]
}

export type MyPlaylist = ApiResponse & {
    playlist?: Playlist
}