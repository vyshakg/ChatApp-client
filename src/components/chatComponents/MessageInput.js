import React, { Component } from "react";
import { Input } from "semantic-ui-react";
class MessageInput extends Component {
  state = {
    message: ""
  };
  onChange = ({ target }) => {
    this.setState({ message: target.value });
  };
  render() {
    const { message } = this.state;
    return (
      <>
        <Input
          className="custom-message-input"
          placeholder="Enter to send a message..."
          value={message}
          name="message"
          type="text"
          onChange={this.onChange}
        />
      </>
    );
  }
}

export default MessageInput;
