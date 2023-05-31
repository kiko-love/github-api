import React from "react";
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
                  <div className="repo-tl-commit-msg">{element.commit.message}</div>
                  <div className="repo-tl-commit-author">
                    <div>{element.committer.login}</div>
                  <div style={{color:'#7d7d7d'}}>{element.commit.author.date}</div></div>
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
