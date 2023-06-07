import React from "react";
import { Avatar, Tag } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./css/repoTimeline.css";

const repoTimeline: React.FC = (props: any) => {
  console.log(props);

  // eslint-disable-next-line array-callback-return
  return (
    <div>
      {Object.values(props).map((item: any) => (
        <div className="repo-tl" key={item[0]?.sha}>
          <div className="repo-tl-icon">
            <FieldTimeOutlined />
          </div>
          <div className="repo-tl-body">
            <div className="repo-tl-commit-date">提交日期: {item[0]?.date}</div>
            <div className="repo-tl-commit-main">
              {item.map((element: any, index: number) => (
                <div className="repo-tl-commit-info" key={index}>
                  <div className="repo-tl-commit-msg">
                    <div className="repo-tl-commit-cmsg">
                      <div>{element.commit?.message.split("\n")[0]}</div>
                      <div className="repo-tl-commit-extramsg">{element.commit?.message.split("\n")[2]}</div>
                    </div>
                    <div>
                      <Tag color="geekblue">{element.sha?.slice(0, 7)}</Tag>
                    </div>
                  </div>
                  <div className="repo-tl-commit-author">
                    <Avatar
                      src={
                        <img src={element.author?.avatar_url} alt="avatar" />
                      }
                    />
                    <div>{element.committer?.login}</div>
                    <div style={{ color: "#7d7d7d" }}>
                      {dayjs(element.commit?.author.date).format(
                        "YYYY-MM-DD hh:mm:ss"
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default repoTimeline;
