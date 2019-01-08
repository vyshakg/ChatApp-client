import React from "react";
import { Link } from "react-router-dom";
import { withApollo } from "react-apollo";
function LandingPage({ client }) {
  console.log(client);
  return (
    <div>
      Welconme to Chat app
      <Link to="/signin">Sign In</Link> or
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default withApollo(LandingPage);
