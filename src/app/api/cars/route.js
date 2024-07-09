import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
    try {
        const userId = await validateTokenAndGetUserId(request);
        const reqBody = await request.json();
        reqBody.addedBy = userId;
        const car = await Car.create(reqBody);
        return NextResponse.json(
            { message: "Car added successfully", car },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const brand = searchParams.get("brand") || "";
        const body = searchParams.get("body") || "";
        const sort = searchParams.get("sort") || "";
        const limit = parseInt(searchParams.get("limit"));
        const page = parseInt(searchParams.get("page"));

        await validateTokenAndGetUserId(request);

        // Filtering
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        if (brand) {
            query.brand = { $regex: brand, $options: "i" };
        }
        if (body) {
            query.bodyType = { $regex: body, $options: "i" };
        }

        // Sorting
        let sortOrder = {};
        if (sort === "asc") {
            sortOrder = { rentPerHour: 1 };
        } else if (sort === "desc") {
            sortOrder = { rentPerHour: -1 };
        }

        const totalCars = await Car.countDocuments(query);

        let cars = await Car.find(query)
            .sort(sortOrder)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPages = Math.ceil(totalCars / limit);

        return NextResponse.json(
            { cars, totalCars, totalPages },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
