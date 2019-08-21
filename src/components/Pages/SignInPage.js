import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment
} from "semantic-ui-react";
import { SigninMutation } from "../../graphqlQuery";

export class SignInPage extends Component {
  state = {
    data: {
      email: "guest@guest.com",
      password: "Guest123"
    },
    errors: {},
    loading: false
  };

  onChange = ({ target }) => {
    this.setState({
      data: { ...this.state.data, [target.name]: target.value }
    });
  };

  onSubmit = async () => {
    const { email, password } = this.state.data;
    this.setState({ loading: true });

    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, errors } = response.data.signIn;
    this.setState({ loading: false });
    if (ok) {
      localStorage.setItem("token", token);
      this.props.history.push("/home");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[path] = message;
      });
      this.setState({ errors: err });
    }
  };

  render() {
    const { data, loading, errors } = this.state;
    return (
      <>
        <div className="login-form">
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" style={{ color: "white" }} textAlign="center">
                <Icon
                  circular
                  name="chat"
                  style={{
                    boxShadow: "-2px 1px 12px 3px rgba(84, 35, 35, 0.71)",
                    color: "#595aac",
                    background: "white"
                  }}
                />
                Sign-in to your account
              </Header>
              <Form size="large">
                <Segment
                  style={{
                    boxShadow: "-2px 1px 12px 3px rgba(84, 35, 35, 0.71)"
                  }}
                >
                  <Form.Input
                    fluid
                    error={!!errors.email}
                    icon="mail"
                    name="email"
                    type="text"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={data.email}
                    onChange={this.onChange}
                  />
                  <Form.Input
                    fluid
                    error={!!errors.password}
                    icon="lock"
                    name="password"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={data.password}
                    onChange={this.onChange}
                  />

                  <Button
                    className="primaryBgColor"
                    onClick={this.onSubmit}
                    fluid
                    loading={loading}
                    size="large"
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message
                style={{
                  boxShadow: "-2px 1px 12px 3px rgba(84, 35, 35, 0.71)"
                }}
              >
                New to us? <Link to="/signup">Sign Up</Link>
              </Message>
              {Object.keys(errors).length !== 0 && (
                <Message
                  style={{
                    boxShadow: "-2px 1px 12px 3px rgba(84, 35, 35, 0.71)"
                  }}
                  error
                  header="There was some errors with your submission"
                  list={Object.values(errors)}
                />
              )}
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

export default graphql(SigninMutation)(SignInPage);
