import * as React from 'react';

import {Link, useNavigate} from "react-router-dom";
import {Button, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


const CampaignList = () => {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([]);
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
                    <Button type="primary" onClick={() => navigate(`/edit-campaign/${record.id}`)}>

                        <EditOutlined/>
                    </Button>
                    <Button type="danger" onClick={() => deleteCampaign(record.id)}>
                        <DeleteOutlined/>

                    </Button>
                </Space>
            ),
        },
    ];

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
