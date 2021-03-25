import React from 'react'
import { Layout} from 'antd';
import LeftMenu from './LangdingPage/LeftMenu'
import Body from './LangdingPage/Body'
const { Sider } = Layout;

function AdminPage() {

    return (
        <div>
            <Layout>
                <Sider
                style={{
                    overflow:'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    background:'white'
                }}>
                <LeftMenu/>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Body/>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminPage
