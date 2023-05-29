import React, { useEffect } from "react";
import RepoCard from "./repoCard";
import { useSelector, useDispatch } from "react-redux";
import { Empty, Pagination, Skeleton } from "antd";
import { setPage } from "@/store/festures/pageSlice";
import "@/components/css/Repo.css";

export default function Repo() {
  const dispatch = useDispatch();
  const pageInfo = useSelector((store: any) => store.page);
  const [current, setCurrent] = React.useState(pageInfo.page);
  const [pageSize, setPageSize] = React.useState(pageInfo.pageSize);
  const [total, setTotal] = React.useState(pageInfo.total);
  const [loading, setLoading] = React.useState(false);
  const repoList = useSelector((store: any) => store.repoList);
  const changePage = async (page: number, pageSize?: number) => {
    const payload = {
      page: page,
      pageSize: pageSize || 5,
      total: null,
      loading: true,
    };
    const state = dispatch(setPage(payload));
  };
  useEffect(() => {
    setCurrent(pageInfo.page);
    setPageSize(pageInfo.pageSize);
    setTotal(pageInfo.total);
    setLoading(pageInfo.loading);
  }, [pageInfo]);

  return (
    <div className="repoList">
      {!loading &&
        repoList.items?.map((item: any, index: number) => {
          return <RepoCard key={index} {...item} />;
        })}
      {repoList.items?.length === 0 && (
        <Empty className="no-data" description={"仓库列表暂无数据"} />
      )}
      {loading && (
        <div className="repoList-skeleton">
          <Skeleton active />;
        </div>
      )}

      <div className="Pagination-footer">
        <Pagination
          onChange={changePage}
          defaultCurrent={1}
          total={total}
          pageSize={pageSize}
          current={current}
          responsive={true}
          hideOnSinglePage={true}
          itemRender={(page, type, originalElement) => {
            return originalElement;
          }}
        />
      </div>
    </div>
  );
}
