import React from "react";
import "normalize.css";
import { useRoutes } from "react-router-dom";
import { Layout, Input } from "antd";
import RouterConfig from "@/routers/index";
import { getUser } from "@/api/api";
import { useSelector, useDispatch } from "react-redux";
import store from "@/store/index";
import "@/css/App.css";
import { setUser } from "./store/festures/userSlice";

const App: React.FC = () => {
  const { Header, Content } = Layout;
  
  const state = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const { Search } = Input;
  const onSearch = async (value: string) => {
    if (value === "") return false;
    // const res = await getUser(value);
    const res = {
      login: "test",
      id: 1,
      node_id: "test",
      avatar_url: "test",
    }
    console.log(res);
    dispatch(setUser({res}))
  };
  return (
    <Layout className="lay-out">
      <Header>
        <div className="top-header">
          <div className="header-name">Github API</div>
          <Search
            placeholder="搜索贡献者ID"
            onSearch={onSearch}
            allowClear
            style={{ width: 200 }}
          />
        </div>
       
      </Header>
      <Content className="main-content">{useRoutes(RouterConfig)}</Content>
    </Layout>
  );
};

export default App;
