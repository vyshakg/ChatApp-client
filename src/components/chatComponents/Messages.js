import React, { Component } from "react";
import MessageDesignLeft from "../chatComponents/MessageDesignLeft";
import MessageDesignRight from "../chatComponents/MessageDesignRight";
class Messages extends Component {
  render() {
    return (
      <ul className="message-list">
        <MessageDesignLeft text="hi" />
        <MessageDesignRight text="hello how are you?" />
      </ul>
    );
  }
}
export default Messages;
