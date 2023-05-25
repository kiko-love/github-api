import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Skeleton, message, Spin } from "antd";
import {
  ArrowLeftOutlined,
  CodeOutlined,
  FolderFilled,
  FileOutlined,
  ProjectOutlined,
  StarOutlined,
  EyeOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { formatFileSize } from "@/utils/file";
import { getRepoContents, getRepoLanguages, getRepoContents2 } from "@/api/api";
import dayjs from "dayjs";
import { getLanguageColor } from "@/utils/color";
import { Base64 } from "js-base64";
import "@/css/repoDetails.css";

const RepoDeatils: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.user);
  const repoList = useSelector((store: any) => store.repoList);
  const { name, index } = useParams();
  const thisList = repoList.items[Number(index)];
  const [data, setData] = useState([]);
  const [lang, setLang] = useState<any>({});
  const [langLen, setLangLen] = useState(0);
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);
  const [isChild, setIsChild] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [fileContent, setFileContent] = useState("");

  // setParent(name);

  const getChild = (path: string, type: string) => {
    return async () => {
      setSpinning(true);
      if (type === "file") {
        // message.error("该文件不是文件夹");
        const data = await getRepoContents2(user.login, thisList.name, path);
        if (data.message) {
          message.error(data.message);
        }
        setFileContent(Base64.decode(data.content));
      } else {
        setFileContent("");
        setCurrentPath(path);
        const data = await getRepoContents2(user.login, thisList.name, path);
        if (data.length) {
          setDirs(data.filter((item: any) => item.type === "dir"));
          setFiles(data.filter((item: any) => item.type === "file"));
          setIsChild(true);
        } else {
          message.error("该文件夹为空");
        }
      }
      setSpinning(false);
    };
  };
  const getParent = (name: string) => {
    return async () => {
      if (!isChild) {
        return;
      }
      setFileContent("");
      setSpinning(true);
      // const data = await getRepoContents(user.login, thisList.name);
      const parts = currentPath.split("/");
      parts.pop();
      const parentPath = parts.join("/");
      const data = await getRepoContents2(
        user.login,
        thisList.name,
        parentPath
      );
      setCurrentPath(parentPath);
      console.log(parentPath);

      if (parentPath === "") {
        setIsChild(false);
      }
      if (data.length) {
        setDirs(data.filter((item: any) => item.type === "dir"));
        setFiles(data.filter((item: any) => item.type === "file"));
      } else {
        message.error("该文件夹为空");
      }
      setSpinning(false);
    };
  };

  const getDirectory = () => {
    setFileContent("");
  };
  // 依赖项是一个空数组 [] 时 , effect 只在第一次渲染的时候执行
  useEffect(() => {
    const fetchData = async () => {
      if (user.login && name) {
        const [data, lang] = await Promise.all([
          getRepoContents(user.login, name as string),
          getRepoLanguages(user.login, name as string),
        ]);
        let langLen = 0;
        for (let i in lang) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          langLen += lang[i];
        }
        setLangLen(langLen);
        setLang(lang);
        setData(data);
        setFiles(data.filter((item: any) => item.type === "file"));
        setDirs(data.filter((item: any) => item.type === "dir"));
      }
    };
    fetchData();
  }, []);

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
        <div className="repo-d-title">{thisList?.full_name}</div>
        <div></div>
      </div>
      <div>
        <div className="repo-d-content">
          <div className="repo-d-content-header">
            <span className="repo-d-tip">
              <ProjectOutlined />
              {name}
            </span>
            <div className="repo-d-content-info">
              <div className="repo-d-content-grid">
                <div>
                  <span style={{ marginRight: "8px" }}>仓库创建日期</span>
                  <span style={{ color: "#7a7a7a" }}>
                    {thisList
                      ? dayjs(thisList?.created_at).format(
                          "YYYY年MM月DD日 hh:mm"
                        )
                      : "--"}
                  </span>
                </div>
                <div>
                  <span style={{ marginRight: "8px" }}>上次提交日期</span>
                  <span style={{ color: "#7a7a7a" }}>
                    {thisList
                      ? dayjs(thisList?.pushed_at).format(
                          "YYYY年MM月DD日 hh:mm"
                        )
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="repo-d-content-counts">
                <div className="repo-d-content-count">
                  <div className="count-tip">
                    <StarOutlined />
                    <span>{thisList?.stargazers_count}</span>
                  </div>
                  <span className="count-unit">star</span>
                </div>
                <div className="repo-d-content-count">
                  <div className="count-tip">
                    <EyeOutlined />
                    <span>{thisList?.watchers_count}</span>
                  </div>
                  <span className="count-unit">watching</span>
                </div>
                <div className="repo-d-content-count">
                  <div className="count-tip">
                    <BranchesOutlined />
                    <span>{thisList?.forks_count}</span>
                  </div>
                  <span className="count-unit">forks</span>
                </div>
              </div>
              <div>
                {Object.keys(lang).length > 0 && (
                  <div key={lang} style={{ margin: "1rem 0", fontWeight: 600 }}>
                    项目语言
                  </div>
                )}
                <div className="repo-d-content-lang">
                  {Object.keys(lang).map((item: any, index: number) => {
                    const len = (Number(lang[item]) / langLen) * 100;
                    return len > 1 ? (
                      <div
                        key={index}
                        className="repo-d-content-lang-item"
                        style={{
                          width: `${len}%`,
                          background: `${getLanguageColor(item)}`,
                        }}
                      ></div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>

              <div className="repo-d-content-lang-names">
                {lang ? (
                  Object.keys(lang).map((item: any, index: number) => {
                    const len = (Number(lang[item]) / langLen) * 100;
                    return (
                      <div key={index} className="repo-d-content-lang-name">
                        <span
                          className="lang-dot"
                          style={{ background: `${getLanguageColor(item)}` }}
                        ></span>
                        <span className="lang-name">{item}</span>
                        <span className="lang-progress">{len.toFixed(2)}%</span>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              {thisList?.description && (
                <div>
                  <div style={{ margin: "1rem 0", fontWeight: 600 }}>
                    项目介绍
                  </div>
                  <div style={{ color: "#586069" }} className="content-des">
                    {thisList?.description}
                  </div>
                </div>
              )}
            </div>
            <div className="repo-d-content-header-name">
              <span className="repo-d-tip">
                <CodeOutlined />
                Code
              </span>
            </div>
          </div>
          <Spin tip="加载中..." size="small" spinning={spinning}>
            <div className="repo-d-content-list">
              <div className="repo-d-content-tip">
                <span>文件名</span>
                <span className="repo-d-current-path">{currentPath}</span>
                <span>文件大小</span>
              </div>
              {isChild && (
                <div
                  style={{ color: "#7f8c8d" }}
                  className="repo-d-content-item item-dir"
                  onClick={getParent(currentPath)}
                >
                  <span>
                    <FolderFilled />
                  </span>
                  <span>返回上一级</span>
                </div>
              )}
              {dirs && !fileContent ? (
                dirs?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="repo-d-content-item item-dir"
                      onClick={getChild(item.path, item.type)}
                    >
                      <span>
                        <FolderFilled />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {files && !fileContent ? (
                files?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="repo-d-content-item item-file"
                      onClick={getChild(item.path, item.type)}
                    >
                      <span>
                        <span style={{ marginRight: "5px" }}>
                          <FileOutlined />
                        </span>
                        <span>{item.name}</span>
                      </span>
                      <span>{formatFileSize(item.size)}</span>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {dirs.length === 0 && files.length === 0 && <Skeleton active />}
              {fileContent && (
                <div className="repo-d-content-file-back">
                  <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={getDirectory}
                  >
                    返回目录
                  </Button>
                </div>
              )}
              {fileContent && (
                <div className="repo-d-content-file">
                  {fileContent.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      <div className="repo-d-content-file-line">
                        <span style={{ paddingRight: "1em",userSelect: 'none' }} className="repo-d-content-file-line-number">{index + 1}</span>
                        {line}
                        {index < fileContent.split("\n").length - 1 && <br />}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default RepoDeatils;
