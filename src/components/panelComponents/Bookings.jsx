import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            let url = "/api/bookings";
            if (!currentUser?.isAdmin) {
                url += `?user=${currentUser._id}`;
            }

            const response = await axios.get(url);
            setBookings(response.data.bookings);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const cancelBooking = async (bookingid) => {
        try {
            dispatch(SetLoading(true));
            await axios.put(`/api/bookings/${bookingid}`, {
                status: "cancelled",
            });

            message.success("Booking cancelled successfully");
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
            title: "Booking ID",
            dataIndex: "_id",
        },
        {
            title: "Car",
            dataIndex: "car",
            render: (car) => car.name,
        },
        {
            title: "User",
            dataIndex: "user",
            render: (user) => user.name,
        },
        {
            title: "Total Hours",
            dataIndex: "totalHours",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => status.toUpperCase(),
        },
        {
            title: "From",
            dataIndex: "fromSlot",
            render: (fromSlot) => new Date(fromSlot).toLocaleString(),
        },
        {
            title: "To",
            dataIndex: "toSlot",
            render: (toSlot) => new Date(toSlot).toLocaleString(),
        },
        {
            title: "Pickup",
            dataIndex: "pickupLocation",
        },
        {
            title: "Drop",
            dataIndex: "dropLocation",
        },
        {
            title: "Action",
            render: (record) =>
                record.status === "approved" && (
                    <Popconfirm
                        title="Cancel Booking?"
                        description="Canceling the booking will not refund the amount"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => cancelBooking(record._id)}
                    >
                        <Button danger>Cancel</Button>
                    </Popconfirm>
                ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={bookings}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
            />
        </div>
    );
}

export default Bookings;
