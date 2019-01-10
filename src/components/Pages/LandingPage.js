import React from "react";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div>
      Welconme to Chat app
      <Link to="/signin">Sign In</Link> or
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default LandingPage;
