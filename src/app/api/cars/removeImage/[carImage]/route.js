import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(request, { params }) {
    const directory = join(process.cwd(), "public", "uploads");
    const path = join(directory, params.carImage);
    try {
        await unlink(path);
        return NextResponse.json({ message: "Image deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
