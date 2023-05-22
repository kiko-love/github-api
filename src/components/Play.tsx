import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { testUser } from "@/api/test";
import store from "@/store/index";
import "@/css/App.css";
const { Sider, Content } = Layout;

const Play: React.FC = () => {
  const state = useSelector((store: any) => store.user);
  return (
    <Layout className="lay-out">
      <Sider>
        <div className="sider-container">
          <Avatar
          className="avatar"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              verticalAlign: "middle",
            }}
            size={128}
            src={testUser.avatar_url}
          >
            {state.login}
          </Avatar>
          <div className="login">{testUser.login}</div>
          <div className="bio">{testUser.bio}</div>
        </div>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Play;
