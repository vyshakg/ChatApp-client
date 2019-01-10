import React from "react";
import diffDate from "../../utils/formatDate";
import bob from "../../images/lamo.jpg";
import { Image } from "semantic-ui-react";

function MessageDesign({ text, createdAt }) {
  return (
    <li style={{ width: "100%", paddingBottom: "1rem" }}>
      <Image
        src={bob}
        alt="profile"
        width={60}
        circular
        inline
        bordered
        style={{ float: "left", top: "-10px" }}
      />
      <div className="message-blue" style={{ marginLeft: "76px" }}>
        <p className="message-content">{text}</p>
        <div className="message-timestamp-left">{`${diffDate(
          createdAt
        )} ago`}</div>
      </div>
    </li>
  );
}

export default MessageDesign;
