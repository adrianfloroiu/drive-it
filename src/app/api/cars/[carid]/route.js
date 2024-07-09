import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const userId = await validateTokenAndGetUserId(request);
        const car = await Car.findById(params.carid);
        return NextResponse.json({ car });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function PUT(request) {
    try {
        const userId = await validateTokenAndGetUserId(request);
        const reqBody = await request.json();
        await Car.findByIdAndUpdate(reqBody._id, reqBody);
        return NextResponse.json({ message: "Car updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const userId = await validateTokenAndGetUserId(request);
        await Car.findByIdAndDelete(params.carid);
        return NextResponse.json({ message: "Car deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
