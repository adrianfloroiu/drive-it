"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import bgImage from "../../../public/register-background.jpg";
import { Button, Form, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Register() {
    const router = useRouter();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/users/register", values);
            message.success(response.data.message);
            router.push("/login");
        } catch (error) {
            message.error(error.response.data.message || error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return (
        <div
            className="w-100 flex justify-center items-center h-screen"
            style={{
                height: "calc(100vh - 64px)",
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: "cover",
            }}
        >
            <div className="w-500 card p-5 bg-white">
                <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                    <h1 className="text-2xl uppercase text-center">Register</h1>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-5">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Name can't be empty!",
                                },
                            ]}
                        >
                            <input type="text" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email can't be empty!",
                                },
                            ]}
                        >
                            <input type="email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Password can't be empty!",
                                },
                                {
                                    min: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                            ]}
                        >
                            <input type="password" />
                        </Form.Item>

                        <Button type="primary" block htmlType="submit">
                            Register
                        </Button>

                        <span>
                            <Link href="/login">
                                Already have an account? Login
                            </Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
