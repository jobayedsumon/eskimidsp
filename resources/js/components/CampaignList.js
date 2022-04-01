import * as React from 'react';

import {Link} from "react-router-dom";
import {Button, Space, Table} from "antd";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const CampaignList = () => {
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

            <Table dataSource={dataSource} columns={columns}/>

        </div>


    );
}

export default CampaignList;
