import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import axios from "axios";
import { Table, Select, message } from "antd";

function Users() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get("/api/users");
            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const handleStatusChange = async (id, isActive) => {
        try {
            dispatch(SetLoading(true));
            await axios.put(`/api/users/${id}`, {
                isActive,
            });

            message.success("Status updated successfully");
            getData();
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (createdAt) => new Date(createdAt).toLocaleString(),
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (isActive, record) => (
                <Select
                    value={isActive}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record._id, value)}
                    options={[
                        { value: true, label: "Active" },
                        { value: false, label: "Inactive" },
                    ]}
                />
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={users}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
            />
        </div>
    );
}

export default Users;
