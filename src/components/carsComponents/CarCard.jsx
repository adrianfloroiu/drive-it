"use client";
import React from "react";
import Link from "next/link";
import { Card } from "antd";

const { Meta } = Card;

function CarCard({ car }) {
    return (
        <Link href={`/cars/${car._id}`}>
            <Card
                style={{ width: 350, height: 350, padding: 10 }}
                hoverable
                cover={
                    <img
                        src={`/uploads/${car.carImage}`}
                        alt={car.name}
                        style={{ height: "245px", objectFit: "cover" }}
                    />
                }
            >
                <Meta
                    title={car.name + " (" + car.year + ")"}
                    description={car.rentPerHour + "$ / hour"}
                    className="text-center text-md"
                />
            </Card>
        </Link>
    );
}

export default CarCard;
