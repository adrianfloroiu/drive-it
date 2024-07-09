import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Row, Button, Space } from "antd";

function Hero() {
    return (
        <section>
            <Row align={"middle"} gutter={[16, 16]}>
                <Col
                    xs={{ span: 24, order: 2 }}
                    md={{ span: 12, order: 1 }}
                    className="text-center"
                >
                    <Space direction="vertical" size="large">
                        <h1 className="text-3xl capitalize">
                            Book today and make every journey special
                        </h1>
                        <p className="text-md">
                            Choose from our wide selection of vehicles and enjoy
                            the convenience of flexible booking options and
                            competitive rates. Whether you're exploring a new
                            city or embarking on a cross-country road trip, our
                            vehicles ensure a smooth and memorable journey every
                            time
                        </p>
                        <Link href="/cars">
                            <Button type="primary" size="large">
                                Explore Cars
                            </Button>
                        </Link>
                    </Space>
                </Col>
                <Col
                    xs={{ span: 24, order: 1 }}
                    md={{ span: 12, order: 2 }}
                    style={{ height: "450px" }}
                >
                    <Image
                        priority
                        src="/home/hero-img.png"
                        alt="Hero Image"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </Col>
            </Row>
        </section>
    );
}

export default Hero;
