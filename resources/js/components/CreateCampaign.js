import React, {useState} from "react";
import {Button, DatePicker, Form, Input, InputNumber, Upload, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";

const {RangePicker} = DatePicker;

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const fileUploadEvent = (e) => {
        setFileList(e.fileList);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const onFinish = (values) => {
        const formData = new FormData();
        for (let [key, value] of Object.entries(values)) {
            if (key === 'campaign_duration') {
                formData.append('from_date', value[0].format('YYYY-MM-DD'));
                formData.append('to_date', value[1].format('YYYY-MM-DD'));
            } else if (key !== 'creative_upload') {
                formData.append(key, value);
            }
        }

        for (let i = 0; i < fileList.length; i++) {
            formData.append('creative_upload[]', fileList[i].originFileObj);
        }

        //submit form
        axios.post("/campaigns", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(res => {
            if (res.status === 201) {
                message.success('Campaign created successfully');
                navigate('/');
            } else {
                message.error("Campaign couldn't create");

            }

        })
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
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Campaign Duration"
                        name="campaign_duration"
                        required
                    >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item
                        label="Total Budget (USD)"
                        name="total_budget"
                        required
                    >
                        <InputNumber
                            style={{width: "200px"}}
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
                            style={{width: "200px"}}
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
                                    <InboxOutlined/>
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
