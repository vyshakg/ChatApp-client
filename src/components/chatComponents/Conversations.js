import React from "react";
import { Comment } from "semantic-ui-react";
import bob from "../../images/bob.jpg";
import diffDate from "../../utils/formatDate";
import NewConversation from "./NewConversation";
import { graphql } from "react-apollo";
import { createConversationMutation, me } from "../../graphqlQuery";
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

      <Comment.Group size="big">
        {conversations.map(({ participant, id, createdAt }) => (
          <React.Fragment key={id}>
            <Comment style={{ marginLeft: "1rem" }}>
              <Comment.Avatar src={bob} />
              <Comment.Content>
                <Comment.Author as="span">
                  {participant.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{`${diffDate(createdAt)} ago`}</div>
                </Comment.Metadata>
                {/* <Comment.Text>Dude, this is awesome.</Comment.Text> */}
              </Comment.Content>
            </Comment>
            <br />
          </React.Fragment>
        ))}
      </Comment.Group>
    </>
  );
}

export default graphql(createConversationMutation)(Conversations);
