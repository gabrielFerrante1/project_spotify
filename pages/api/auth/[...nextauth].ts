import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from '../../../libs/api'
import { AuthUser, User } from "../../../libs/types/AuthUser";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Senha', type: 'password' },
            },
            authorize: async (credentials, req) => {
                if (credentials && credentials.email && credentials.password) {
                    const user: AuthUser = await api('login', 'post', {
                        email: credentials.email,
                        password: credentials.password
                    })

                    if (user.error === '') {
                        return {
                            id: user.user.id,
                            name: user.user.name,
                            email: user.user.email,
                            jwt: user.jwt
                        }
                    }
                }

                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.user = user;
            return token
        },
        session: async ({ session, token }) => {
            if (token) session.user = token.user as User;
            return session
        }
    },
    pages: {
        signIn: '/login'
    }
}

export default NextAuth(authOptions);