import * as React from 'react';

import {Link, useNavigate} from "react-router-dom";
import {Button, Modal, Space, Table, Carousel} from "antd";
import {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import moment from "moment";


const CampaignList = () => {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([]);
    const [images, setImages] = useState([]);
    const [visible, setVisible] = useState(false);
    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'campaign_name',
            key: 'campaign_name',
        },
        {
            title: 'Campaign Duration',
            render: (text, record) => `${record.from_date} to ${record.to_date}`
        },
        {
            title: 'Total Budget',
            dataIndex: 'total_budget',
            key: 'total_budget',
            render: (text) => `$${text}`
        },
        {
            title: 'Daily Budget',
            dataIndex: 'daily_budget',
            key: 'total_budget',
            render: (text) => `$${text}`
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" success onClick={() => previewImages(record.id)}>
                        <EyeOutlined/>
                    </Button>
                    <Button type="primary" onClick={() => navigate(`/edit-campaign/${record.id}`)}>

                        <EditOutlined/>
                    </Button>
                    <Button type="primary" danger onClick={() => deleteCampaign(record.id)}>
                        <DeleteOutlined/>

                    </Button>
                </Space>
            ),
        },
    ];

    const previewImages = (id) => {
        axios.get(`/campaigns/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    if(data.creative_upload) {
                        setImages(JSON.parse(data.creative_upload));
                        setVisible(true);
                    }

                }
            })
            .catch((error) => console.error("Error:", error));
    }

    const getCampaigns = () => {
        fetch('http://localhost/campaigns', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setDataSource(data);
                console.log(dataSource);
            })
            .catch(error => console.log(error));
    }

    const deleteCampaign = (id) => {
        fetch(`http://localhost/campaigns/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
            .then(response => response.json())
            .then(data => {
                setDataSource(dataSource.filter(campaign => campaign.id !== id));
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getCampaigns()
    }, []);

    return (

        <div className="m-auto mt-5">

            <Modal
                title="Creative Uploads"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={800}
                footer={null}

            >
                <Carousel effect="fade">
                    {images && images.map((image, index) => (
                        <div key={index}>
                            <img height="300px" src={`/images/${image}`} alt=""/>
                        </div>
                    ))}
                </Carousel>
            </Modal>

            <div className="d-flex justify-content-between">
                <h1>Campaign List</h1>
                <Link to='/new-campaign'>
                    <Button type="primary">
                        New Campaign
                    </Button>
                </Link>
            </div>

            <Table bordered dataSource={dataSource} columns={columns}/>

        </div>


    );
}

export default CampaignList;
