import { ApiResponse } from "./Api";

export type User = {
    id: number;
    name: string;
    email: string;
    jwt: string;
}

export type AuthUser = ApiResponse & {
    user: User; 
    jwt: string;
}