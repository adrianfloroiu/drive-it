import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Booking from "@/models/bookingModel";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

connectDB();

export async function POST(request) {
    try {
        const userId = await validateTokenAndGetUserId(request);
        const reqBody = await request.json();

        // Create customer
        const customer = await stripe.customers.create({
            email: reqBody.email,
            source: reqBody.token.id,
        });

        // Create charge
        const payment = await stripe.charges.create(
            {
                amount: reqBody.totalAmount * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: reqBody.email,
                description: "Drive It Booking",
            },
            {
                idempotencyKey: reqBody.token.id,
            }
        );

        reqBody.paymentId = payment.id;

        await Booking.create(reqBody);
        return NextResponse.json(
            { message: "Booking added successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    try {
        await validateTokenAndGetUserId(request);
        const { searchParams } = new URL(request.url);
        const user = searchParams.get("user");
        let filter = {};
        if (user) {
            filter.user = user;
        }

        const bookings = await Booking.find(filter)
            .populate("car")
            .populate("user");

        return NextResponse.json({ bookings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
