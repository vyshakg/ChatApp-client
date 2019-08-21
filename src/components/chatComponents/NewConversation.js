import { differenceBy } from "lodash";
import React from "react";
import { compose, graphql } from "react-apollo";
import { Button, Dropdown, Image } from "semantic-ui-react";
import { allUsers, createConversationMutation, me } from "../../graphqlQuery";
import { IMG_URL } from "../../utils/constants";
class NewConversation extends React.Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  newConversation = (id, username, email, profilePic) => {
    this.setState({ modalOpen: false });
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
                profilePic,
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
    const {
      conversations,
      data: { loading, allUsers }
    } = this.props;

    if (loading) {
      return null;
    }
    const participants = conversations.map(
      conversation => conversation.participants[0]
    );
    const newUsers = differenceBy(allUsers, participants, "id");
    return (
      <div className="conversation-new">
        <Dropdown
          style={{ float: "right" }}
          trigger={
            <h3>
              <Button
                circular
                color="facebook"
                size="huge"
                icon="plus"
                onClick={this.handleOpen}
                style={{
                  marginRight: "1.15rem",
                  boxShadow: "0 0 14px 5px #6b6b6b7d"
                }}
              />
            </h3>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          pointing="top left"
          icon={null}
        >
          <Dropdown.Menu>
            {newUsers.length === 0 ? (
              <Dropdown.Header>
                <h5>No new user Found</h5>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Invite a friend to an ChatApp??
                </span>
              </Dropdown.Header>
            ) : (
              <>
                <Dropdown.Header content="People You Might Know" />
                {newUsers.map(({ username, id, email, profilePic }) => (
                  <Dropdown.Item
                    key={id}
                    onClick={() =>
                      this.newConversation(id, username, email, profilePic)
                    }
                  >
                    <div className="container-list">
                      <div className="container-image">
                        <Image
                          src={`${IMG_URL}${profilePic}.jpg`}
                          circular
                          inline
                          bordered
                        />
                      </div>
                      <div className="container-desc">
                        <h3 style={{ margin: 0 }}>
                          {username}
                          {/* <Icon
                          style={{ marginLeft: "3px" }}
                          name="circle"
                          color={online ? "green" : "grey"}
                          size="tiny"
                        /> */}
                        </h3>
                        <div>{email}</div>
                      </div>
                      <div className="container-action" />
                    </div>
                  </Dropdown.Item>
                ))}
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default compose(
  graphql(allUsers),
  graphql(createConversationMutation)
)(NewConversation);
