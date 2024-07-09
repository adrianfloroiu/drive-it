"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loaderSlice";
import CarSpecs from "./CarSpecs";
import { useRouter } from "next/navigation";
import { Button, DatePicker, Select, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { locations } from "@/helpers/locations";

const { RangePicker } = DatePicker;

function CarDetails({ car }) {
    const [isSlotAvailable, setIsSlotAvailable] = useState(false);
    const [fromSlot, setFromSlot] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropLocation, setDropLocation] = useState(null);
    const [toSlot, setToSlot] = useState(null);
    const router = useRouter();
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    const bookNow = async (token) => {
        const payload = {
            car: car._id,
            user: currentUser._id,
            fromSlot,
            toSlot,
            pickupLocation,
            dropLocation,
            totalHours: Math.floor((toSlot - fromSlot) / (1000 * 3600)),
            totalAmount:
                car.rentPerHour *
                Math.floor((toSlot - fromSlot) / (1000 * 3600)),
            token,
        };

        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/bookings", payload);
            message.success(response.data.message);
            router.push("/panel");
        } catch (error) {
            message.error(error.response.data.message || error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const checkAvailability = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post(
                "/api/bookings/check-availability",
                {
                    car: car._id,
                    fromSlot,
                    toSlot,
                }
            );

            if (response.data.isAvailable) {
                message.success("Slot is available");
                setIsSlotAvailable(true);
            } else {
                throw new Error("Slot is not available");
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    useEffect(() => {
        setIsSlotAvailable(false);
    }, [fromSlot, toSlot]);

    return (
        <div className="py-4">
            <div className="car-details">
                <h2 className="text-2xl text-bolder text-center mb-4">
                    {car.name}
                </h2>
                <p className="text-center text-md spaced-lines mb-4">
                    {car.description}
                </p>
                <CarSpecs car={car} />
            </div>
            <div className="mt-4 flex flex-col items-center gap-3">
                <h2 className="text-2xl text-center">Rental Duration</h2>
                <div className="flex gap-4 justify-center items-center wrap mb-3">
                    <RangePicker
                        placeholder={["Pick-up Date", "Return Date"]}
                        size="large"
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(value) => {
                            setFromSlot(value ? value[0].toDate() : null);
                            setToSlot(value ? value[1].toDate() : null);
                        }}
                        disabledDate={(current) =>
                            current && current < new Date().setHours(0, 0, 0, 0)
                        }
                    />
                    <Button
                        type="primary"
                        disabled={!fromSlot || !toSlot}
                        onClick={checkAvailability}
                    >
                        Check Availability
                    </Button>
                </div>
                {fromSlot && toSlot && (
                    <>
                        <h2 className="text-2xl text-center">Locations</h2>
                        <div className="flex gap-4 justify-center items-center wrap mb-3">
                            <Select
                                placeholder="Pick-up Location"
                                style={{ width: 200 }}
                                onChange={(value) => setPickupLocation(value)}
                                options={locations}
                            />
                            <Select
                                placeholder="Drop Location"
                                style={{ width: 200 }}
                                onChange={(value) => setDropLocation(value)}
                                options={locations}
                            />
                        </div>
                        <h2 className="text-lg">
                            Total Hours:{" "}
                            <span className="text-normal">
                                {Math.floor(
                                    (toSlot - fromSlot) / (1000 * 3600)
                                )}
                            </span>
                        </h2>
                        <h2 className="text-lg">
                            Total Amount:{" "}
                            <span className="text-normal">
                                {car.rentPerHour *
                                    Math.floor(
                                        (toSlot - fromSlot) / (1000 * 3600)
                                    )}{" "}
                                $
                            </span>
                        </h2>
                    </>
                )}
            </div>
            <div className="flex justify-center gap-2 wrap mt-5">
                <Button size="large" onClick={() => router.back()}>
                    Back to cars
                </Button>
                <StripeCheckout
                    name="Drive It - Pay Now"
                    stripeKey={stripeKey}
                    token={bookNow}
                    currency="USD"
                    amount={
                        car.rentPerHour *
                        Math.floor((toSlot - fromSlot) / (1000 * 3600)) *
                        100
                    }
                    shippingAddress
                >
                    <Button
                        size="large"
                        type="primary"
                        disabled={!isSlotAvailable}
                    >
                        Book now
                    </Button>
                </StripeCheckout>
            </div>
        </div>
    );
}

export default CarDetails;
