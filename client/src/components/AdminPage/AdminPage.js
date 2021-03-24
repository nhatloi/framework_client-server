import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Layout, Menu,Anchor ,Button,Space,Form,Input,Modal} from 'antd';
import axios from 'axios';
import {
  PoweroffOutlined
} from '@ant-design/icons';
import './AdminPage.css'
import Account from './Body/Account'
import Movie from './Body/Movie'
import Theaters from './Body/Theaters'
import News from './Body/News'
import Theater_room from './Body/Theater_room'
import Screening from './Body/Screening'
import Tickets from './Body/Tickets'
import Advertisement from './Body/Advertisement'
import AddNew from './Body/AddNew'
import AddNewMovie from './Body/commons/AddNewMovie'


const { Sider } = Layout;
const { Link } = Anchor;

function AdminPage() {

    const user = useSelector(state => state.auth.user)
    const [visible, setvisible] = useState(false)


    const handleLogout = async() =>{
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href='/';
        } catch (error) {
            window.location.href='/';
        }
    }
    const handleAdd = async() =>{
        try {
            setvisible(!visible)
        } catch (error) {
            console.log(error)
        }
    }
    const info = () =>{
        Modal.info({
          title: 'This is a notification message',
          content: (
            <div>
              <p>some messages...some messages...</p>
              <p>some messages...some messages...</p>
            </div>
          ),
          onCancel() {},
        });
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
                    background:'white'
                }}>
                <Anchor>
                <Menu mode="inline">
                    <div className='user-Admin'>{user.name}</div>
                    <div>
                        <Link href="#account" title="Account"/>
                        <Link href="#movies" title="Movies" />
                        <Link href="#theaters" title="Theaters" />
                        <Link href="#theaters-room" title="Theaters Room" />
                        <Link href="#screening" title="Screening" />
                        <Link href="#tickets" title="Tickets" />
                        <Link href="#news" title="News" />
                        <Link href="#advertisement" title="Advertisement" />
                    </div>
                <Menu.Item onClick={handleLogout} key="Logout" icon={<PoweroffOutlined />}>
                    Logout
                    </Menu.Item>
                </Menu>
                </Anchor>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <div className='body-admin'>
                    <div id="account"><Account/></div>
                    <div id="movies"><Movie/></div>
                    <div id="theaters"><Theaters/></div>
                    <div id="theaters-room"><Theater_room/></div>
                    <div id="screening"><Screening/></div>
                    <div id="tickets"><Tickets/></div>
                    <div id="news"><News/></div>
                    <div id="advertisement"><Advertisement/></div>
                </div>
                </Layout>
            </Layout>
            <div className="button_add">
                <Button onClick={info}>ADD</Button>
            </div>


            <Space>
                           <Form   onFinish={handleAdd}
                                    name="basic"
                            >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" onClick={handleAdd}>
                                Submit
                                </Button>
                            </Form.Item>
                            </Form>
            </Space>
        </div>
    )
}

export default AdminPage
