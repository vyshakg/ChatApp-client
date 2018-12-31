import React from "react";

function MessageDesign({ text }) {
  return (
    <li>
      <div className="talk-bubble tri-right  btm-left">
        <div className="talktext">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
}

export default MessageDesign;
