import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import logo from "../../images/icon_design.png";
function LandingPage() {
  return (
    <div className="landingpage-layout">
      <div style={{ height: "100vh" }}>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, left: "26rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <h1
                className="primaryColor"
                style={{
                  fontSize: "5rem",
                  fontFamily: "monospace"
                }}
              >
                Welcome To ChatApp <Image src={logo} alt="logo" />
              </h1>
            </div>
            <div>
              <Link
                style={{ marginRight: "5rem" }}
                className="landingpage-buttons"
                to="/signin"
              >
                Sign In
              </Link>

              <Link className="landingpage-buttons" to="/signup">
                Sign Up
              </Link>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

export default LandingPage;
