// 实现懒加载路由，而不是firstRouter中导入文件的方式
import NotFound from "@/components/NotFound";
import Play from "@/components/Play";
import Repo from "@/components/Repo";
import RepoDeatils from "@/views/repoDeatils";
import { Navigate } from "react-router-dom";
const RouterConfig = [
  {
    path: "/",
    element: <Navigate to="/home/repo" />,
  },
  {
    path: "/home",
    element: <Navigate to="/home/repo" />,
  },
  {
    path: "/home",
    element: <Play />,
    children: [
      {
        path: "/home/repo",
        element: <Repo />,
        // 可以传参，用于面包屑导航之类
        meta: {
          id: 1,
        },
      },
      {
        path: "/home/repoDetail/:name",
        element: <RepoDeatils />,
        // 可以传参，用于面包屑导航之类
        meta: {
          id: 1,
        },
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default RouterConfig;
