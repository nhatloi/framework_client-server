import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Layout, Menu } from 'antd';
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
import Account from './Body/Account'
import Movies from './Body/Movies'
import Theaters from './Body/Theaters'
import News from './Body/News'
import Advertisement from './Body/Advertisement'


const { Header,Footer, Sider } = Layout;

function AdminPage() {
    const initialState = -1
    const [indexAcount, setindexAcount] = useState(1)
    const [indexTheaters, setindexTheaters] = useState(initialState)
    const [indexMovies, setindexMovies] = useState(initialState)
    const [indexNews, setindexNews] = useState(initialState)
    const [indexAdvertisement, setindexAdvertisement] = useState(initialState)

    const user = useSelector(state => state.auth.user)

    const ClickPage =(props)=>{
        
        setindexAcount(initialState)
        setindexTheaters(initialState)
        setindexMovies(initialState)
        setindexNews(initialState)
        setindexAdvertisement(initialState)
        if(props.key === 'Account')  setindexAcount(1);
        if(props.key === 'Theaters')  setindexTheaters(1);
        if(props.key === 'Movies')  setindexMovies(1);
        if(props.key === 'News') setindexNews(1);
        if(props.key === 'Advertisement') setindexAdvertisement(1);
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
                </Header>
                <div className='body-admin'>
                    <Account index = {indexAcount}/>
                    <Movies index = {indexMovies}/>
                    <Theaters index = {indexTheaters}/>
                    <News index = {indexNews}/>
                    <Advertisement index = {indexAdvertisement}/>
                </div>
                <div className = 'footer'>
                    <Footer style={{ textAlign: 'center' }}>FRadar ©2021 Created by NhatLoi</Footer>
                </div>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminPage
