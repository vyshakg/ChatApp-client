import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import Conversations from "./Conversations";

// import _ from "lodash";
class SearchConversation extends Component {
  state = {
    conversations: []
  };
  onChange = ({ target }) => {
    let updatedList = this.props.conversations;
    updatedList = updatedList.filter(conversation => {
      return (
        conversation.participants[0].username
          .toLowerCase()
          .search(target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ conversations: updatedList });
  };
  componentWillMount() {
    this.setState({ conversations: this.props.conversations });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ conversations: nextProps.conversations });
  }
  render() {
    const { conversations } = this.state;
    return (
      <>
        <div
          className="container-search"
          style={{ height: "70px", padding: "16px" }}
        >
          <span className="icon">
            <Icon name="search" />
          </span>
          <input
            id="search"
            placeholder="search"
            type="search"
            name="search"
            // value={search}
            onChange={this.onChange}
          />
        </div>
        <Conversations conversations={conversations} />
      </>
    );
  }
}

export default SearchConversation;
