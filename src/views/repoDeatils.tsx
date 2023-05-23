import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  CodeOutlined,
  FolderOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { testRepoContent } from "@/api/test";
import { useDispatch, useSelector } from "react-redux";
import { setRepo } from "@/store/festures/repoSlice";
import { formatFileSize } from "@/utils/file";
import "@/css/repoDetails.css";

const RepoDeatils: React.FC = () => {
  const fileList = testRepoContent;
  const repoState = useSelector((store: any) => store.repo);
  const dispatch = useDispatch();
  dispatch(setRepo({ fileList }));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const { name } = useParams();
  const files = repoState.fileList.filter((item: any) => item.type === "file");
  const dirs = repoState.fileList.filter((item: any) => item.type === "dir");
  console.log(name);
  console.log(repoState);

  const back = () => {
    navigate(`/home/repo`);
  };
  return (
    <div className="repo-d">
      <div className="repo-d-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            back();
          }}
        >
          返回仓库列表
        </Button>
        <div className="repo-d-title">{name}</div>
        <div></div>
      </div>
      <div>
        <div className="repo-d-content">
          <div className="repo-d-content-header">
            <div className="repo-d-content-header-name">
              <span className="repo-d-tip">
                <CodeOutlined />
                Code
              </span>
            </div>
          </div>
          <div className="repo-d-content-list">
            <div className="repo-d-content-tip">
              <span>文件名</span>
              <span>文件大小</span>
            </div>
            {dirs?.map((item: any, index: number) => {
              return (
                <div key={index} className="repo-d-content-item item-dir">
                  <span>
                    <FolderOutlined />
                  </span>
                  <span>{item.name}</span>
                </div>
              );
            })}
            {files?.map((item: any, index: number) => {
              return (
                <div key={index} className="repo-d-content-item item-file">
                  <span>
                    <span style={{ marginRight: "5px" }}>
                      <FileOutlined />
                    </span>
                    <span>{item.name}</span>
                  </span>
                  <span>{formatFileSize(item.size)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDeatils;
