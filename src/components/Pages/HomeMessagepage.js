import React from "react";
import MessageInput from "../chatComponents/MessageInput";
import ChatHeader from "../chatComponents/ChatHeader";
import Conversations from "../chatComponents/Conversations";
import { graphql } from "react-apollo";
import { Me } from "../../graphqlQuery";

const HomeMessagepage = ({ data: { loading, me } }) => {
  if (loading) {
    return null;
  }
  console.log(me);
  return (
    <div className="app-layout">
      <div className="sidebar">sidebar</div>
      <div className="conversations">
        <Conversations conversations={me.conversations} />
      </div>
      <div className="homeHeader">
        <ChatHeader username={me.username} email={me.email} />
      </div>
      <div className="messages">
        <ul className="message-list">
          <li>
            <div className="talk-bubble tri-right  btm-left">
              <div className="talktext">
                <p>hi</p>
              </div>
            </div>
          </li>
          <li style={{ float: "right" }}>
            <div className="talk-bubble tri-right btm-right">
              <div className="talktext">
                <p>Flush to the bottom right. Uses .btm-right only.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="input">
        <MessageInput />
      </div>
    </div>
  );
};

export default graphql(Me)(HomeMessagepage);
