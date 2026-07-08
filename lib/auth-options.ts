import { AuthOptions } from "next-auth";
import { connectToDatabase } from "./mongoose";
import User from "@/database/user.model";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email', type: 'email'
                },
                password: {
                    label: 'Password', type: 'password'
                },
            },
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({
                    email: credentials?.email
                });

                return user;
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string,
        }),
    ],

    callbacks: {
        async session({ session }) {
            await connectToDatabase();

            const isExistingUser = await User.findOne({email: session.user?.email});

            if (!isExistingUser) {
                const newUser = await User.create({
                    email: session.user?.email,
                    name: session.user?.name,
                    profileImage: session.user?.image,
                });

                session.currentUser = newUser;

                return session;
            }

            session.currentUser = isExistingUser;

            return session;
        },
    },

    debug: process.env.NODE_ENV === 'development',
    session: {strategy: 'jwt'},
    jwt: {secret: process.env.NEXTAUTH_JWT_SECRET!},
    secret: process.env.NEXTAUTH_SECRET!,   
}