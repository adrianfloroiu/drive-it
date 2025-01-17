import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        // Check if user already exists
        const userExists = await User.findOne({ email: reqBody.email });
        if (userExists) {
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        // Create user
        await User.create(reqBody);

        return NextResponse.json(
            {
                message: "User created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
