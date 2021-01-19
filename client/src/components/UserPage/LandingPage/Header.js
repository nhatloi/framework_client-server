import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';
import logo from '../../../access/images/Logo.png';    
import { Menu, Dropdown} from 'antd';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
  } from 'reactstrap';
import LeftMenu from './LeftMenu'
import { Drawer } from 'antd';
import Login from '../../auth/Login'





function NavHeader() {
    //const
    const auth = useSelector(state => state.auth)
    const {user,isLogged} = auth;
    const [visible, setvisible] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = async() =>{
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href='/';
        } catch (error) {
            window.location.href='/';
        }
    }
    const handleLogin =() =>{
        setvisible (!visible)
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
            <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
            <img alt='logo' src={logo}/>
            FRadar</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/news">News</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Movie theaters
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink href="/freemovies/phim-chieu-rap">Movie theaters</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/freemovies/phim-hay">Good Movies</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/freemovies/phim-bo">series Movies</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/freemovies/phim-le">odd Movies</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Movie theaters
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink href="/intheaters/sap-chieu">Up comming</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink href="/intheaters/dang-chieu">Now Play</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {isLogged?userInfor()
          :
          <div><Button onClick={handleLogin}>login</Button>
                <Drawer
                    title="Login"
                    placement="right"
                    onClose={handleLogin}
                    visible={visible}>
                    <Login/>
                </Drawer>
          </div>
          
          }
        </Collapse>
      </Navbar>
        <LeftMenu/>
        </div>
    )
}

export default NavHeader
