import React from "react";
import { Icon, Dropdown } from "semantic-ui-react";
import { deleteConversation, me, messages } from "../../graphqlQuery";
import { graphql } from "react-apollo";
// import { withRouter } from "react-router-dom";

function ChatHeader({ username, conversationId, mutate, history }) {
  function onClickHandle() {
    mutate({
      variables: conversationId,
      update: (store, { data: { deleteConversation } }) => {
        if (!deleteConversation) {
          return;
        }
        const data = store.readQuery({ query: me });

        const updatedConversations = data.me.conversations.filter(
          conversation => {
            if (conversation.id === conversationId) {
              return false;
            }
            return true;
          }
        );
        data.me.conversations = updatedConversations;
        store.writeQuery({ query: me, data });

        const messgaeData = {};
        messgaeData.messages = [];

        store.writeQuery({
          query: messages,
          variables: {
            conversationId
          },
          messgaeData
        });
      }
    });
    history.push("/home");
  }
  return (
    <>
      <div className="header-info">
        <div>
          <h3 style={{ margin: 0 }}>{username}</h3>
          <span>last seen 2 hours ago</span>
        </div>
        <div>
          <Icon name="phone" size="large" style={{ marginRight: "2rem" }} />
          <Dropdown
            trigger={<Icon name="ellipsis horizontal" size="large" />}
            pointing="top right"
            icon={null}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text="Delete Conversation"
                icon="trash"
                onClick={onClickHandle}
              />
              <Dropdown.Item text="Report user" icon="ban" disabled />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default graphql(deleteConversation)(ChatHeader);
