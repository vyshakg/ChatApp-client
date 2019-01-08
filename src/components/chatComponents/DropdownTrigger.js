import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

class DropdownTrigger extends React.Component {
  handleChange = async () => {
    await this.props.client.resetStore();
    localStorage.removeItem("token");

    this.props.history.push("/");
  };
  render() {
    const { me } = this.props;
    return (
      <Dropdown
        trigger={
          <span>
            <Icon name="user" /> Hello, {me.username}
          </span>
        }
        options={[
          {
            key: "user",
            text: (
              <span>
                Signed in as <strong>{me.username}</strong>
              </span>
            ),
            disabled: true
          },

          { key: "sign-out", text: "Sign Out" }
        ]}
        style={{ left: "73%" }}
        onChange={this.handleChange}
      />
    );
  }
}
export default withRouter(withApollo(DropdownTrigger));
