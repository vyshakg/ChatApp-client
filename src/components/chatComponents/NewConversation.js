import React from "react";
import { Button, Image, Dropdown } from "semantic-ui-react";
import bob from "../../images/lamo.jpg";
import { graphql } from "react-apollo";
import { allUsers, me, createConversationMutation } from "../../graphqlQuery";
import { differenceBy } from "lodash";
import { compose } from "react-apollo";
class NewConversation extends React.Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  newConversation = (id, username, email) => {
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
            <Dropdown.Header content="People You Might Know" />

            {newUsers.length === 0 ? (
              <div>
                <h3>No new user Found</h3>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Invite a friend to an ChatApp??
                </span>
              </div>
            ) : (
              newUsers.map(({ username, id, email, online }) => (
                <Dropdown.Item
                  key={id}
                  onClick={() => this.newConversation(id, username, email)}
                >
                  <div className="container-list">
                    <div className="container-image">
                      <Image src={bob} circular inline bordered />
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
              ))
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
