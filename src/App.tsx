import React from "react";
import "normalize.css";
import { useRoutes } from "react-router-dom";
import { Layout, Input } from "antd";
import RouterConfig from "@/routers/index";
import { getUser } from "@/api/api";
import "@/css/App.css";
const { Search } = Input;
const onSearch = async (value: string) => {
  if (value === "") return false;
  const res = await getUser(value);
  console.log(res);

  console.log(value);
};
const App: React.FC = () => {
  const { Header, Content } = Layout;
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
