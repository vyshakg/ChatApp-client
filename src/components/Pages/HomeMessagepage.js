import React from "react";
import MessageInput from "../chatComponents/MessageInput";
import ChatHeader from "../chatComponents/ChatHeader";
import { graphql } from "react-apollo";
import { me } from "../../graphqlQuery";
import Messages from "../chatComponents/Messages";
import { withApollo } from "react-apollo";
import SidebarApp from "../chatComponents/SidebarApp";
import NewConversation from "../chatComponents/NewConversation";
import SearchConversation from "../chatComponents/SearchConversation";
class HomeMessagepage extends React.Component {
  render() {
    const {
      data: { loading, me }
    } = this.props;

    if (loading) {
      return null;
    }
    const conversationId =
      this.props.match.params.conversationId === undefined
        ? 0
        : this.props.match.params.conversationId;

    const [{ participants = [] } = {}] = me.conversations.filter(
      conversation => {
        if (conversation.id === conversationId) return true;
        return false;
      }
    );

    return (
      <div className="app-layout">
        <div className="sidebar">
          <SidebarApp profile={me} />
        </div>
        <div className="conversations">
          <div>
            <SearchConversation conversations={me.conversations} />
          </div>
          <div>
            <NewConversation conversations={me.conversations} />
          </div>
        </div>
        <div className="homeHeader">
          {!!participants[0] && (
            <ChatHeader
              conversationId={conversationId}
              username={participants[0].username}
              email={participants[0].email}
              history={this.props.history}
            />
          )}
        </div>
        <div className="messages">
          <Messages conversationId={conversationId} userid={me.id} />
        </div>
        <div className="input">
          <MessageInput />
        </div>
      </div>
    );
  }
}

export default withApollo(
  graphql(
    me
    //   , {
    //   options: {
    //     fetchPolicy: ""
    //   }
    // }
  )(HomeMessagepage)
);
