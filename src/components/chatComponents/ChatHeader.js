import React from "react";
import bob from "../../images/lamo.jpg";
import { Image } from "semantic-ui-react";
function ChatHeader({ username, email, me }) {
  return (
    <>
      <div className="header-info">
        <Image
          style={{ height: "3.5rem", margin: "0" }}
          src={bob}
          alt="profilepic"
          circular
        />
        <div>
          <h3 style={{ margin: 0 }}>{username}</h3>
          <span>{email}</span>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
