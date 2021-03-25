import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Menu} from 'antd';
import {PoweroffOutlined,
    VideoCameraOutlined,
    BankOutlined,
    TableOutlined,
    PlayCircleOutlined,
    BarcodeOutlined,
    FundOutlined,
    FundViewOutlined,
    UserOutlined,
} from '@ant-design/icons';

function LeftMenu() {

    const user = useSelector(state => state.auth.user)
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
            <Menu style={{height:"100vh"}} theme="dark" mode="inline">
                    <div className='user-Admin'>{user.name}</div>
                    <Menu.Item key="account" icon={<UserOutlined />}><a href='/account'/>Account</Menu.Item>
                    <Menu.Item key="movies" icon={<VideoCameraOutlined />}><a href='/movies'/>Movies</Menu.Item>
                    <Menu.Item key="theaters" icon={<BankOutlined />}><a href='/theaters'/>Theaters</Menu.Item>
                    <Menu.Item key="theaters-room" icon={<TableOutlined />}><a href='/theaters-room'/>Theaters Room</Menu.Item>
                    <Menu.Item key="screening" icon={<PlayCircleOutlined />}><a href='/screening'/>Screening</Menu.Item>
                    <Menu.Item key="tickets" icon={<BarcodeOutlined />}><a href='/tickets'/>Tickets</Menu.Item>
                    <Menu.Item key="news" icon={<FundOutlined />}><a href='/news'/>News</Menu.Item>
                    <Menu.Item key="advertisement" icon={<FundViewOutlined />}><a href='/advertisement'/>Advertisement</Menu.Item>
                <Menu.Item onClick={handleLogout} key="logout" icon={<PoweroffOutlined />}>
                    Logout
                    </Menu.Item>
            </Menu>
        </div>
    )
}

export default LeftMenu
