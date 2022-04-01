import React, {useState} from 'react'

import {Button, Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UnorderedListOutlined,
    AppstoreAddOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Header, Sider, Content} = Layout;

const CommonLayout = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    return <Layout style={{minHeight: "100vh"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{marginTop: "60px"}}>
                <Menu.Item key="1" icon={<UnorderedListOutlined/>}>
                    <Link to='/'>
                        Campaign List
                    </Link>

                </Menu.Item>
                <Menu.Item key="2" icon={<AppstoreAddOutlined/>}>
                    <Link to='/new-campaign'>
                        New Campaign
                    </Link>
                </Menu.Item>

            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed)

                })}
            </Header>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {children}
            </Content>
        </Layout>
    </Layout>

}

export default CommonLayout;
