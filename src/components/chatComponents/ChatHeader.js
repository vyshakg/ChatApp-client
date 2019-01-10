import React from "react";

function ChatHeader({ username }) {
  return (
    <>
      <div className="header-info">
        <div>
          <h3 style={{ margin: 0 }}>{username}</h3>
          <span>last seen 2 hours ago</span>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
