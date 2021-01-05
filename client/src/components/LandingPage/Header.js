import React from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';
import logo from '../../access/images/Logo.png';    
import { Menu, Dropdown} from 'antd';
import { Button,Navbar,Nav,Form,FormControl} from 'react-bootstrap';
import LeftMenu from './LeftMenu'





function NavHeader() {
    //const
    const auth = useSelector(state => state.auth)
    
    const {user,isLogged} = auth;

    const handleLogout = async() =>{
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href='/';
        } catch (error) {
            window.location.href='/';
        }
    }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="/profile">Profile</a>
          </Menu.Item>
          <Menu.Item key="1">
            <label onClick={handleLogout}>Logout</label>
          </Menu.Item>
        </Menu>
    );

    const userInfor = () =>{
        return <Dropdown overlay={menu} trigger={['click']}>
            <div>
                <label className='user'>    
                <img alt='' src={user.avatar}/>
                {user.name}
                </label>
            </div>
    </Dropdown>
    }

    //


    // Render
    return (
        <div className='header'>
            <Navbar expand="lg">
                <Navbar.Brand href="/">
               
                    <img src={logo} alt=''/>
                    FRadar
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                        
                    </Nav>
                    {
                        isLogged?userInfor()
                        :
                        <a href='/login'>
                            <Button>Login</Button>
                        </a>
                    }
                </Navbar.Collapse>
                </Navbar>
                <LeftMenu/>
        </div>
    )
}

export default NavHeader
