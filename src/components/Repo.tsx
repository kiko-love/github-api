import React from "react";
import RepoCard from "./repoCard";
import { testRepo } from "@/api/test";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import "@/components/css/Repo.css";

export default function Repo() {
  const repoList = useSelector((store: any) => store.repoList);
  return (
    <div className="repoList">
      {repoList.items?.map((item: any, index: number) => {
        return <RepoCard key={index} {...item} />;
      })}
      {
        repoList.items?.length === 0 && (
          <Empty className="no-data" description={'仓库列表暂无数据'}/>
        )
      }
    </div>
  );
}
