import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        // Check if user exists
        const user = await User.findOne({ email: reqBody.email });
        if (!user) {
            throw new Error("User not found");
        }

        // Check user status
        if (!user.isActive) {
            throw new Error("User is not active, please contact the admin");
        }

        // Check password
        const validPassword = await bcrypt.compare(
            reqBody.password,
            user.password
        );

        if (!validPassword) {
            throw new Error("Invalid password");
        }

        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

        // Create token
        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });

        // Set cookie
        response.cookies.set("token", token, {
            path: "/",
            httpOnly: true,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
