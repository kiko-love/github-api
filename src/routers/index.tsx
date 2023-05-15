// 实现懒加载路由，而不是firstRouter中导入文件的方式
import NotFound from "@/components/NotFound";
import Play from "@/components/Play";
import MusicLib from "@/components/MusicLib";
import Lirics from "@/components/Lyrics";
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
        index: true,
        element: <Lirics />,
      },
      {
        path: "/play/lib",
        element: <MusicLib />,
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
