import React, { useEffect, useState } from "react";
import "normalize.css";
import { useRoutes } from "react-router-dom";
import { Layout, Input, message, Tooltip } from "antd";
import { InfoCircleOutlined, GithubOutlined } from "@ant-design/icons";
import RouterConfig from "@/routers/index";
import { useDispatch, useSelector } from "react-redux";
import "@/css/App.css";
import { setUser } from "./store/festures/userSlice";
import { setRepoList } from "./store/festures/repoListSlice";
import { setPage } from "./store/festures/pageSlice";
import { getUser, getRepo } from "./api/api";

const App: React.FC = () => {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const { Search } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const pageInfo = useSelector((store: any) => store.page);
  const user = useSelector((store: any) => store.user);
  // 创建一个状态来保存Search的loading状态
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (user.login === "") return false;
      const repoList_s = await getRepo(
        user.login,
        pageInfo.page,
        pageInfo.pageSize
      );
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
      const payload = {
        page:null,
        pageSize:null,
        total:null,
        loading:false
      }
      await dispatch(setPage(payload))     
      dispatch(setRepoList({ repoList }));
    };
    fetchData();
  }, [pageInfo]);

  // Search的搜索事件
  const onSearch = async (value: string) => {
    if (value === "") return false;
    setLoading(true);
    try {
      const user = await getUser(value);
      const page = 1;
      const pageSize = pageInfo.pageSize;
      const total = user.public_repos;
      const repoList_s = await getRepo(user.login, page, pageInfo.pageSize);
      const repoList = repoList_s.sort(
        (
          a: { stargazers_count: any; forks_count: any; watchers_count: any },
          b: { stargazers_count: any; forks_count: any; watchers_count: any }
        ) => {
          const sumA = a.stargazers_count + a.forks_count*2 + a.watchers_count;
          const sumB = b.stargazers_count + b.forks_count*2 + b.watchers_count;
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
        dispatch(setPage({ page, pageSize, total })),
      ]);
      messageApi.open({
        type: "success",
        content: "搜索成功",
      });
    } catch (error: any) {
      message.error(error.message + "：未找到该用户");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout className="lay-out">
      <Header>
        <div className="top-header">
          <div className="header-name">
            <GithubOutlined />
            <span>Github API</span>
          </div>
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
