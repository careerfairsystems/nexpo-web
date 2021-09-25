import 'antd/dist/antd.css';
import React, { useState } from 'react';
import './SidebarDrawer.css';
import { Menu, Drawer, Button } from 'antd';
/* import {
  MenuOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined
} from '@ant-design/icons'; */

const { SubMenu } = Menu;

const SidebarDrawer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showDrawer = () => {
    setIsVisible(true);
  };

  const closeDrawer = () => {
    setIsVisible(false);
  };

  return (
    <>
      <nav className="menu-button">
        <Button
          className="button"
          onClose={() => setIsVisible(false)}
          onClick={showDrawer}
          icon={<MenuOutlined />}
        />
      </nav>
      <div className="drawer">
        <Drawer
          visible={isVisible}
          onClose={closeDrawer}
          placement="left"
          title="Accelerator Lab"
          width={270}
        >
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
          >
            <Menu.Item key="1" icon={<MailOutlined />}>
              Navigation One
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
              Navigation Two
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<AppstoreOutlined />}
              title="Navigation Two"
            >
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
              <SubMenu key="sub1-2" title="Submenu">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<SettingOutlined />}
              title="Navigation Three"
            >
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
            </SubMenu>
            <Menu.Item key="link" icon={<LinkOutlined />}>
              <a
                href="https://ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ant Design
              </a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </>
  );
};

export default SidebarDrawer;
