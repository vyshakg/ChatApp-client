import React from "react";

function MessageDesignRight({ text }) {
  return (
    <li style={{ float: "right" }}>
      <div className="talk-bubble tri-right btm-right">
        <div className="talktext">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
}

export default MessageDesignRight;
