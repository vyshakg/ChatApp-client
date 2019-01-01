import React, { Component } from "react";
import MessageDesignLeft from "../chatComponents/MessageDesignLeft";
import MessageDesignRight from "../chatComponents/MessageDesignRight";
import { messages } from "../../graphqlQuery";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
class Messages extends Component {
  state = {
    messages: []
  };

  render() {
    const {
      data: { loading, messages = [] }
    } = this.props;
    if (loading) {
      return null;
    }

    // const response = this.props.messages({
    //   variables: {
    //     conversationId: "5c2915c6db996a18a8620af0"
    //   }
    // });

    return (
      <ul className="message-list">
        {messages.map(message => (
          <MessageDesignLeft key={message.id} text={message.text} />
        ))}
      </ul>
    );
  }
}
export default graphql(messages, {
  options: ({ conversationId = 0 }) => ({
    conversationId
  })
})(Messages);
