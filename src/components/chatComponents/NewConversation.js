import React from "react";
import { Button, Image, Modal, Icon } from "semantic-ui-react";
import bob from "../../images/lamo.jpg";
import { graphql } from "react-apollo";
import { allUsers } from "../../graphqlQuery";
import { differenceBy } from "lodash";

class NewConversation extends React.Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  newConversation = (id, username, email) => {
    this.setState({ modalOpen: false });
    this.props.newConversation(id, username, email);
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
        <Modal
          trigger={
            <h3>
              <Button
                circular
                color="facebook"
                size="huge"
                icon="plus"
                onClick={this.handleOpen}
                style={{ marginRight: "1.15rem" }}
              />
              New Conversation
            </h3>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Modal.Header className="primaryBgColor">
            <Icon name="plus" /> Start new Conversation
          </Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              {newUsers.length === 0 ? (
                <div>
                  <h3>No new user Found</h3>
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    Invite a friend to an ChatApp??
                  </span>
                </div>
              ) : (
                newUsers.map(({ username, id, email, online }) => (
                  <div key={id} className="container-list">
                    <div className="container-image">
                      <Image src={bob} circular inline bordered />
                    </div>
                    <div className="container-desc">
                      <h3 style={{ margin: 0 }}>
                        {username}
                        <Icon
                          style={{ marginLeft: "3px" }}
                          name="circle"
                          color={online ? "green" : "grey"}
                          size="tiny"
                        />
                      </h3>
                      <div>{email}</div>
                    </div>
                    <div className="container-action">
                      <Button
                        floated="right"
                        style={{ marginTop: "0.75rem", width: "12rem" }}
                        onClick={() =>
                          this.newConversation(id, username, email)
                        }
                        color="blue"
                      >
                        <Icon name="chat" />
                        chat
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default graphql(allUsers)(NewConversation);
