import React from "react";
import "@/components/css/repoCard.css";
import { Tag, Button, Tooltip } from "antd";
import { getLanguageColor } from "@/utils/color";
import {
  DeploymentUnitOutlined,
  StarOutlined,
  BranchesOutlined,
  RightOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const repoCard: React.FC = (prpos: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const toDeatil = (name: string) => {
    navigate(`/home/repoDetail/${name}`);
  };
  return (
    <div className="repoCard">
      <div>
        <div className="repoCard-header">
          <div className="repoCard-name">{prpos.name}</div>
          <div className="repoCard-private">
            {prpos.private ? (
              <span>
                <Tag>private</Tag>
              </span>
            ) : (
              <span>
                <Tag color="green">public</Tag>
              </span>
            )}
          </div>
          <div className="repoCard-count">
            {prpos.stargazers_count > 0 && (
              <span className="count-item">
                <StarOutlined />
                {prpos.stargazers_count}
              </span>
            )}
            {prpos.forks_count > 0 && (
              <span className="count-item">
                <BranchesOutlined />
                {prpos.forks_count}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="repoCard-description">{prpos.description}</div>
        </div>
        <div className="repoCard-footer">
          {prpos.language && (
            <div className="repoCard-language">
              <span
                className="language-dot"
                style={{ background: `${getLanguageColor(prpos.language)}` }}
              ></span>
              <span>{prpos.language}</span>
            </div>
          )}

          {prpos.license && (
            <div className="repoCard-license">
              <DeploymentUnitOutlined />
              <span>{prpos.license?.name}</span>
            </div>
          )}
          {
            <div className="repoCard-date">
              <HistoryOutlined />
              <span>创建日期</span>
              <span>{dayjs(prpos.created_at).format("YYYY年MM月DD日")}</span>
            </div>
          }
        </div>
      </div>
      <div className="repoCard-action">
        <Tooltip title="项目详情">
          <Button
            type="text"
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => {
              toDeatil(prpos.name);
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default repoCard;
