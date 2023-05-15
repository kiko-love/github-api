import React from "react";
import "normalize.css";
// import { useRoutes } from "react-router-dom";
import { Layout } from "antd";
import '@/css/header.css'

const App:React.FC = ()=> {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Header>
        <div className="header-name">Github API</div>
      </Header>
      <Content>
        <div>content</div>
      </Content>
    </Layout>
  );
}

export default App;
