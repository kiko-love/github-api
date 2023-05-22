import React from "react";
import RepoCard from "./repoCard";
import { testRepo } from "@/api/test";
import "@/components/css/Repo.css";

export default function Repo() {
  return (
    <div className="repoList">
      {testRepo?.map((item, index) => {
        return <RepoCard key={index} {...item} />;
      })}
    </div>
  );
}
