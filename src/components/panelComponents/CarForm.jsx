import { SetLoading } from "@/redux/loaderSlice";
import { Col, Form, Modal, Row, Button, Upload, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

function CarForm({
    showCarFormModal,
    setShowCarFormModal,
    reloadData,
    selectedCar,
}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);

    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            let response = null;
            let oldImageName = "";

            if (selectedCar) {
                values._id = selectedCar._id;
                oldImageName = selectedCar.carImage;
                response = await axios.put(`/api/cars/${selectedCar._id}`, {
                    ...values,
                    carImage: imageFile.name,
                });
            } else {
                response = await axios.post("/api/cars", {
                    ...values,
                    carImage: imageFile.name,
                });
            }

            // Uploading image
            const formData = new FormData();
            formData.append("image", imageFile);
            if (oldImageName) {
                formData.append("oldImage", oldImageName);
            }

            await axios.post("/api/cars/uploadImage", formData);

            reloadData();
            message.success(response.data.message);
            setShowCarFormModal(false);
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const handleImageChange = (info) => {
        console.log(info.file.originFileObj);
        if (info.file.status === "done") {
            setImageFile(info.file.originFileObj);
        }
    };

    return (
        <Modal
            width={800}
            open={showCarFormModal}
            onCancel={() => setShowCarFormModal(false)}
            centered
            okText="Save"
            onOk={() => {
                form.submit();
            }}
        >
            <h1 className="text-center text-xl mb-3 uppercase">
                {selectedCar ? "Edit Car" : "Add Car"}
            </h1>

            <Form
                layout="vertical"
                className="flex flex-col gap-5 mb-3"
                onFinish={onFinish}
                form={form}
                initialValues={selectedCar}
            >
                <Form.Item label="Car Name" name="name">
                    <input type="text" />
                </Form.Item>

                <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                        <Form.Item label="Brand" name="brand">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item label="Year" name="year">
                            <input type="number" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Description" name="description">
                    <TextArea rows={4} style={{ fontSize: "1rem" }} />
                </Form.Item>

                <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                        <Form.Item label="Body Type" name="bodyType">
                            <select>
                                <option value="">Select Body Type</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Coupe">Coupe</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item label="Fuel Type" name="fuelType">
                            <select>
                                <option value="">Select Fuel Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                        <Form.Item label="Rent Per Hour" name="rentPerHour">
                            <input type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Seating Capacity"
                            name="seatingCapacity"
                        >
                            <input type="number" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Car Image" name="carImage">
                    <Upload
                        name="carImage"
                        listType="picture"
                        onChange={handleImageChange}
                    >
                        <Button>Select Image</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CarForm;
