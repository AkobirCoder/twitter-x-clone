import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from '@/database/user.model';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);

        const step = searchParams.get('step');

        if (step === "1") {
            const { email } = await req.json();

            const isExistingUser = await User.findOne({ email });

            if (isExistingUser) {
                return NextResponse.json(
                    {
                        error: 'Email already exist. Please try another email.'
                    },
                    {
                        status: 400
                    }
                );
            }

            return NextResponse.json({success: true});
        } else if (step === "2") {
            const { email, name, username, password } = await req.json();

            const isExistingUsername = await User.findOne({ username });

            if (isExistingUsername) {
                return NextResponse.json(
                    {
                        error: 'Username already exist. Please try another username.'
                    },
                    {
                        status: 400
                    }
                );
            }

            const hashedPassword = await hash(password, 10);

            const user = await User.create({
                email,
                name,
                username,
                password: hashedPassword,
            });

            return NextResponse.json({success: true, user});
        }
    } catch (error) {
        const result = error as Error;

        return NextResponse.json({error: result.message}, {status: 400});
    }
}