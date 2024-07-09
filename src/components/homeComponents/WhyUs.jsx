"use client";
import React from "react";
import { Card, List, Space } from "antd";

const data = [
    {
        title: "Best Prices",
        content:
            "Unbeatable affordability awaits you. Enjoy budget-friendly rates without compromising on quality, ensuring you get the best value for the money you spend",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                width={60}
            >
                <path d="M3.00488 6.99972L11.4502 1.36952C11.7861 1.14559 12.2237 1.14559 12.5596 1.36952L21.0049 6.99972V20.9997C21.0049 21.552 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.552 3.00488 20.9997V6.99972ZM12.0049 10.9997C13.1095 10.9997 14.0049 10.1043 14.0049 8.99972C14.0049 7.89515 13.1095 6.99972 12.0049 6.99972C10.9003 6.99972 10.0049 7.89515 10.0049 8.99972C10.0049 10.1043 10.9003 10.9997 12.0049 10.9997Z"></path>
            </svg>
        ),
    },
    {
        title: "Quality Cars",
        content:
            "Experience the difference with our meticulously maintained fleet. From sleek sedans to spacious SUVs, our top-notch vehicles guarantee a smooth and comfortable ride",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width={60}
            >
                <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V12L4.51334 5.29775C4.80607 4.51715 5.55231 4 6.386 4H17.614C18.4477 4 19.1939 4.51715 19.4867 5.29775L22 12V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM4.136 12H19.864L17.614 6H6.386L4.136 12ZM6.5 17C7.32843 17 8 16.3284 8 15.5C8 14.6716 7.32843 14 6.5 14C5.67157 14 5 14.6716 5 15.5C5 16.3284 5.67157 17 6.5 17ZM17.5 17C18.3284 17 19 16.3284 19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17Z"></path>
            </svg>
        ),
    },
    {
        title: "Fast And Safe",
        content:
            "Your safety and time are our top priorities. With our efficient service and commitment to strict safety standards, rest assured you'll hit the road swiftly and securely",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="blue"
                width={60}
            >
                <path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM13 10V5L8 12H11V17L16 10H13Z"></path>
            </svg>
        ),
    },
];

function WhyUs() {
    return (
        <section className="mt-4">
            <div className="text-center">
                <h2 className="text-3xl underline">Why Choose Us</h2>
            </div>
            <div className="p-5">
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                className="text-center"
                                hoverable
                                title={item.title}
                            >
                                <Space direction="vertical" size="large">
                                    <div>{item.icon}</div>
                                    <p className="text-md">{item.content}</p>
                                </Space>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </section>
    );
}

export default WhyUs;
