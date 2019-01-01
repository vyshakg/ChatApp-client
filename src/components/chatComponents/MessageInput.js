import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { createMessage } from "../../graphqlQuery";
import { withRouter } from "react-router";
const ENTER_KEY = 13;
class MessageInput extends Component {
  state = {
    message: ""
  };
  onChange = ({ target }) => {
    this.setState({ message: target.value });
  };
  handleKeyDown = async e => {
    if (e.keyCode === ENTER_KEY) {
      const response = await this.props.mutate({
        variables: {
          conversationId: this.props.match.params.conversationId,
          text: this.state.message
        }
      });
      if (response) this.setState({ message: "" });
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

export default withRouter(graphql(createMessage)(MessageInput));
