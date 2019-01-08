import React from "react";

function MessageDesignRight({ text }) {
  return (
    <li style={{ paddingBottom: "1rem", paddingLeft: "85%", width: "100%" }}>
      <div className="talk-bubble tri-right btm-right">
        <div className="talktext">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
}

export default MessageDesignRight;
