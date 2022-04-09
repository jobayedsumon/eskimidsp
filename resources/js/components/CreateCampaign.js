import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

const CreateCampaign = () => {
    const fileUploadEvent = (e) => {
        console.log("Upload event:", e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    const onFinish = (values) => {
        console.log("Success:", values);
       //submit form
        fetch("/campaigns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="m-auto mt-5">
            <div className="d-flex justify-content-between">
                <h1>Create New Campaign</h1>
                <Link to="/">
                    <Button type="primary">Campaign List</Button>
                </Link>
            </div>

            <div>
                <Form layout="horizontal" onFinish={onFinish}>
                    <Form.Item
                        label="Campaign Name"
                        name="campaign_name"
                        required
                        className="w-50"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Campaign Duration"
                        name="campaign_duration"
                        required
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        label="Total Budget (USD)"
                        name="total_budget"
                        required
                    >
                        <InputNumber
                            style={{ width: "200px" }}
                            min={0}
                            precision={2}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Daily Budget (USD)"
                        name="daily_budget"
                        required
                    >
                        <InputNumber
                            style={{ width: "200px" }}
                            min={0}
                            precision={2}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Creative Upload"
                        className="w-50"
                        required
                    >
                        <Form.Item
                            name="creative_upload"
                            valuePropName="fileList"
                            getValueFromEvent={fileUploadEvent}
                            noStyle
                        >
                            <Upload.Dragger
                                name="files"
                                multiple
                                listType="picture"
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag images to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Single or multiple images can be uploaded.
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Create Campaign</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateCampaign;
