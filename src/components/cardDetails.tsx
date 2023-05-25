import React from "react";
import {
  EnvironmentOutlined,
  LinkOutlined,
  ShopOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "@/components/css/cardDetails.css";
import { IUser } from "@/model/IGithub";

const CardDetails: React.FC<IUser> = ({ location, blog, company,email }) => {
  return (
    <div className="vcard-details">
      {company && (
        <div className="vcard-item">
          <ShopOutlined />
          <span className="vcard-text">{company}</span>
        </div>
      )}
      {location && (
        <div className="vcard-item">
          <EnvironmentOutlined />
          <span className="vcard-text">{location}</span>
        </div>
      )}
      {blog && (
        <div className="vcard-item">
          <LinkOutlined />
          <span className="vcard-text">{blog}</span>
        </div>
      )}
      {
        email && (
          <div className="vcard-item">
            <MailOutlined />
            <span className="vcard-text">{email}</span>
          </div>
        )
      }
    </div>
  );
};

export default CardDetails;
