import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import '@/css/App.css'
const { Sider, Content } = Layout;
class Play extends React.Component {
  render() {
    return (
      <Layout className="lay-out">
        <Sider>Play</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    );
  }
}

export default Play;
