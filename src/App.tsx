import React from "react";
import "normalize.css";
import { useRoutes } from "react-router-dom";
import { Layout, Input } from "antd";
import RouterConfig from "@/routers/index";
import { useDispatch, useSelector } from "react-redux";
import "@/css/App.css";
import { setUser } from "./store/festures/userSlice";
import { setRepoList } from "./store/festures/repoListSlice";
import { testUser, testRepo } from "./api/test";

const App: React.FC = () => {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const { Search } = Input;
  // const user = useSelector((store: any) => store.user);
  // const repoList = useSelector((store: any) => store.repoList);
  const onSearch = async (value: string) => {
    if (value === "") return false;
    // const res = await getUser(value);
    const user = testUser;
    const repoList = testRepo;

    Promise.all([
      dispatch(setUser({ user })),
      dispatch(setRepoList({ repoList })),
    ]);
    console.log(user, repoList);
  };
  return (
    <Layout className="lay-out">
      <Header>
        <div className="top-header">
          <div className="header-name">Github API</div>
          <Search
            placeholder="搜索用户ID"
            onSearch={onSearch}
            allowClear
            style={{ width: 260 }}
          />
        </div>
      </Header>
      <Content className="main-content">{useRoutes(RouterConfig)}</Content>
    </Layout>
  );
};

export default App;
