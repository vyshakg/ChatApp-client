import React from "react";
import { Image, Icon } from "semantic-ui-react";
import bob from "../../images/lamo.jpg";
import diffDate from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import SearchConversation from "./SearchConversation";

class Conversations extends React.Component {
  render() {
    const { conversations } = this.props;
    return (
      <>
        <SearchConversation conversations={conversations} />
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

export default Conversations;
