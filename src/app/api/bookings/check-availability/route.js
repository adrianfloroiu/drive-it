import { connectDB } from "@/config/dbConfig";
import Booking from "@/models/bookingModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
    try {
        const { car, fromSlot, toSlot } = await request.json();
        const bookings = await Booking.find({
            car,
            status: "approved",
            $or: [
                {
                    fromSlot: {
                        $gte: fromSlot,
                        $lte: toSlot,
                    },
                },
                {
                    toSlot: {
                        $gte: fromSlot,
                        $lte: toSlot,
                    },
                },
                {
                    fromSlot: {
                        $lte: fromSlot,
                    },
                    toSlot: {
                        $gte: toSlot,
                    },
                },
                {
                    toSlot: { $gte: fromSlot, $lte: toSlot },
                    fromSlot: { $lte: fromSlot },
                },
            ],
        });

        const isAvailable = bookings.length === 0;

        return NextResponse.json({ isAvailable });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
