import React, { Component } from "react";
import MessageDesignLeft from "../chatComponents/MessageDesignLeft";
import MessageDesignRight from "../chatComponents/MessageDesignRight";
import { messages, newConversationMessage } from "../../graphqlQuery";
import { graphql } from "react-apollo";

class Messages extends Component {
  state = {
    messages: [],
    conversationId: null,
    unsubscribe: null
  };
  static getDerivedStateFromProps(nextProps = this.props, prevState) {
    if (!nextProps.data.loading) {
      // Check for existing subscription
      if (prevState.unsubscribe) {
        // Only unsubscribe/update state if subscription variable has changed
        if (prevState.conversationId === nextProps.conversationId) {
          return null;
        }
        prevState.unsubscribe();
      }

      return {
        // Subscribe
        unsubscribe: nextProps.data.subscribeToMore({
          document: newConversationMessage,
          variables: {
            conversationId: nextProps.conversationId
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            // Perform updates on previousResult with subscriptionData

            if (!subscriptionData) {
              return previousResult;
            }
            return {
              ...previousResult,
              messages: [
                ...previousResult.messages,
                subscriptionData.data.newConversationMessage
              ]
            };
          }
        }),
        // Store subscriptionParam in state for next update
        conversationId: nextProps.conversationId
      };
    }

    return null;
  }

  render() {
    const {
      data: { loading, messages = [] }
    } = this.props;
    if (loading) {
      return null;
    }
    const { userid } = this.props;
    return (
      <ul className="message-list">
        {messages.map(message => (
          <React.Fragment key={message.id}>
            {userid !== message.from.id ? (
              <MessageDesignLeft
                text={message.text}
                createdAt={message.createdAt}
              />
            ) : (
              <MessageDesignRight
                text={message.text}
                createdAt={message.createdAt}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    );
  }
}
export default graphql(messages, {
  options: props => ({
    fetchPolicy: "network-only",
    variables: {
      conversationId: props.conversationId
    }
  })
})(Messages);
