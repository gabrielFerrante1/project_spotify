import { ApiResponse } from "./Api"
import { Music } from "./Music"

export type SearchAll = ApiResponse & {
    data: Music[],
    count: number,
}