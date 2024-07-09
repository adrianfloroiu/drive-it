import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import { SetCurrentUser } from "@/redux/userSlice";
import axios from "axios";
import { Form, Button, message } from "antd";

function General() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            if (values.password === values.confirmPassword) {
                const response = await axios.put(
                    `/api/users/${currentUser._id}`,
                    values
                );

                dispatch(SetCurrentUser(response.data.updatedUser));
                message.success("Profile updated successfully");
            } else {
                message.error("Passwords do not match");
            }
        } catch (error) {
            message.error(error.response.data.message || error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return (
        <div style={{ maxWidth: "500px" }}>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    name: currentUser?.name,
                    email: currentUser?.email,
                }}
            >
                <h1 className="text-2xl text-center mb-4">Update Profile</h1>

                <Form.Item label="Name" name="name">
                    <input type="text" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "Please enter a valid email",
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
                            min: 8,
                            message:
                                "Password must be at least 8 characters long",
                        },
                    ]}
                >
                    <input type="password" />
                </Form.Item>

                <Form.Item label="Confirm Password" name="confirmPassword">
                    <input type="password" />
                </Form.Item>

                <Button type="primary" block htmlType="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default General;
