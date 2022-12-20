import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom"
import logo from "../../assets/images/Isuzu-Logo.png"
import { useAuthContext } from '../../utils/context';
const { Header, Content, Footer } = Layout;

const MainLayout = (props: any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%"}}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div
          style={{
            float: 'left',
            width: 120,
            height: 40,
            margin: '12px 24px 16px 0',
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
            <img src={logo} style={{ width: "100%", height: "100%", objectFit: "scale-down"}}/>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0px 0px' }}>
        <div style={{ padding: 24, minHeight: 380, height: "100%", boxSizing: "border-box", overflow: "auto", background: colorBgContainer }}>
            {<Outlet />}
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
  );
};

export default MainLayout;