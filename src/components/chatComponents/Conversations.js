import React from "react";
import { Comment, Button } from "semantic-ui-react";
import bob from "../../images/bob.jpg";
import diffDate from "../../utils/formatDate";

function Conversations({ conversations }) {
  return (
    <>
      <div className="conversation-new">
        <h3>
          <Button
            circular
            color="facebook"
            size="huge"
            icon="plus"
            style={{ marginRight: "1.15rem" }}
          />
          New Conversation
        </h3>
      </div>

      <Comment.Group size="big">
        {conversations.map(({ participant, id, createdAt }) => (
          <>
            <Comment key={id} style={{ marginLeft: "1rem" }}>
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
          </>
        ))}
      </Comment.Group>
    </>
  );
}

export default Conversations;
