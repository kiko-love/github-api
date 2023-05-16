// 实现懒加载路由，而不是firstRouter中导入文件的方式
import NotFound from "@/components/NotFound";
import Play from "@/components/Play";
import Repo from "@/components/Repo";
import { Navigate } from "react-router-dom";
const RouterConfig = [
  {
    path: "/",
    element: <Navigate to="/play" />,
  },
  {
    path: "/play",
    element: <Play />,
    children: [
      {
        path: "/play/lib",
        element: <Repo />,
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
