import React from "react";
import { Image, Icon } from "semantic-ui-react";
import bob from "../../images/lamo.jpg";
import diffDate from "../../utils/formatDate";
import NewConversation from "./NewConversation";
import { graphql } from "react-apollo";
import { createConversationMutation, me } from "../../graphqlQuery";
import { NavLink } from "react-router-dom";

class Conversations extends React.Component {
  newConversation = (id, username, email) => {
    this.props.mutate({
      variables: { userid: id },
      optimisticResponse: {
        createConversation: {
          __typename: "Mutation",
          ok: true,
          conversation: {
            __typename: "conversation",
            id: -1,
            createdAt: new Date().toISOString(),
            participants: [
              {
                __typename: "User",
                id: -1,
                username,
                email
              }
            ]
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
        store.writeQuery({ query: me, data });
        return null;
      }
    });
  };
  render() {
    const { conversations } = this.props;
    return (
      <>
        <NewConversation
          conversations={conversations}
          newConversation={this.newConversation}
        />

        {conversations.map(({ participants, id, createdAt, online }) => (
          <NavLink activeClassName="active" key={id} to={`/home/${id}`}>
            <React.Fragment>
              <div className="conversation-list">
                <div className="conversation-image">
                  <Image src={bob} circular inline bordered />
                </div>
                <div className="conversation-content">
                  <h3 style={{ margin: 0 }}>
                    {participants[0].username}
                    <Icon
                      style={{ marginLeft: "3px" }}
                      name="circle"
                      color={online ? "green" : "grey"}
                      size="tiny"
                    />
                  </h3>
                  <span>{`${diffDate(createdAt)} ago`}</span>
                </div>
              </div>
            </React.Fragment>
          </NavLink>
        ))}
      </>
    );
  }
}

export default graphql(createConversationMutation)(Conversations);
