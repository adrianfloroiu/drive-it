import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(request, { params }) {
    try {
        await validateTokenAndGetUserId(request);
        const reqBody = await request.json();
        if (reqBody.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(reqBody.password, salt);
            reqBody.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            params.userid,
            reqBody,
            {
                new: true,
            }
        );

        return NextResponse.json({
            message: "User updated successfully",
            updatedUser,
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
