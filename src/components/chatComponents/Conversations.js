import React from "react";
import { Image, Icon } from "semantic-ui-react";
import bob from "../../images/bob.jpg";
import diffDate from "../../utils/formatDate";
import NewConversation from "./NewConversation";
import { graphql } from "react-apollo";
import { createConversationMutation, me } from "../../graphqlQuery";
import { NavLink } from "react-router-dom";

function Conversations({ conversations, mutate }) {
  function newConversation(id, username) {
    mutate({
      variables: { userid: id },
      optimisticResponse: {
        createConversation: {
          __typename: "Mutation",
          ok: true,
          conversation: {
            __typename: "Conversation",
            id: -1,
            participant: {
              __typename: "User",
              username: username
            },
            createdAt: new Date().toISOString()
          }
        }
      },
      update: (store, { data: { createConversation } }) => {
        const { ok, conversation } = createConversation;

        if (!ok) {
          return;
        }
        const data = store.readQuery({ query: me });
        data.me.conversations.push(conversation);
        store.writeQuery({ query: me, data: data.me });
      }
    });
  }
  return (
    <>
      <NewConversation
        conversations={conversations}
        newConversation={newConversation}
      />

      {conversations.map(({ participant, id, createdAt, online }) => (
        <NavLink activeClassName="active" key={id} to={`/home/${id}`}>
          <React.Fragment>
            <div className="conversation-list">
              <div className="conversation-image">
                <Image src={bob} circular inline bordered />
              </div>
              <div className="conversation-content">
                <h3 style={{ margin: 0 }}>
                  {participant.username}
                  <Icon
                    style={{ marginLeft: "3px" }}
                    name="circle"
                    color={online ? "green" : "grey"}
                    size="tiny"
                  />
                </h3>
                <span>{diffDate(createdAt)}</span>
              </div>
            </div>
          </React.Fragment>
        </NavLink>
      ))}
    </>
  );
}

export default graphql(createConversationMutation)(Conversations);
