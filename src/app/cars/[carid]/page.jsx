import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import CarDetails from "@/components/carsComponents/CarDetails";
import { Image } from "antd";

export async function getCar(carId) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token").value;
        const response = await axios.get(
            `${process.env.domain}/api/cars/${carId}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
            }
        );

        return response.data.car;
    } catch (error) {
        console.log(error);
    }
}

export default async function CarInfo({ params }) {
    const car = await getCar(params?.carid);

    return (
        car && (
            <div className="p-5 flex justify-center items-center">
                <div className="card-info p-3 flex flex-col items-center rounded bg-white shadow">
                    <div style={{ width: "75%" }}>
                        <Image
                            className="rounded"
                            src={`/uploads/${car.carImage}`}
                            alt={car.name}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        />
                    </div>
                    <CarDetails car={car} />
                </div>
            </div>
        )
    );
}
