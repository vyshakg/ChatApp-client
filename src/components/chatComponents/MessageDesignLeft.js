import React from "react";

function MessageDesign({ text }) {
  return (
    <li style={{ width: "100%", paddingBottom: "1rem" }}>
      <div className="talk-bubble tri-right  btm-left">
        <div className="talktext">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
}

export default MessageDesign;
