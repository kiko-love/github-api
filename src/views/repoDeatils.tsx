import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  CodeOutlined,
  FolderFilled,
  FileOutlined,
} from "@ant-design/icons";
import { testRepoContent } from "@/api/test";
import { useDispatch, useSelector } from "react-redux";
import { setRepo } from "@/store/festures/repoSlice";
import { formatFileSize } from "@/utils/file";
import { getRepoContents } from "@/api/api";
import "@/css/repoDetails.css";
import { getRepoDetail } from "../api/api";

const RepoDeatils: React.FC = () => {
  const user = useSelector((store: any) => store.user);
  const [data, setData] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const { name } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (user.login && name) {
        const res = await getRepoContents(user.login, name as string);
        console.log(res);
        setData(res);
      }
    };
    fetchData();
  }, []);
  const files = data.filter((item: any) => item.type === "file");
  const dirs = data.filter((item: any) => item.type === "dir");

  console.log(name);

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
                    <FolderFilled />
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
