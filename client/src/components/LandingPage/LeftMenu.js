import React, {useState} from 'react'

import { Menu,Button} from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  HeartOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;


function LeftMenu() {

  const [collapsed, setcollapsed] = useState(true)

    return (

      <div className='left-menu'>
            <Button
                onClick={()=>{setcollapsed (!collapsed)}}
                style={{width:'100%'}}>
                < MenuOutlined/>
            </Button>
      <div>
          <Menu
            defaultSelectedKeys={['home']}
            mode="inline"
            theme="light"
            inlineCollapsed = {collapsed}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
            <a href='/'>Home</a>
            </Menu.Item>
            <Menu.Item key="favorite" icon={<HeartOutlined />}>
            <a href="/favorite">Favorite</a>
            </Menu.Item>
            <SubMenu key="Freemovies" icon={<MailOutlined />} title="Free movies">
              <Menu.Item key="Movie theaters">
                <a href="/freemovies/Movie theaters">Free movies</a>
              </Menu.Item>
              <Menu.Item key="Good movies">
                <a href="/freemovies/Good movies">Good movies</a>
              </Menu.Item>
              <Menu.Item key="Odd movies">
                <a href="/freemovies/Odd movies">Odd movies</a>
              </Menu.Item>
              <Menu.Item key="Series movies">
                <a href="/freemovies/Series movies">Series movie</a>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
      </div>
    
    </div>
    )
}

export default LeftMenu
