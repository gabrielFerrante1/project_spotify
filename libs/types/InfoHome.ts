import { ApiResponse } from "./Api";
import { Music } from "./Music";
import { Playlist } from "./MyPlaylist";

export type InfoHome = ApiResponse & {
    most_listened_genres?: { name: string; color: string; }[],
    featured_playlist: Playlist[]
}