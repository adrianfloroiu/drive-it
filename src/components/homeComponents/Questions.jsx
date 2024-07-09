import React from "react";
import { Collapse, Button } from "antd";
import Link from "next/link";

const items = [
    {
        key: "1",
        label: <span className="text-bold">How do I book a car?</span>,
        children: (
            <p>
                To book a car, you simply need to log in or create an account.
                After that, you can book a car by selecting the car you want to
                rent and filling out the booking form.
            </p>
        ),
    },
    {
        key: "2",
        label: <span className="text-bold">Can I cancel my booking?</span>,
        children: (
            <p>
                Yes, you can cancel your booking, but the ammount will not be
                automatically refunded. However, you can contact the admin and
                ask for a refund.
            </p>
        ),
    },
    {
        key: "3",
        label: <span className="text-bold">How do I pay for my booking?</span>,
        children: (
            <p>
                To make things easy, you can pay for your booking online using
                your credit card. We accept all major credit cards.
            </p>
        ),
    },
    {
        key: "4",
        label: <span className="text-bold">Where can I see my bookings?</span>,
        children: (
            <p>
                You need to be logged in to see your bookings. Once you log in,
                you can find your bookings by going to the panel and selecting
                the "Bookings" tab. In that tab, you can also cancel your
                booking.
            </p>
        ),
    },
];

function Questions() {
    return (
        <section className="mt-4">
            <div className="text-center">
                <h2 className="text-3xl underline">
                    Frequently Asked Questions
                </h2>
            </div>
            <div className="p-5 collapse-container">
                <Collapse items={items} size="large" />
            </div>
            <div className="p-5 text-center">
                <Link href="/contact">
                    <Button type="primary" size="large" shape="round">
                        Have a question? Contact us
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default Questions;
