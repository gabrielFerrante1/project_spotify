export type Playlist = {
    id: number,
    name: string,
    path: string,
    avatar: string,
    author: string,
    privacy: number,
    tipo?: 'Música' | 'Playlist',
    musics?: Playlist[]
}