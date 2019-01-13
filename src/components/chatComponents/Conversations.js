import React from "react";
import { Image, Icon } from "semantic-ui-react";
import diffDate from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import imageURL from "../../utils/imageUrl";

class Conversations extends React.Component {
  state = {
    conversations: this.props.conversations
  };
  componentWillReceiveProps(nextprops) {
    this.setState({ conversations: nextprops.conversations });
  }
  render() {
    const { conversations } = this.state;
    // console.log(conversations);
    return (
      <>
        {conversations.map(({ participants, id, createdAt, online }) => (
          <NavLink activeClassName="active" key={id} to={`/home/${id}`}>
            <React.Fragment>
              <div className="conversation-list">
                <div className="conversation-image">
                  <Image
                    src={imageURL(participants[0].profilePic.img.data)}
                    circular
                    inline
                    bordered
                  />
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

export default Conversations;
