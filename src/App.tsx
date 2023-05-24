import React, { useState } from "react";
import "normalize.css";
import { useRoutes } from "react-router-dom";
import { Layout, Input, message, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import RouterConfig from "@/routers/index";
import { useDispatch, useSelector } from "react-redux";
import "@/css/App.css";
import { setUser } from "./store/festures/userSlice";
import { setRepoList } from "./store/festures/repoListSlice";
import { getUser, getRepo } from "./api/api";

const App: React.FC = () => {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const { Search } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  // 创建一个状态来保存Search的loading状态
  const [loading, setLoading] = useState(false);
  // const user = useSelector((store: any) => store.user);
  // const repoList = useSelector((store: any) => store.repoList);
  const onSearch = async (value: string) => {
    if (value === "") return false;
    setLoading(true);
    try {
      const user = await getUser(value);
      const repoList_s = await getRepo(user.login);

      const repoList = repoList_s.sort(
        (
          a: { stargazers_count: any; forks_count: any; watchers_count: any },
          b: { stargazers_count: any; forks_count: any; watchers_count: any }
        ) => {
          const sumA = a.stargazers_count + a.forks_count + a.watchers_count;
          const sumB = b.stargazers_count + b.forks_count + b.watchers_count;
          if (sumA > sumB) {
            return -1; // 返回负数表示a排在b前面
          } else if (sumA < sumB) {
            return 1; // 返回正数表示a排在b后面
          } else {
            return 0; // 返回0表示a和b相等
          }
        }
      );
      for (let i = 0; i < repoList.length; i++) {
        repoList[i].index = i;
      }

      Promise.all([
        dispatch(setUser({ user })),
        dispatch(setRepoList({ repoList })),
      ]);
      messageApi.open({
        type: "success",
        content: "搜索成功",
      });
    } catch (error: any) {
      message.error(error.message+'：未找到该用户');
    } finally {
      setLoading(false);
    }
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
            loading={loading}
            suffix={
              <Tooltip title="搜索将自动获取该用户所有public仓库">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </div>
      </Header>
      <Content className="main-content">{useRoutes(RouterConfig)}</Content>
      {contextHolder}
    </Layout>
  );
};

export default App;
