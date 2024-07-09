import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export async function POST(request) {
    const form = await request.formData();
    const image = form.get("image");
    const oldImage = form.get("oldImage");

    if (!image) {
        return NextResponse.json(
            { message: "No image found" },
            { status: 400 }
        );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const directory = join(process.cwd(), "public", "uploads");

    if (oldImage) {
        const oldImagePath = join(directory, oldImage);
        await unlink(oldImagePath);
    }

    const path = join(directory, image.name);
    await writeFile(path, buffer);

    return NextResponse.json({ message: "Image uploaded successfully" });
}
