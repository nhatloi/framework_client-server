import React, {useState} from 'react'

import { Menu,Button} from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  HeartOutlined,
  FastForwardOutlined,
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
            <SubMenu key="In Theaters" icon={<AppstoreOutlined />} title="In Theaters">
              <Menu.Item key="up-comming">
              <a href="/intheaters/sap-chieu">Up Comming</a>
              </Menu.Item>
              <Menu.Item key="now-playing">
              <a href="/intheaters/dang-chieu">Now Playing</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
      </div>
    
    </div>
    )
}

export default LeftMenu
