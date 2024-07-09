import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Booking from "@/models/bookingModel";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(request, { params }) {
    try {
        await validateTokenAndGetUserId(request);
        const reqBody = await request.json();
        const bookingid = params.bookingid;
        await Booking.findByIdAndUpdate(bookingid, reqBody);
        return NextResponse.json({ message: "Booking updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
