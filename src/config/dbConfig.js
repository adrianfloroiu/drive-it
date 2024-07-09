import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        try {
            cached.promise = await mongoose.connect(process.env.mongo_url);
            console.log("MongoDB Connection Successful");
        } catch (error) {
            console.error(error);
        }
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
