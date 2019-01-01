import React from "react";
import MessageInput from "../chatComponents/MessageInput";
import ChatHeader from "../chatComponents/ChatHeader";
import Conversations from "../chatComponents/Conversations";
import { graphql } from "react-apollo";
import { me } from "../../graphqlQuery";
import Messages from "../chatComponents/Messages";

class HomeMessagepage extends React.Component {
  render() {
    const {
      data: { loading, me }
    } = this.props;
    if (loading) {
      return null;
    }
    // console.log(me);
    return (
      <div className="app-layout">
        <div className="sidebar">sidebar</div>
        <div className="conversations">
          <Conversations conversations={me.conversations} />
        </div>
        <div className="homeHeader">
          <ChatHeader username={me.username} email={me.email} />
        </div>
        <div className="messages">
          <Messages conversationId={this.props.match.params.conversationId} />
        </div>
        <div className="input">
          <MessageInput />
        </div>
      </div>
    );
  }
}

export default graphql(me)(HomeMessagepage);
