import React, { Component } from "react";
import MessageInput from "../chatComponents/MessageInput";
import ChatHeader from "../chatComponents/ChatHeader";

class HomeMessagepage extends Component {
  render() {
    return (
      <div className="app-layout">
        <div className="sidebar">sidebar</div>
        <div className="conversations">conversations</div>
        <div className="header">
          <ChatHeader username="bob" email="bobo@gmail.com" />
        </div>
        <div className="messages">
          <ul className="message-list" />
        </div>
        <div className="input">
          <MessageInput />
        </div>
      </div>
    );
  }
}

export default HomeMessagepage;
