"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, message } from "antd";

const { TextArea } = Input;

function Contact() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentUser } = useSelector((state) => state.user);

    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/contact", values);
            message.success(response.data.message);
            router.push("/");
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return (
        <div className="p-5 mx-auto">
            <div className="text-center">
                <h1 className="text-3xl text-bolder">Contact Us</h1>
            </div>
            <div className="p-5 flex justify-center gap-6 wrap">
                <Image
                    src="/contact/contact-img.jpg"
                    priority
                    width={450}
                    height={400}
                    alt="contact"
                />

                <Form
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    initialValues={{
                        name: currentUser?.name,
                        email: currentUser?.email,
                    }}
                    style={{ width: "23rem" }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: "Please input your message",
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Button type="primary" block htmlType="submit">
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Contact;
