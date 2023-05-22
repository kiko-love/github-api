import React from "react";
import "@/components/css/repoCard.css";
import { Tag } from "antd";
import { getLanguageColor } from "@/utils/color";
import {
  DeploymentUnitOutlined,
  StarOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

const repoCard: React.FC = (prpos: any) => {
  return (
    <div className="repoCard">
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
      </div>
    </div>
  );
};

export default repoCard;
