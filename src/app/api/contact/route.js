import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, email, message } = reqBody;
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.google_app_email,
                pass: process.env.google_app_password,
            },
        });

        const mailOptions = {
            from: "Drive It <" + process.env.google_app_email + ">",
            to: process.env.google_app_email,
            replyTo: email,
            subject: `Drive It - New message from ${name}`,
            text: message,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            message: "Message sent successfully",
        });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
