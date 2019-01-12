import React, { Component } from "react";
import { graphql } from "react-apollo";
import { allProfilePic } from "../../graphqlQuery";
import imageURL from "../../utils/imageUrl";

class ProfilePicSelect extends Component {
  onClickHandle = id => {
    this.props.selectedProfilePic(id);
  };
  render() {
    const {
      data: { loading, allProfilePic = [] }
    } = this.props;
    if (loading) return null;

    return (
      <div className="container-profile-signup">
        <div className="wrapper-flex-pics">
          {allProfilePic.map(images => (
            <label key={images._id}>
              <img
                id={images._id}
                src={imageURL(images.img.data)}
                alt="profile"
                className="profilepic-signup"
                onClick={() => this.onClickHandle(images._id)}
              />
              <input type="radio" name="selimg" />
              <span className="caption" />
            </label>
          ))}
        </div>
        <h3 className="primaryColor header-signup-profilepic">
          Select a profile Picture
        </h3>
      </div>
    );
  }
}

export default graphql(allProfilePic, {
  options: {
    fetchPolicy: "cache-first"
  }
})(ProfilePicSelect);
