import React from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { IMG_URL } from "../../utils/constants";
function SidebarApp({ client, history, profile }) {
  async function handleChange() {
    await client.resetStore();
    localStorage.removeItem("token");

    history.push("/");
  }
  // console.log(profile.profilePic);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Image
          circular
          inline
          bordered
          src={`${IMG_URL}${profile.profilePic}.jpg`}
          // {imageURL(profile.profilePic.img.data)}
          alt="profile-pic"
          width={60}
          style={{ margin: "2rem 0", boxShadow: " 0 0 2px 5px #31b33b" }}
        />
        <div className="sidebar-style">
          <div>
            <Icon size="big" inverted name="home" />
          </div>
          <div>
            <Icon size="big" inverted name="user" />
          </div>
          <div style={{ border: "#dee5ed solid" }}>
            <Icon size="big" inverted name="chat" />
          </div>
          <div>
            <Icon size="big" inverted name="setting" />
          </div>
          <div>
            <button className="signout-style" onClick={() => handleChange()}>
              <Icon size="big" inverted name="sign-out" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(withApollo(SidebarApp));
