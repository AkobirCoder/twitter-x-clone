import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        currentUser: unknown,
        user: {} & DefaultSession['user'],
    }
}