import React from "react";
import bob from "../../images/bob.jpg";
import { Image } from "semantic-ui-react";
function ChatHeader({ username, email }) {
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
          <spam>{email}</spam>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
