import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Layout, Menu,Button } from 'antd';
import axios from 'axios';
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  UploadOutlined,
  DatabaseOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import './AdminPage.css'
import Body from './Body'
import Account from './Body/Account'
import Movies from './Body/Movies'
import Theaters from './Body/Theaters'
import News from './Body/News'
import Advertisement from './Body/Advertisement'


const { Header,Footer, Sider } = Layout;

function AdminPage() {
    const initialState = 10000
    const [transAcount, settransAcount] = useState(0)
    const [transTheaters, settransTheaters] = useState(initialState)
    const [transMovies, settransMovies] = useState(initialState)
    const [transNews, settransNews] = useState(initialState)
    const [transAdvertisement, settransAdvertisement] = useState(initialState)

    const user = useSelector(state => state.auth.user)

    const ClickPage =(props)=>{
        
        settransAcount(initialState)
        settransTheaters(initialState)
        settransMovies(initialState)
        settransNews(initialState)
        settransAdvertisement(initialState)
        if(props.key == 'Account')  settransAcount(0);
        if(props.key == 'Theaters')  settransTheaters(0);
        if(props.key == 'Movies')  settransMovies(0);
        if(props.key == 'News') settransNews(0);
        if(props.key == 'Advertisement') settransAdvertisement(0);
    }
    const handleLogout = async() =>{
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href='/';
        } catch (error) {
            window.location.href='/';
        }
    }
    return (
        <div>
            <Layout>
                <Sider
                style={{
                    overflow:'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <div className='user-Admin'>{user.name}</div>
                    <Menu.Item onClick={ClickPage} key="Account" icon={<UserOutlined/>}>
                    Account
                    </Menu.Item>
                    <Menu.Item onClick={ClickPage} key="Theaters" icon={<DatabaseOutlined />}>
                    Theaters
                    </Menu.Item>
                    <Menu.Item onClick={ClickPage} key="Movies" icon={<UploadOutlined />}>
                    Movies
                    </Menu.Item>
                    <Menu.Item onClick={ClickPage} key="News" icon={<BarChartOutlined />}>
                    News
                    </Menu.Item>
                    <Menu.Item onClick={ClickPage} key="Advertisement" icon={<CloudOutlined />}>
                    Advertisement
                    </Menu.Item>
                    <Menu.Item onClick={handleLogout} key="Logout" icon={<PoweroffOutlined />}>
                    Logout
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="headder-admin">
                <marquee>This is the site for admin.</marquee>
                </Header>
                <div className='body-admin'>
                    <Account trans = {transAcount}/>
                    <Movies trans = {transMovies}/>
                    <Theaters trans = {transTheaters}/>
                    <News trans = {transNews}/>
                    <Advertisement trans = {transAdvertisement}/>
                </div>
                <Footer style={{ textAlign: 'center' }}>FRadar ©2021 Created by NhatLoi</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminPage
