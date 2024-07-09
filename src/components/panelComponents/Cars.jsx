import { Button, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import CarForm from "./CarForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import axios from "axios";

function Cars() {
    const [cars, setCars] = useState([]);
    const [showCarFormModal, setShowCarFormModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get("/api/cars");
            setCars(response.data.cars);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const deleteCar = async (car) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.delete(`/api/cars/${car._id}`);

            // Delete image
            await axios.delete(`/api/cars/removeImage/${car.carImage}`);
            message.success(response.data.message);
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
            title: "Car Image",
            dataIndex: "carImage",
            render: (carImage) => (
                <img src={`/uploads/${carImage}`} alt="car" width="80" />
            ),
        },
        {
            title: "Car Name",
            dataIndex: "name",
        },
        {
            title: "Brand",
            dataIndex: "brand",
        },
        {
            title: "Year",
            dataIndex: "year",
        },
        {
            title: "Body Type",
            dataIndex: "bodyType",
        },
        {
            title: "Fuel Type",
            dataIndex: "fuelType",
        },
        {
            title: "Rent Per Hour",
            dataIndex: "rentPerHour",
        },
        {
            title: "Seating Capacity",
            dataIndex: "seatingCapacity",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div className="flex gap-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="30"
                        className="cursor-pointer"
                        onClick={() => {
                            setSelectedCar(record);
                            setShowCarFormModal(true);
                        }}
                    >
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="30"
                        className="cursor-pointer"
                        onClick={() => {
                            deleteCar(record);
                        }}
                    >
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                    </svg>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-end">
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedCar(null);
                        setShowCarFormModal(true);
                    }}
                >
                    Add Car
                </Button>
            </div>

            <Table
                dataSource={cars}
                columns={columns}
                pagination={{ pageSize: 4 }}
                rowKey="_id"
            />

            {showCarFormModal && (
                <CarForm
                    setShowCarFormModal={setShowCarFormModal}
                    showCarFormModal={showCarFormModal}
                    selectedCar={selectedCar}
                    reloadData={getData}
                />
            )}
        </div>
    );
}

export default Cars;
