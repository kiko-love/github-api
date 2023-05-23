import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CardDetails from "@/components/cardDetails";
import "@/css/App.css";
const { Sider, Content } = Layout;

const Play: React.FC = () => {
  const state = useSelector((store: any) => store.user);
  return (
    <Layout className="lay-out">
      <Sider>
        <div className="sider-container">
          {state.avatar_url && (
            <Avatar
              className="avatar"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                verticalAlign: "middle",
              }}
              icon={<UserOutlined />}
              size={160}
              src={state.avatar_url}
            ></Avatar>
          )}
          {!state.avatar_url && (
            <Avatar
              className="avatar"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                verticalAlign: "middle",
              }}
              icon={<UserOutlined />}
              size={160}
            ></Avatar>
          )}
          <div className="login">{state.login}</div>
          <div className="bio">{state.bio}</div>
          <CardDetails {...state} />
        </div>
      </Sider>
      <Content className="home-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Play;
