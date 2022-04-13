import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, InputNumber, Upload, message, Row, Col, Card, Image} from "antd";
import {InboxOutlined, DeleteOutlined} from "@ant-design/icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import Meta from "antd/es/card/Meta";

const {RangePicker} = DatePicker;

const EditCampaign = () => {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [images, setImages] = useState([]);
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

        if(images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images[]', images[i]);
            }
        }

        formData.append('_method', 'patch');
        //submit form
        axios.post("/campaigns/"+id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
            .then(res => {
                if (res.status === 201) {
                    message.success('Campaign updated successfully');
                    navigate('/');
                } else {
                    message.error("Campaign couldn't update");

                }

            })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        axios.get(`/campaigns/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    form.setFieldsValue({
                        campaign_name: data.campaign_name,
                        daily_budget: data.daily_budget,
                        total_budget: data.total_budget,
                        campaign_duration: [moment(data.from_date), moment(data.to_date)],
                    });
                    if(data.creative_upload) {
                        setImages(JSON.parse(data.creative_upload));
                    }

                }
            })
            .catch((error) => console.error("Error:", error));

        return () => {
            form.resetFields();
            setFileList([]);
        };
    }, [id]);

    const deleteImage = (image) => {
        const newImages = images.filter(item => item !== image);
        setImages(newImages);
    };

    return (

        <div className="m-auto mt-5">
            <Row gutter={24}>
                <Col  style={{borderRight: "1px solid #1890ff"}} span={14}>
                    <div>
                        <h1>Update Campaign</h1>
                        <Form form={form} layout="horizontal" onFinish={onFinish}>
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
                                style={{width: "80%"}}
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
                                <Button type="primary" htmlType="submit">Update Campaign</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>

                <Col span={10}>
                    <div className="d-flex justify-content-between">
                        <h3>Available Creative Uploads</h3>
                        <Link to="/" className="float-right">
                            <Button type="primary">Campaign List</Button>
                        </Link>
                    </div>

                    <Row gutter={24}>
                        {images && images.map((image, index) => (
                            <Col span={12} key={index} className="mb-3">
                                <Card
                                    hoverable
                                    cover={<Image src={`/images/${image}`} />}
                                >
                                    <Meta title={<Button type="danger" onClick={() => deleteImage(image)}>
                                        <DeleteOutlined />
                                    </Button>}/>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </Col>
            </Row>

        </div>
    );
};

export default EditCampaign;
