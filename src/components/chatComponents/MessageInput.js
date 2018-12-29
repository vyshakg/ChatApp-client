import React, { Component } from "react";
import { Input } from "semantic-ui-react";
const ENTER_KEY = 13;
class MessageInput extends Component {
  state = {
    message: ""
  };
  onChange = ({ target }) => {
    this.setState({ message: target.value });
  };
  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      console.log(this.state.message);
      this.setState({ message: "" });
    }
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
          onKeyDown={this.handleKeyDown}
        />
      </>
    );
  }
}

export default MessageInput;
