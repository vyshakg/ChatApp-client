import React from "react";
import diffDate from "../../utils/formatDate";

function MessageDesignRight({ text, createdAt }) {
  return (
    <li style={{ paddingBottom: "1rem", paddingLeft: "85%", width: "100%" }}>
      <div className="message-orange">
        <p className="message-content">{text}</p>
        <div className="message-timestamp-right">{`${diffDate(
          createdAt
        )} ago`}</div>
      </div>
    </li>
  );
}

export default MessageDesignRight;
